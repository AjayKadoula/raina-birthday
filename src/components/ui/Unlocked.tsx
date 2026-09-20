import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

type Props = {
  label: string
  next?: string
  onNext: () => void
  /** Lines shown above the unlocked stamp, e.g. "Okay, okay. I promise..." */
  lead?: readonly string[]
}

/** The "Surprise #N unlocked." stamp with its next-step button. */
export function Unlocked({ label, next = 'Continue', onNext, lead }: Props) {
  const leadDelay = lead ? 0.6 + lead.length * 0.6 : 0.3
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center"
    >
      {lead && (
        <div className="space-y-1">
          {lead.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.6, duration: 0.8 }}
              className="font-serif text-title leading-tight text-ivory"
            >
              {l}
            </motion.p>
          ))}
        </div>
      )}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
        animate={{ scale: 1, opacity: 1, rotate: -2 }}
        transition={{ delay: leadDelay, type: 'spring', stiffness: 220, damping: 16 }}
        className="inline-flex items-center gap-2 rounded-md border border-gold/60 px-4 py-2 font-sans text-xs uppercase tracking-[0.3em] text-gold"
      >
        <Check size={14} strokeWidth={2} />
        {label}
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: leadDelay + 0.6 }}
        onClick={onNext}
        className="btn-primary"
      >
        {next}
        <ArrowRight size={18} />
      </motion.button>
    </motion.div>
  )
}
