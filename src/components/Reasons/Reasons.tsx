import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { reasons } from '../../data/birthday'
import { settings } from '../../data/settings'
import { Particles } from '../Effects/Particles'
import { Chapter } from '../ui/Chapter'
import { LineSequence } from '../ui/LineSequence'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { Unlocked } from '../ui/Unlocked'

type Props = { onNext: () => void }

/**
 * Surprise #5 — five reasons, one full-screen card at a time. The photo
 * fills the frame with a slow zoom; the reason sits on top. After the
 * fifth, the list is declared unfair.
 */
export function Reasons({ onNext }: Props) {
  const [phase, setPhase] = useState<'title' | 'cards' | 'twist' | 'outro' | 'done'>('title')
  const [i, setI] = useState(0)
  const r = reasons.items[i]
  const last = i >= reasons.items.length - 1

  return (
    <Chapter tone="dark" className="!p-0">
      <AnimatePresence mode="wait">
        {phase === 'title' && (
          <motion.div key="title" exit={{ opacity: 0 }} className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
            {settings.effects.particles && <Particles kind="stars" density={0.5} />}
            <Reveal>
              <p className="eyebrow mb-4">Surprise #5</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h1 className="font-serif text-headline leading-[1.05] text-ivory">{reasons.title}</h1>
            </Reveal>
            <Reveal delay={1.2}>
              <button type="button" onClick={() => setPhase('cards')} className="btn-primary mt-10">
                Show me <ArrowRight size={18} />
              </button>
            </Reveal>
          </motion.div>
        )}

        {phase === 'cards' && (
          <motion.div key={`card-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="relative min-h-[100svh]">
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: 'linear' }}
              className="absolute inset-0"
            >
              <SmartImage photo={r.photo} priority className="h-[100svh] w-full" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
            <div className="vignette absolute inset-0" />

            <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-24 sm:px-10">
              <div className="mx-auto w-full max-w-2xl">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-3 font-serif text-5xl text-gold/60"
                >
                  {String(i + 1).padStart(2, '0')}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="font-serif text-headline leading-[1.05] text-ivory"
                >
                  {r.title}
                </motion.h2>
                {r.body && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="mt-4 max-w-md font-sans text-lead leading-relaxed text-ivory/75"
                  >
                    {r.body}
                  </motion.p>
                )}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  type="button"
                  onClick={() => (last ? setPhase('twist') : setI((v) => v + 1))}
                  className="btn-ghost mt-8"
                >
                  {last ? 'That was five' : 'Next'} <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'twist' && (
          <motion.div key="twist" exit={{ opacity: 0 }} className="flex min-h-[100svh] items-center justify-center px-6">
            <LineSequence lines={reasons.twist} hold={2} keepLast={false} onDone={() => setPhase('outro')} />
          </motion.div>
        )}

        {phase === 'outro' && (
          <motion.div key="outro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex min-h-[100svh] flex-col items-center justify-center gap-12 px-6 text-center">
            {settings.effects.particles && <Particles kind="both" density={0.9} />}
            <div className="relative z-10">
              {reasons.outro.map((l, k) => (
                <motion.p
                  key={l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + k * 0.9, duration: 1 }}
                  className={`font-serif text-display leading-[1.05] ${k === reasons.outro.length - 1 ? 'italic text-gold' : 'text-ivory'}`}
                >
                  {l}
                </motion.p>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }} className="relative z-10">
              <Unlocked label={reasons.unlocked} next="Open Surprise #6" onNext={onNext} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  )
}
