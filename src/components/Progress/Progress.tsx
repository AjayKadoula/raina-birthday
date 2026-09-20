import { motion } from 'framer-motion'
import { Check, Lock } from 'lucide-react'
import { surpriseNames } from '../../data/birthday'
import { TOTAL_SURPRISES } from '../../hooks/useBirthdayProgress'

type Props = {
  unlocked: number
  /** 1-based index of the surprise currently in progress, if any. */
  current?: number
}

/**
 * Seven tiny dots, top-centre. Unlocked = gold tick, current = glowing
 * ring, locked = dim lock. Reads "03 / 07" to a screen reader.
 */
export function Progress({ unlocked, current }: Props) {
  const label = `${String(Math.min(unlocked, TOTAL_SURPRISES)).padStart(2, '0')} / ${String(TOTAL_SURPRISES).padStart(2, '0')}`
  return (
    <div
      className="pointer-events-none fixed left-1/2 top-4 z-40 -translate-x-1/2"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={TOTAL_SURPRISES}
      aria-valuenow={unlocked}
      aria-label={`Surprises unlocked: ${label}`}
    >
      <div className="flex items-center gap-2.5 rounded-full border border-ivory/10 bg-ink/50 px-3.5 py-2 backdrop-blur-md">
        {Array.from({ length: TOTAL_SURPRISES }, (_, i) => {
          const n = i + 1
          const done = n <= unlocked
          const active = n === current && !done
          return (
            <motion.span
              key={n}
              title={surpriseNames[i]}
              initial={false}
              animate={{ scale: active ? 1.15 : 1 }}
              className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-500 ${
                done
                  ? 'bg-gold text-ink'
                  : active
                    ? 'border border-gold/80 shadow-[0_0_10px_rgb(var(--c-gold)/0.6)]'
                    : 'border border-ivory/20 text-ivory/30'
              }`}
            >
              {done ? <Check size={10} strokeWidth={3} /> : active ? null : <Lock size={8} strokeWidth={2} />}
            </motion.span>
          )
        })}
        <span className="ml-1 whitespace-nowrap font-sans text-[0.62rem] tabular-nums tracking-[0.2em] text-ivory/50">{label}</span>
      </div>
    </div>
  )
}
