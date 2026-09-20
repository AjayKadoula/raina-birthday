import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { quiz } from '../../data/birthday'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'

type Props = { onVerified: () => void }

type Feedback = { kind: 'wrong' | 'right'; text: string } | null

/**
 * Surprise #1, part one — "Prove you're actually Raina."
 * Wrong answers are funny, not punishing: a hint appears after the first miss,
 * and every miss rotates through the configured responses.
 */
export function Quiz({ onVerified }: Props) {
  const [qi, setQi] = useState(0)
  const [misses, setMisses] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [locked, setLocked] = useState(false)
  const [verified, setVerified] = useState(false)
  const [shake, setShake] = useState(0)
  const [notHer, setNotHer] = useState(false)

  const q = quiz.questions[qi]
  const total = quiz.questions.length

  const choose = (i: number) => {
    if (locked) return
    if (i === q.answer) {
      setLocked(true)
      setFeedback({ kind: 'right', text: q.rightResponse ?? 'Correct.' })
      window.setTimeout(() => {
        if (qi + 1 >= total) {
          setVerified(true)
          window.setTimeout(onVerified, 2200)
        } else {
          setQi((v) => v + 1)
          setMisses(0)
          setFeedback(null)
          setLocked(false)
        }
      }, 1500)
    } else {
      const pool = q.wrongResponses?.length ? q.wrongResponses : ['Wrong. Interesting. We need to discuss this relationship.']
      setFeedback({ kind: 'wrong', text: pool[misses % pool.length] })
      setMisses((m) => m + 1)
      setShake((s) => s + 1)
    }
  }

  return (
    <Chapter tone="wine">
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {verified ? (
            <motion.div
              key="verified"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 text-gold"
              >
                <ShieldCheck size={30} strokeWidth={1.5} />
              </motion.div>
              <p className="font-serif text-headline leading-tight text-ivory">{quiz.verified}</p>
              <p className="font-hand text-xl text-gold/70">{quiz.verifiedSub}</p>
            </motion.div>
          ) : (
            <motion.div key={qi} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5 }}>
              {qi === 0 && (
                <Reveal className="mb-10 text-center">
                  <p className="eyebrow mb-3">Security check</p>
                  <h1 className="font-serif text-headline leading-[1.05] text-ivory">
                    {quiz.title}
                    <br />
                    <span className="italic text-gold">{quiz.subtitle}</span>
                  </h1>
                  <p className="mx-auto mt-4 max-w-sm font-sans text-sm text-ivory/55">{quiz.blurb}</p>
                </Reveal>
              )}

              <div className="mb-6 flex items-center justify-between font-sans text-[0.68rem] uppercase tracking-[0.3em] text-ivory/45">
                <span>
                  Question {qi + 1} of {total}
                </span>
                <span aria-hidden>{'•'.repeat(qi + 1).padEnd(total, '·')}</span>
              </div>

              <motion.h2
                key={`q-${qi}-${shake}`}
                animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
                transition={{ duration: 0.4 }}
                className="mb-7 font-serif text-title leading-tight text-ivory"
              >
                {q.question}
              </motion.h2>

              <div className="grid gap-3" role="group" aria-label="Answers">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={opt}
                    type="button"
                    onClick={() => choose(i)}
                    disabled={locked}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className={`flex min-h-[52px] items-start gap-3 rounded-xl border px-4 py-3.5 text-left font-sans text-[0.95rem] leading-snug transition-all duration-300 ${
                      locked && i === q.answer
                        ? 'border-gold bg-gold/15 text-gold'
                        : 'border-ivory/15 bg-ivory/[0.03] text-ivory/90 hover:border-gold/60 hover:bg-ivory/[0.06]'
                    } disabled:cursor-default`}
                  >
                    <span className="w-5 shrink-0 font-serif text-gold/70" aria-hidden>
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="min-w-0 flex-1">{opt}</span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
                {notHer && (
                  <p className="mb-3 text-center font-serif text-lg text-ivory/80">{quiz.notHer}</p>
                )}
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      key={feedback.text + misses}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className={`font-serif text-xl leading-snug ${feedback.kind === 'right' ? 'text-gold' : 'text-ivory'}`}>
                        {feedback.text}
                      </p>
                      {feedback.kind === 'wrong' && misses >= 1 && q.hint && (
                        <p className="mt-2 font-hand text-lg text-gold/60">Hint: {q.hint}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!notHer && !locked && (
                <button type="button" onClick={() => setNotHer(true)} className="btn-quiet mx-auto mt-2 block text-ivory/35">
                  I'm not Raina
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
