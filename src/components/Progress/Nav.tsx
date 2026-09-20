import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, Check, Home, Lock, Menu, X } from 'lucide-react'
import { STAGES, type Stage } from '../../hooks/useBirthdayProgress'

type Props = {
  stage: Stage
  /** Highest surprise number (1–7) fully unlocked. */
  unlocked: number
  onGo: (s: Stage) => void
}

const LABELS: Record<Stage, string> = {
  intro: 'Home',
  wish: 'Happy Birthday',
  quiz: 'The password',
  s1: 'Surprise #1 · My favourite photo',
  s2: 'Surprise #2 · Our story',
  s3: 'Surprise #3 · The roast',
  s4: 'Surprise #4 · The memory lock',
  s5: 'Surprise #5 · Five reasons',
  s6: 'Surprise #6 · Your gifts',
  s7: 'Surprise #7 · The letter',
  end: 'The end',
}

/** The furthest stage she is allowed to be on, from the unlock count. */
function furthestIndex(stage: Stage, unlocked: number): number {
  const byUnlock = unlocked >= 7 ? STAGES.indexOf('end') : STAGES.indexOf(`s${unlocked + 1}` as Stage)
  return Math.max(STAGES.indexOf(stage), byUnlock)
}

/**
 * Back (one step) top-left and a chapter menu top-right. Only stages she has
 * already reached are open; the rest stay locked so nothing is skipped.
 */
export function Nav({ stage, unlocked, onGo }: Props) {
  const [open, setOpen] = useState(false)
  const idx = STAGES.indexOf(stage)
  const furthest = furthestIndex(stage, unlocked)
  const prev = idx > 0 ? STAGES[idx - 1] : null

  return (
    <>
      {prev && (
        <button
          type="button"
          onClick={() => onGo(prev)}
          aria-label={`Back to ${LABELS[prev]}`}
          className="fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 bg-ink/50 text-ivory/70 backdrop-blur-md transition-colors hover:text-gold"
        >
          <ArrowLeft size={18} />
        </button>
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chapters"
        className="fixed right-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/10 bg-ink/50 text-ivory/70 backdrop-blur-md transition-colors hover:text-gold"
      >
        <Menu size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chapters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-ink/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-full max-w-xs flex-col border-l border-ivory/10 bg-charcoal p-5 shadow-cinematic"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="eyebrow">Chapters</p>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="btn-quiet">
                  <X size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onGo('intro')
                  setOpen(false)
                }}
                className="mb-3 flex min-h-[48px] items-center gap-3 rounded-xl border border-ivory/10 px-4 font-sans text-sm text-ivory hover:border-gold/60"
              >
                <Home size={16} className="text-gold" /> Home
              </button>

              <ol className="flex-1 overflow-y-auto">
                {STAGES.filter((s) => s !== 'intro').map((s) => {
                  const i = STAGES.indexOf(s)
                  const reachable = i <= furthest
                  const current = s === stage
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        disabled={!reachable}
                        onClick={() => {
                          onGo(s)
                          setOpen(false)
                        }}
                        aria-current={current ? 'page' : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-sans text-sm transition-colors ${
                          current ? 'bg-ivory/[0.06] text-gold' : reachable ? 'text-ivory/85 hover:bg-ivory/[0.04]' : 'text-ivory/30'
                        }`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center" aria-hidden>
                          {reachable ? (
                            <Check size={14} className={current ? 'text-gold' : 'text-gold/60'} />
                          ) : (
                            <Lock size={12} />
                          )}
                        </span>
                        {LABELS[s]}
                      </button>
                    </li>
                  )
                })}
              </ol>
              <p className="mt-4 font-hand text-lg text-gold/60">One at a time. That was the rule.</p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
