import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, ExternalLink, Lock, Sparkles } from 'lucide-react'
import { gifts, giftScreen } from '../../data/birthday'
import { settings } from '../../data/settings'
import type { GiftItem } from '../../data/types'
import { formatIst, istToMs } from '../../utils/date'
import { SmartImage } from '../ui/SmartImage'

/** Ids of the gifts whose unlock time has passed (or all of them in ?preview). */
export function useUnlockedGifts(): Set<string> {
  // Gift locks are always real. Only ?preview=all (for reading the sealed cards) overrides them.
  const preview = useMemo(() => new URLSearchParams(window.location.search).get('preview') === 'all', [])
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 15_000)
    return () => window.clearInterval(t)
  }, [])
  return useMemo(
    () => new Set(gifts.filter((g) => preview || istToMs(g.unlockAt) <= now).map((g) => g.id)),
    [now, preview],
  )
}

type Props = {
  unlocked: Set<string>
  seen: string[]
  onSeen: (id: string) => void
  /** Which gift to open first (defaults to the newest unlocked one). */
  initialId?: string
}

/**
 * The gift calendar: one big reveal card for the selected gift, and the
 * week's list beneath it. Locked rows show only the day and a teaser and
 * unlock by themselves when their time (IST) arrives.
 */
export function GiftCalendar({ unlocked, seen, onSeen, initialId }: Props) {
  // Land on the oldest unlocked gift she hasn't opened; else the newest unlocked one.
  const firstUnseen = gifts.find((g) => unlocked.has(g.id) && !seen.includes(g.id))
  const newest = [...gifts].reverse().find((g) => unlocked.has(g.id))
  const [selectedId, setSelectedId] = useState<string | null>(initialId ?? firstUnseen?.id ?? newest?.id ?? null)
  const selected = gifts.find((g) => g.id === selectedId && unlocked.has(g.id)) ?? null

  useEffect(() => {
    if (selected) onSeen(selected.id)
  }, [selected, onSeen])

  const nextLocked = gifts.find((g) => !unlocked.has(g.id))
  const lockedCount = gifts.length - unlocked.size

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {selected ? (
          <GiftCard key={selected.id} gift={selected} />
        ) : (
          <motion.div
            key="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="paper-light relative w-full max-w-md rounded-2xl p-7 text-center shadow-cinematic"
          >
            <div className="relative z-10">
              <Lock size={20} className="mx-auto text-wine/60" />
              <p className="mt-3 font-serif text-title text-ink">Not yet.</p>
              {nextLocked && (
                <p className="mt-2 font-sans text-sm text-ink/60">
                  {settings.gifts.showLockedTeasers || settings.gifts.showLockedTimes ? `It opens ${formatIst(nextLocked.unlockAt)}. Come back.` : 'It opens on its own. Come back.'}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="w-full max-w-md" aria-label={giftScreen.calendarTitle}>
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="eyebrow">{giftScreen.calendarTitle}</h3>
          {settings.gifts.showLockedTeasers && (
            <span className="font-sans text-[0.65rem] tracking-[0.15em] text-ivory/40">
              {unlocked.size} / {gifts.length}
            </span>
          )}
        </div>
        <ol className={`divide-y divide-ivory/10 rounded-2xl border-ivory/10 bg-ink/40 backdrop-blur-sm ${
          unlocked.size > 0 || settings.gifts.showLockedTeasers || settings.gifts.showLockedTimes ? 'border' : ''
        }`}>
          {gifts.map((g, i) => {
            const open = unlocked.has(g.id)
            if (!open && !settings.gifts.showLockedTeasers && !settings.gifts.showLockedTimes) return null
            const showTeaser = settings.gifts.showLockedTeasers
            const isNew = open && !seen.includes(g.id)
            const active = selected?.id === g.id
            return (
              <li key={g.id}>
                <button
                  type="button"
                  disabled={!open}
                  onClick={() => setSelectedId(g.id)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex w-full items-start gap-4 px-4 py-3.5 text-left transition-colors ${
                    open ? 'hover:bg-ivory/[0.04]' : 'cursor-default opacity-60'
                  } ${active ? 'bg-ivory/[0.05]' : ''}`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-serif text-sm ${
                      open ? 'border-gold/70 text-gold' : 'border-ivory/20 text-ivory/40'
                    }`}
                    aria-hidden
                  >
                    {open ? i + 1 : <Lock size={11} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ivory/45">
                      {open || showTeaser ? g.when : 'Sealed'}
                      {isNew && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 normal-case tracking-normal text-gold">
                          <Sparkles size={10} /> new
                        </span>
                      )}
                    </span>
                    <span className={`mt-0.5 block font-serif text-lg leading-snug ${open ? 'text-ivory' : 'italic text-ivory/60'}`}>
                      {open ? g.title : showTeaser ? g.teaser : `Opens ${formatIst(g.unlockAt)}`}
                    </span>
                    {!open && showTeaser && <span className="mt-0.5 block font-sans text-xs text-ivory/35">Opens {formatIst(g.unlockAt)}</span>}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
        {lockedCount > 0 && (
          <p className="mt-3 text-center font-sans text-sm text-ivory/50">
            {settings.gifts.showLockedTeasers || settings.gifts.showLockedTimes
              ? `${lockedCount} more ${lockedCount === 1 ? 'is' : 'are'} still sealed.`
              : 'There is more. It stays sealed for now.'}
          </p>
        )}
        <p className="mt-2 text-center font-hand text-lg text-gold/60">{giftScreen.calendarNote}</p>
      </section>
    </div>
  )
}

function GiftCard({ gift }: { gift: GiftItem }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    if (!gift.code) return
    try {
      await navigator.clipboard.writeText(gift.code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked; the code is still visible */
    }
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="paper-light relative w-full max-w-md overflow-hidden rounded-2xl p-5 text-left shadow-cinematic sm:p-7"
      aria-label={gift.title}
    >
      <div className="relative z-10">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-wine/70">
          For {settings.her} · {gift.when}
        </p>
        <h2 className="mt-2 font-serif text-title leading-tight text-ink">{gift.title}</h2>
        <p className="mt-3 font-sans text-[0.95rem] leading-relaxed text-ink/70">{gift.description}</p>
        {gift.image && <SmartImage photo={gift.image} className="mt-5 aspect-square w-full rounded-xl" />}
        {gift.message && <p className="mt-5 font-hand text-2xl leading-snug text-wine">{gift.message}</p>}
        {gift.code && (
          <button
            type="button"
            onClick={copy}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-wine/25 bg-white/60 px-4 py-2 font-sans text-sm tracking-[0.15em] text-ink"
            aria-label={`Copy code ${gift.code}`}
          >
            {gift.code}
            {copied ? <Check size={14} className="text-wine" /> : <Copy size={14} className="opacity-50" />}
          </button>
        )}
        {gift.link && (
          <a href={gift.link.url} target="_blank" rel="noopener noreferrer" className="btn mt-5 bg-wine text-ivory hover:bg-burgundy">
            {gift.link.label} <ExternalLink size={15} />
          </a>
        )}
      </div>
    </motion.article>
  )
}
