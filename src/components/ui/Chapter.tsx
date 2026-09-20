import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** 'dark' for cinematic screens, 'wine' for the warmer story sections. */
  tone?: 'dark' | 'wine' | 'charcoal'
  /** Full-height, vertically centred (default) or a scrolling section. */
  center?: boolean
}

const tones = {
  dark: 'bg-ink',
  wine: 'bg-[radial-gradient(120%_90%_at_50%_0%,rgb(var(--c-burgundy))_0%,rgb(var(--c-ink))_70%)]',
  charcoal: 'bg-[radial-gradient(100%_80%_at_50%_100%,rgb(var(--c-charcoal))_0%,rgb(var(--c-ink))_70%)]',
}

/** A full-screen chapter with a cinematic cross-fade between stages. */
export function Chapter({ children, className = '', tone = 'dark', center = true }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`paper relative min-h-[100svh] w-full overflow-x-hidden ${tones[tone]} ${
        center ? 'flex flex-col items-center justify-center' : ''
      } px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </motion.section>
  )
}
