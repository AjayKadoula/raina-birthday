import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { RotateCcw, Settings2, X } from 'lucide-react'
import { STAGES, type Stage } from '../../hooks/useBirthdayProgress'
import { settings } from '../../data/settings'

type Props = {
  stage: Stage
  unlocked: number
  onReset: () => void
  onJump: (s: Stage) => void
}

/**
 * A deliberately tiny, easy-to-miss gear in the bottom-left corner.
 * Lets you reset progress or jump to a stage while testing. Also opens
 * with the keyboard shortcut Shift+D.
 */
export function SettingsPanel({ stage, unlocked, onReset, onJump }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'd') setOpen((o) => !o)
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open settings"
        className="fixed left-3 z-40 flex h-9 w-9 items-center justify-center rounded-full text-ivory/25 transition-colors hover:text-ivory/70"
        style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <Settings2 size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-ivory/10 bg-charcoal p-5 shadow-cinematic"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-ivory/60">Debug</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="btn-quiet">
                  <X size={16} />
                </button>
              </div>

              <dl className="mb-4 grid grid-cols-2 gap-y-1 font-sans text-sm text-ivory/70">
                <dt>Stage</dt>
                <dd className="text-right text-ivory">{stage}</dd>
                <dt>Unlocked</dt>
                <dd className="text-right text-ivory">{unlocked} / 7</dd>
                <dt>Birthday lock</dt>
                <dd className="text-right text-ivory">{settings.lockUntilBirthday ? 'on' : 'off'}</dd>
              </dl>

              <label className="mb-4 block">
                <span className="mb-1 block font-sans text-xs text-ivory/50">Jump to stage</span>
                <select
                  value={stage}
                  onChange={(e) => {
                    onJump(e.target.value as Stage)
                    setOpen(false)
                  }}
                  className="w-full rounded-lg border border-ivory/15 bg-ink px-3 py-2 font-sans text-sm text-ivory"
                >
                  {STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={() => {
                  onReset()
                  setOpen(false)
                }}
                className="btn-ghost w-full"
              >
                <RotateCcw size={16} />
                Reset progress
              </button>
              <p className="mt-3 text-center font-sans text-[0.68rem] text-ivory/35">Shift + D toggles this panel.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
