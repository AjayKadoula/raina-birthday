import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { finale } from '../../data/birthday'
import { letter } from '../../data/letter'
import { settings } from '../../data/settings'
import { celebrate } from '../Effects/confetti'
import { Particles } from '../Effects/Particles'
import { Chapter } from '../ui/Chapter'
import { LineSequence } from '../ui/LineSequence'

type Props = { onFinished: () => void }

/**
 * Surprise #7 — the letter. Three quiet lines, a sealed envelope, then the
 * letter itself on cream paper, paragraph by paragraph. Ends with the
 * closing lines, "One last thing...", and the final full-screen message.
 */
export function LoveLetter({ onFinished }: Props) {
  const [phase, setPhase] = useState<'lines' | 'envelope' | 'opening' | 'letter' | 'closing' | 'last'>('lines')

  const open = () => {
    if (phase !== 'envelope') return
    setPhase('opening')
    window.setTimeout(() => setPhase('letter'), 1500)
  }

  return (
    <Chapter tone="dark" center={phase !== 'letter'} className={phase === 'letter' ? 'flex flex-col items-center' : ''}>
      {settings.effects.particles && <Particles kind={phase === 'last' ? 'both' : 'stars'} density={0.6} />}

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === 'lines' && (
            <motion.div key="lines" exit={{ opacity: 0 }}>
              <p className="eyebrow mb-6">Surprise #7</p>
              <LineSequence lines={finale.lines} hold={2.6} keepLast={false} onDone={() => setPhase('envelope')} />
            </motion.div>
          )}

          {(phase === 'envelope' || phase === 'opening') && (
            <motion.div key="env" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-10">
              <button
                type="button"
                onClick={open}
                aria-label="Open the letter"
                className="relative h-[170px] w-[260px] sm:h-[200px] sm:w-[300px] [perspective:1000px]"
              >
                {/* Envelope body */}
                <div className="absolute inset-0 rounded-md bg-[linear-gradient(180deg,rgb(var(--c-cream)),rgb(220_206_184))] shadow-cinematic" />
                {/* Letter peeking out */}
                <motion.div
                  animate={phase === 'opening' ? { y: -120, opacity: 1 } : { y: 0, opacity: 0.9 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 top-3 bottom-3 rounded-sm bg-ivory"
                >
                  <div className="mx-5 mt-5 h-1.5 w-1/2 rounded bg-ink/10" />
                  <div className="mx-5 mt-2 h-1.5 w-3/4 rounded bg-ink/10" />
                  <div className="mx-5 mt-2 h-1.5 w-2/3 rounded bg-ink/10" />
                </motion.div>
                {/* Bottom pocket */}
                <div className="absolute inset-x-0 bottom-0 h-[62%] rounded-b-md bg-[linear-gradient(180deg,rgb(228_216_196),rgb(212_196_170))] [clip-path:polygon(0_0,50%_45%,100%_0,100%_100%,0_100%)]" />
                {/* Flap */}
                <motion.div
                  animate={phase === 'opening' ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-t-md bg-[linear-gradient(180deg,rgb(236_226_208),rgb(222_208_186))] [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-style:preserve-3d]"
                />
                {/* Wax seal */}
                <motion.div
                  animate={phase === 'opening' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ left: 'calc(50% - 22px)', top: 'calc(50% - 22px)' }}
                  className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgb(140_45_60),rgb(var(--c-burgundy)))] font-serif text-lg text-ivory/90 shadow-card"
                >
                  {settings.him[0]}
                </motion.div>
              </button>
              {phase === 'envelope' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="font-sans text-xs uppercase tracking-[0.3em] text-ivory/45">
                  Tap to {finale.envelope.toLowerCase()}
                </motion.p>
              )}
            </motion.div>
          )}

          {phase === 'letter' && (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="paper-light relative w-full rounded-xl px-6 py-10 text-left shadow-cinematic sm:px-12 sm:py-14"
              aria-label="A letter"
            >
              <div className="relative z-10">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.9 }}
                  className="font-hand text-4xl text-wine"
                >
                  {letter.greeting}
                </motion.p>
                <div className="mt-6 space-y-5">
                  {letter.paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + i * 0.9, duration: 1 }}
                      className="font-serif text-[1.2rem] leading-[1.7] text-ink/85 sm:text-[1.3rem]"
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + letter.paragraphs.length * 0.9, duration: 1 }}
                  className="mt-10"
                >
                  <p className="font-serif text-lg text-ink/70">{letter.signoff}</p>
                  <p className="mt-1 font-hand text-4xl text-wine">{letter.signature}</p>
                  {letter.postscript && <p className="mt-6 font-hand text-xl text-ink/55">{letter.postscript}</p>}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 + letter.paragraphs.length * 0.9 }}
                  className="mt-10 text-center"
                >
                  <button type="button" onClick={() => setPhase('closing')} className="btn bg-wine text-ivory hover:bg-burgundy">
                    Read it. Okay.
                  </button>
                </motion.div>
              </div>
            </motion.article>
          )}

          {phase === 'closing' && (
            <motion.div key="closing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-10">
              <div className="space-y-4">
                {finale.closing.map((l, i) => (
                  <motion.p
                    key={l}
                    initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.4 + i * 1.6, duration: 1.2 }}
                    className={i === 0 ? 'font-serif text-display leading-[1.02] text-ivory' : 'font-serif text-title italic text-gold'}
                  >
                    {l}
                  </motion.p>
                ))}
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + finale.closing.length * 1.6 }}
                type="button"
                onClick={() => {
                  setPhase('last')
                  window.setTimeout(celebrate, 2200)
                }}
                className="btn-ghost"
              >
                {finale.lastButton}
              </motion.button>
            </motion.div>
          )}

          {phase === 'last' && (
            <motion.div key="last" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-12">
              <div className="space-y-5">
                {finale.lastScreen.map((l, i) => {
                  const isName = i === finale.lastScreen.length - 1
                  const isWish = i === finale.lastScreen.length - 2
                  return (
                    <motion.p
                      key={l}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 1.5, duration: 1.2 }}
                      className={
                        isName
                          ? 'font-hand text-4xl text-gold'
                          : isWish
                            ? 'font-serif text-display leading-none text-ivory'
                            : 'font-serif text-title leading-tight text-ivory/85'
                      }
                    >
                      {l}
                    </motion.p>
                  )
                })}
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + finale.lastScreen.length * 1.5 }}
                type="button"
                onClick={onFinished}
                className="btn-quiet text-ivory/50"
              >
                {finale.unlocked}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
