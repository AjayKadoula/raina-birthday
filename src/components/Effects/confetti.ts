import confetti from 'canvas-confetti'
import { settings } from '../../data/settings'

const palette = ['#c9a96e', '#f5eee2', '#c47a82', '#601e2a', '#e6cfa3']

function allowed() {
  if (!settings.effects.confetti) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** A restrained burst for "unlocked" moments. */
export function celebrate() {
  if (!allowed()) return
  confetti({
    particleCount: 70,
    spread: 65,
    startVelocity: 32,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 220,
    origin: { y: 0.6 },
    colors: palette,
    disableForReducedMotion: true,
  })
}

/** The gift-box reveal: two side cannons plus a slow golden drift. */
export function giftBurst() {
  if (!allowed()) return
  const common = { colors: palette, disableForReducedMotion: true, ticks: 300 }
  confetti({ ...common, particleCount: 90, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } })
  confetti({ ...common, particleCount: 90, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } })
  window.setTimeout(() => {
    confetti({
      ...common,
      particleCount: 120,
      spread: 120,
      startVelocity: 18,
      gravity: 0.5,
      scalar: 0.7,
      origin: { y: 0.4 },
      shapes: ['circle'],
    })
  }, 250)
}
