import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { settings } from '../../data/settings'
import { formatBirthday, msUntilBirthday, splitDuration } from '../../utils/date'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { Particles } from '../Effects/Particles'

/**
 * Shown before the birthday (IST). The experience itself stays locked until
 * midnight on the day; once the day arrives the parent swaps this out.
 */
export function Countdown() {
  const [ms, setMs] = useState(msUntilBirthday())

  useEffect(() => {
    const t = window.setInterval(() => setMs(msUntilBirthday()), 1000)
    return () => window.clearInterval(t)
  }, [])

  const d = splitDuration(ms)
  const cells: Array<[string, number]> = [
    ['days', d.days],
    ['hours', d.hours],
    ['minutes', d.minutes],
    ['seconds', d.seconds],
  ]

  return (
    <Chapter tone="charcoal">
      {settings.effects.particles && <Particles kind="stars" density={0.6} />}
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-10 text-center">
        <Reveal>
          <p className="eyebrow">Not yet</p>
        </Reveal>
        <Reveal delay={0.2}>
          <h1 className="font-serif text-headline leading-[1.05] text-ivory">
            Something is waiting for you, {settings.her}.
          </h1>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-sans text-lead text-ivory/65">It opens on {formatBirthday()}.</p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="grid w-full grid-cols-4 gap-2 sm:gap-4"
          role="timer"
          aria-live="off"
          aria-label={`${d.days} days, ${d.hours} hours, ${d.minutes} minutes to go`}
        >
          {cells.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-ivory/10 bg-ivory/[0.03] px-2 py-5 backdrop-blur-sm">
              <div className="font-serif text-[clamp(1.9rem,7vw,3.4rem)] leading-none tabular-nums text-gold">
                {String(value).padStart(2, '0')}
              </div>
              <div className="mt-2 font-sans text-[0.62rem] uppercase tracking-[0.25em] text-ivory/50">{label}</div>
            </div>
          ))}
        </motion.div>

        <Reveal delay={1.2}>
          <p className="font-hand text-xl text-gold/60">No peeking. I mean it.</p>
        </Reveal>
      </div>
    </Chapter>
  )
}
