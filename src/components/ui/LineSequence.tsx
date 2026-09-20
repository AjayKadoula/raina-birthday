import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  lines: readonly string[]
  /** Seconds each line stays before the next one replaces it. */
  hold?: number
  /** Called once, after the last line has been held. */
  onDone?: () => void
  /** Keep the last line on screen (default) or fade it out too. */
  keepLast?: boolean
  className?: string
  textClassName?: string
  /** Lets the viewer skip ahead with a tap. */
  skippable?: boolean
}

/**
 * Shows lines one at a time, film-title style. Used for the hook screen,
 * chapter interstitials and the finale.
 */
export function LineSequence({
  lines,
  hold = 2.2,
  onDone,
  keepLast = true,
  className = '',
  textClassName = 'font-serif text-headline leading-[1.1] text-ivory',
  skippable = true,
}: Props) {
  const [i, setI] = useState(0)
  const [finished, setFinished] = useState(false)
  const reduced = useReducedMotion()
  const delay = reduced ? Math.min(hold, 1.2) : hold

  useEffect(() => {
    if (finished) return
    const last = i >= lines.length - 1
    const t = window.setTimeout(() => {
      if (last) {
        setFinished(true)
        onDone?.()
      } else {
        setI((v) => v + 1)
      }
    }, delay * 1000)
    return () => window.clearTimeout(t)
  }, [i, lines.length, delay, finished, onDone])

  const skip = () => {
    if (!skippable || finished) return
    if (i < lines.length - 1) setI(lines.length - 1)
    else {
      setFinished(true)
      onDone?.()
    }
  }

  const showing = finished && !keepLast ? null : lines[i]

  return (
    <div
      className={`relative flex min-h-[3.5em] items-center justify-center text-center ${className}`}
      onClick={skip}
      role={skippable ? 'button' : undefined}
      tabIndex={skippable ? 0 : undefined}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && skip()}
      aria-label={skippable ? 'Skip ahead' : undefined}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        {showing !== null && (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={textClassName}
          >
            {showing}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
