import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { balloonRound } from '../../data/birthday'
import { settings } from '../../data/settings'
import { Balloons } from '../Effects/Balloons'
import { celebrate, giftBurst } from '../Effects/confetti'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'

type Props = { onNext: () => void }

/**
 * The balloon round — a small game between the reasons and the gift box.
 * Balloons rise across the screen; each pop says a word. Pop `goal` of them
 * and the box opens.
 */
export function BalloonGame({ onNext }: Props) {
  const goal = settings.balloons.goal
  const [popped, setPopped] = useState(0)
  const [lastWord, setLastWord] = useState<string | null>(null)
  const done = popped >= goal

  const onPop = useCallback((word: string) => {
    setPopped((n) => n + 1)
    setLastWord(word)
  }, [])

  useEffect(() => {
    if (!done) return
    giftBurst()
    const t = window.setTimeout(celebrate, 900)
    return () => window.clearTimeout(t)
  }, [done])

  return (
    <Chapter tone="charcoal" className="!p-0">
      <Balloons count={settings.balloons.count} onPop={onPop} />

      {/* Header — stays out of the way of the balloons */}
      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col items-center justify-between px-6 pb-14 pt-24 text-center">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">{balloonRound.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-serif text-headline leading-[1.05] text-ivory">{balloonRound.title}</h1>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-3 font-sans text-sm text-ivory/55">{balloonRound.sub}</p>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Counter always stays; after the goal it just keeps counting. */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-serif text-[clamp(2.4rem,9vw,4rem)] leading-none tabular-nums text-gold" aria-live="polite">
              {done ? popped : balloonRound.progress(popped, goal)}
            </span>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-ivory/45">popped</span>
            {lastWord && (
              <motion.span key={lastWord + popped} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-hand text-2xl text-ivory/80">
                “{lastWord}”
              </motion.span>
            )}
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="pointer-events-auto flex flex-col items-center gap-3"
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0, 1, 1, 0.7], scale: [0.9, 1.05, 1, 1] }}
                  transition={{ duration: 3, times: [0, 0.15, 0.8, 1] }}
                  className="font-serif text-title italic text-gold"
                >
                  {balloonRound.done[1]}
                </motion.p>
                <button type="button" onClick={onNext} className="btn-primary">
                  {balloonRound.button} <ArrowRight size={18} />
                </button>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-ivory/45">{balloonRound.keepGoing}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Chapter>
  )
}
