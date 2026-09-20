import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Gavel } from 'lucide-react'
import { roast } from '../../data/birthday'
import { settings } from '../../data/settings'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { Unlocked } from '../ui/Unlocked'

type Props = { onNext: () => void }

type Vote = 'raina' | 'ajay'

/**
 * Surprise #3 — the roast. One question at a time, two animated vote
 * buttons, a reaction card for the verdict, then Exhibit A and a promise
 * that something sweet is coming.
 */
export function RoastGame({ onNext }: Props) {
  const [qi, setQi] = useState(0)
  const [vote, setVote] = useState<Vote | null>(null)
  const [done, setDone] = useState(false)
  const [evidenceSeen, setEvidenceSeen] = useState(false)

  const q = roast.questions[qi]
  const total = roast.questions.length

  const cast = (v: Vote) => {
    if (vote) return
    setVote(v)
  }

  const next = () => {
    if (qi + 1 >= total) setDone(true)
    else {
      setQi((i) => i + 1)
      setVote(null)
    }
  }

  return (
    <Chapter tone="charcoal">
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key="game" exit={{ opacity: 0 }}>
              {qi === 0 && (
                <Reveal className="mb-10 text-center">
                  <p className="eyebrow mb-3">Surprise #3</p>
                  <h1 className="font-serif text-headline leading-[1.05] text-ivory">
                    {roast.title}
                    <br />
                    <span className="italic text-gold">{roast.subtitle}</span>
                  </h1>
                </Reveal>
              )}

              <div className="mb-5 flex items-center justify-between font-sans text-[0.68rem] uppercase tracking-[0.3em] text-ivory/45">
                <span className="flex items-center gap-2">
                  <Gavel size={12} /> Case {qi + 1} of {total}
                </span>
                <span>
                  {settings.her} vs {settings.him}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={qi}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}
                >
                  <h2 className="mb-7 font-serif text-title leading-tight text-ivory">{q.question}</h2>

                  <div className="grid grid-cols-2 gap-3" role="group" aria-label="Vote">
                    {(['raina', 'ajay'] as const).map((who) => {
                      const name = who === 'raina' ? settings.her : settings.him
                      const chosen = vote === who
                      return (
                        <motion.button
                          key={who}
                          type="button"
                          onClick={() => cast(who)}
                          disabled={!!vote}
                          whileTap={{ scale: 0.96 }}
                          animate={vote ? (chosen ? { scale: 1.03 } : { scale: 0.97, opacity: 0.4 }) : { scale: 1, opacity: 1 }}
                          className={`min-h-[64px] rounded-2xl border px-4 py-4 font-serif text-2xl transition-colors duration-300 ${
                            chosen ? 'border-gold bg-gold/15 text-gold' : 'border-ivory/15 bg-ivory/[0.03] text-ivory hover:border-gold/60'
                          } disabled:cursor-default`}
                        >
                          {name}
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="mt-6 min-h-[9rem]" aria-live="polite">
                    <AnimatePresence>
                      {vote && (
                        <motion.div
                          initial={{ opacity: 0, y: 14, rotate: -1 }}
                          animate={{ opacity: 1, y: 0, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                          className="flex items-center gap-4 rounded-2xl border border-ivory/10 bg-ink/50 p-3"
                        >
                          {q.reaction && (
                            <SmartImage photo={q.reaction} className="h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-serif text-xl leading-snug text-ivory">{vote === 'raina' ? q.ifRaina : q.ifAjay}</p>
                            <button type="button" onClick={next} className="btn-quiet mt-2 -ml-3 text-gold">
                              {qi + 1 >= total ? 'Closing argument →' : 'Next case →'}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div key="evidence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-8 text-center">
              {!evidenceSeen ? (
                <>
                  <Reveal>
                    <p className="eyebrow mb-3">{roast.evidence.label}</p>
                    <h2 className="font-serif text-title text-ivory">One last piece of evidence.</h2>
                  </Reveal>
                  <motion.figure
                    initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-sm rounded-sm bg-ivory p-3 pb-10 shadow-cinematic"
                  >
                    <SmartImage photo={roast.evidence.photo} className="aspect-[4/3] w-full" />
                    <figcaption className="mt-4 font-hand text-2xl text-ink/70">{roast.evidence.caption}</figcaption>
                  </motion.figure>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    type="button"
                    onClick={() => setEvidenceSeen(true)}
                    className="btn-ghost"
                  >
                    Fine. Whatever.
                  </motion.button>
                </>
              ) : (
                <Unlocked lead={roast.outro} label={roast.unlocked} next="Open Surprise #4" onNext={onNext} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
