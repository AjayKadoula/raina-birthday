import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  /** 'stars' — tiny gold points; 'hearts' — a few soft drifting hearts. */
  kind?: 'stars' | 'hearts' | 'both'
  density?: number
  className?: string
}

type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; heart: boolean; phase: number }

/**
 * A single lightweight canvas of slow-drifting particles. Respects
 * prefers-reduced-motion by rendering a static, sparse field instead.
 */
export function Particles({ kind = 'stars', density = 1, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let ps: P[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 22000 * density) + 12
      ps = Array.from({ length: count }, () => spawn(true))
    }

    const spawn = (anywhere: boolean): P => {
      const heart = kind === 'hearts' || (kind === 'both' && Math.random() < 0.18)
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        r: heart ? 4 + Math.random() * 5 : 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.06 + Math.random() * (heart ? 0.18 : 0.1)),
        a: 0.15 + Math.random() * 0.5,
        heart,
        phase: Math.random() * Math.PI * 2,
      }
    }

    const drawHeart = (x: number, y: number, s: number) => {
      ctx.beginPath()
      ctx.moveTo(x, y + s * 0.35)
      ctx.bezierCurveTo(x, y, x - s, y - s * 0.2, x - s, y + s * 0.35)
      ctx.bezierCurveTo(x - s, y + s * 0.85, x, y + s * 1.1, x, y + s * 1.35)
      ctx.bezierCurveTo(x, y + s * 1.1, x + s, y + s * 0.85, x + s, y + s * 0.35)
      ctx.bezierCurveTo(x + s, y - s * 0.2, x, y, x, y + s * 0.35)
      ctx.closePath()
      ctx.fill()
    }

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        const tw = 0.5 + 0.5 * Math.sin(t / 900 + p.phase)
        ctx.globalAlpha = p.a * (p.heart ? 0.6 : tw)
        ctx.fillStyle = p.heart ? 'rgb(196 122 130)' : 'rgb(201 169 110)'
        if (p.heart) drawHeart(p.x, p.y, p.r)
        else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fill()
        }
        if (!reduced) {
          p.x += p.vx + Math.sin(t / 2000 + p.phase) * 0.05
          p.y += p.vy
          if (p.y < -12 || p.x < -12 || p.x > w + 12) Object.assign(p, spawn(false))
        }
      }
      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(frame)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [kind, density, reduced])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
