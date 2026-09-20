import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { wish } from '../../data/birthday'
import { settings } from '../../data/settings'
import { celebrate, giftBurst } from '../Effects/confetti'
import { Particles } from '../Effects/Particles'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'

type Props = { onNext: () => void }

const CANDLES = 3

/**
 * The actual birthday wish, before any of the seven surprises.
 * A small cake with three candles she taps out one by one; when the last
 * one goes, confetti, a wish, and a handwritten note.
 */
export function BirthdayWish({ onNext }: Props) {
  const [lit, setLit] = useState<boolean[]>(() => Array(CANDLES).fill(true))
  const [blown, setBlown] = useState(false)
  const reduced = useReducedMotion()

  const blow = (i: number) => {
    if (!lit[i]) return
    setLit((l) => l.map((v, k) => (k === i ? false : v)))
  }

  useEffect(() => {
    if (blown || lit.some(Boolean)) return
    const t = window.setTimeout(() => {
      setBlown(true)
      giftBurst()
      window.setTimeout(celebrate, 900)
    }, 500)
    return () => window.clearTimeout(t)
  }, [lit, blown])

  const remaining = lit.filter(Boolean).length

  return (
    <Chapter tone="wine">
      {settings.effects.particles && <Particles kind="both" density={0.6} />}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-8 text-center">
        <Reveal>
          <p className="eyebrow">{wish.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <h1 className="font-serif text-display leading-[0.98] text-ivory">{wish.headline}</h1>
        </Reveal>
        <Reveal delay={0.7}>
          <p className="max-w-sm font-sans text-lead leading-relaxed text-ivory/70">{wish.sub}</p>
        </Reveal>

        {/* The cake */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-2 h-[190px] w-[240px]"
          role="group"
          aria-label="Birthday cake"
        >
          {/* Glow from the candles */}
          <motion.div
            aria-hidden
            animate={{ opacity: blown ? 0 : 0.5 + remaining * 0.15 }}
            className="pointer-events-none absolute left-1/2 top-0 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgb(var(--c-gold)/0.35)_0%,transparent_60%)]"
            style={{ transform: 'translate(-50%, -33%)' }}
          />

          {/* Candles */}
          <div className="absolute left-1/2 top-[10px] flex -translate-x-1/2 gap-9" style={{ transform: 'translateX(-50%)' }}>
            {lit.map((on, i) => (
              <button
                key={i}
                type="button"
                onClick={() => blow(i)}
                aria-label={on ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`}
                aria-pressed={!on}
                className="relative flex h-[76px] w-11 flex-col items-center justify-end"
              >
                <AnimatePresence>
                  {on ? (
                    <motion.span
                      key="flame"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={reduced ? { scale: 1, opacity: 1 } : { scale: [1, 1.12, 0.96, 1.08, 1], opacity: 1, rotate: [0, -4, 3, -2, 0] }}
                      exit={{ scale: 0, opacity: 0, y: -8 }}
                      transition={reduced ? { duration: 0.3 } : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-[2px] block h-6 w-3.5 origin-bottom rounded-[50%_50%_50%_50%/65%_65%_35%_35%] bg-[radial-gradient(circle_at_50%_70%,#fff6d6_0%,#f4c45a_45%,#d8722a_100%)] shadow-[0_0_18px_6px_rgb(244_196_90/0.5)]"
                    />
                  ) : (
                    <motion.span
                      key="smoke"
                      initial={{ opacity: 0.7, y: 0, scaleX: 1 }}
                      animate={{ opacity: 0, y: -34, scaleX: 2.2 }}
                      transition={{ duration: 1.6, ease: 'easeOut' }}
                      className="mb-[8px] block h-5 w-2 rounded-full bg-ivory/40 blur-[2px]"
                    />
                  )}
                </AnimatePresence>
                <span className="block h-[38px] w-[9px] rounded-sm bg-[repeating-linear-gradient(-45deg,rgb(var(--c-ivory))_0_5px,rgb(var(--c-rose))_5px_10px)]" />
                <span className="absolute bottom-[38px] h-[3px] w-[3px] rounded-full bg-ink/70" aria-hidden />
              </button>
            ))}
          </div>

          {/* Tiers */}
          <div className="absolute left-1/2 top-[84px] h-[46px] w-[160px] -translate-x-1/2 rounded-t-xl rounded-b-md bg-[linear-gradient(180deg,rgb(var(--c-wine)),rgb(var(--c-burgundy)))] shadow-card" style={{ transform: 'translateX(-50%)' }}>
            <span className="absolute inset-x-0 top-0 h-[14px] rounded-t-xl bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[14%] top-[11px] h-4 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[42%] top-[11px] h-6 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[70%] top-[11px] h-3 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
          </div>
          <div className="absolute left-1/2 top-[126px] h-[50px] w-[220px] -translate-x-1/2 rounded-t-xl rounded-b-md bg-[linear-gradient(180deg,rgb(var(--c-wine)),rgb(var(--c-burgundy)))] shadow-card" style={{ transform: 'translateX(-50%)' }}>
            <span className="absolute inset-x-0 top-0 h-[14px] rounded-t-xl bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[10%] top-[11px] h-5 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[30%] top-[11px] h-3 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[55%] top-[11px] h-6 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
            <span className="absolute left-[80%] top-[11px] h-4 w-3 rounded-b-full bg-[rgb(var(--c-cream))]" />
          </div>
          {/* Plate */}
          <div className="absolute left-1/2 top-[172px] h-[12px] w-[260px] -translate-x-1/2 rounded-[50%] bg-gold/40" style={{ transform: 'translateX(-50%)' }} />
        </motion.div>

        <div className="min-h-[7rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.6 }}
                className="font-sans text-xs uppercase tracking-[0.3em] text-ivory/45"
              >
                {remaining === CANDLES ? wish.candleHint : `${remaining} to go`}
              </motion.p>
            ) : (
              <motion.div key="after" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-7">
                <div className="space-y-1">
                  {wish.afterBlow.map((l, i) => (
                    <motion.p
                      key={l}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.7 }}
                      className={i === 0 ? 'font-serif text-title text-ivory' : 'font-serif text-xl italic text-gold'}
                    >
                      {l}
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, rotate: -3, y: 16 }}
                  animate={{ opacity: 1, rotate: -1.5, y: 0 }}
                  transition={{ delay: 1.2 + wish.afterBlow.length * 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="paper-light relative w-full max-w-xs rounded-md px-6 py-5 shadow-cinematic"
                >
                  <div className="relative z-10 space-y-0.5">
                    {wish.note.map((l) => (
                      <p key={l} className="font-hand text-2xl leading-snug text-wine">
                        {l}
                      </p>
                    ))}
                    <p className="pt-2 text-right font-hand text-lg text-ink/50">— {settings.him}</p>
                  </div>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 + wish.afterBlow.length * 0.7 }}
                  type="button"
                  onClick={onNext}
                  className="btn-primary"
                >
                  {wish.button.replace(/\s*→$/, '')} <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Chapter>
  )
}
