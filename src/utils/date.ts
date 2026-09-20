import { settings } from '../data/settings'

type Ymd = { year: number; month: number; day: number }

/** Today's calendar date in the configured timezone (IST by default). */
export function todayIn(timeZone: string = settings.timezone): Ymd {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  return { year: get('year'), month: get('month'), day: get('day') }
}

function compare(a: Ymd, b: Ymd): number {
  return a.year - b.year || a.month - b.month || a.day - b.day
}

export type BirthdayPhase = 'before' | 'today' | 'after'

export function birthdayPhase(now: Ymd = todayIn()): BirthdayPhase {
  const c = compare(now, settings.birthday)
  return c < 0 ? 'before' : c === 0 ? 'today' : 'after'
}

/** IST is UTC+5:30 with no DST, so midnight IST is a fixed UTC offset. */
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

/** Milliseconds until midnight (IST) on the birthday. Negative once passed. */
export function msUntilBirthday(): number {
  const { year, month, day } = settings.birthday
  const midnightIst = Date.UTC(year, month - 1, day) - IST_OFFSET_MS
  return midnightIst - Date.now()
}

export function splitDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  }
}

/** Generic countdown for the easter egg: ms until a YYYY-MM-DD at midnight IST. */
export function msUntilDate(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d) - IST_OFFSET_MS - Date.now()
}

export function formatBirthday(): string {
  const { year, month, day } = settings.birthday
  return new Date(Date.UTC(year, month - 1, day, 12)).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** Parse "YYYY-MM-DDTHH:mm" as an IST wall-clock time → epoch ms. */
export function istToMs(local: string): number {
  const [d, t = '00:00'] = local.split('T')
  const [y, m, day] = d.split('-').map(Number)
  const [hh, mm] = t.split(':').map(Number)
  return Date.UTC(y, m - 1, day, hh, mm) - IST_OFFSET_MS
}

export function formatIst(local: string): string {
  return new Date(istToMs(local)).toLocaleString('en-IN', {
    timeZone: settings.timezone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}
