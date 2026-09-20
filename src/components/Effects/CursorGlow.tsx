import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * A soft warm glow that trails the pointer on desktop only
 * (fine pointer + hover). Purely decorative; hidden from touch devices.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches && !reduced)
    const onChange = () => setEnabled(mq.matches && !reduced)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgb(var(--c-gold)/0.14)_0%,transparent_60%)] mix-blend-screen"
    />
  )
}
