import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /** Animate when scrolled into view instead of on mount. */
  onScroll?: boolean
}

/** Soft cinematic fade-up used for nearly all text. */
export function Reveal({ children, delay = 0, className, onScroll = false }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      {...(onScroll ? { whileInView: 'show', viewport: { once: true, amount: 0.4 } } : { animate: 'show' })}
    >
      {children}
    </motion.div>
  )
}
