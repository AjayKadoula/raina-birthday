import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { settings } from '../../data/settings'
import { asset } from '../../utils/assets'

type Balloon = {
  id: number
  x: number // % of width
  size: number // px
  hue: string
  glow: boolean
  duration: number
  delay: number
  wobble: number
}

type Burst = { id: number; x: number; y: number; word: string }

const COLOURS = ['rgb(var(--c-wine))', 'rgb(var(--c-rose))', 'rgb(var(--c-gold))', 'rgb(var(--c-cream))']

let seq = 0
function make(i: number, glowEvery = 3): Balloon {
  return {
    id: ++seq,
    x: 6 + Math.random() * 88,
    size: 44 + Math.random() * 30,
    hue: COLOURS[i % COLOURS.length],
    glow: i % glowEvery === 0,
    duration: 7 + Math.random() * 5,
    // Negative delay starts the loop part-way through, so balloons are spread out from the first frame.
    delay: -Math.random() * 10,
    wobble: 8 + Math.random() * 14,
  }
}

/** A short, soft "pop" from Web Audio — no file needed. */
function popSound(ctx: AudioContext) {
  const t = ctx.currentTime
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3)
  const src = ctx.createBufferSource()
  src.buffer = buf
  const flt = ctx.createBiquadFilter()
  flt.type = 'bandpass'
  flt.frequency.value = 900
  flt.Q.value = 0.8
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.5, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
  src.connect(flt)
  flt.connect(g)
  g.connect(ctx.destination)
  src.start(t)
}

/**
 * Floating balloons she can pop. Each pop: a little burst, a pop sound, and
 * a word that drifts up ("Love you", "Dugguu"...). If voice clips are
 * configured, a random one plays; otherwise the phone's own voice says it.
 */
type Props = { count?: number; className?: string; onPop?: (word: string) => void; active?: boolean }

export function Balloons({ count = settings.balloons.count, className = '', onPop, active = true }: Props) {
  const reduced = useReducedMotion()
  const [balloons, setBalloons] = useState<Balloon[]>(() => Array.from({ length: count }, (_, i) => make(i)))
  const [bursts, setBursts] = useState<Burst[]>([])
  const ctxRef = useRef<AudioContext | null>(null)
  const voices = useMemo(() => settings.balloons.voices.map((v) => new Audio(asset(v))), [])
  const wordIdx = useRef(0)

  const say = useCallback(
    (word: string) => {
      const clip = voices.length ? voices[Math.floor(Math.random() * voices.length)] : null
      if (clip) {
        clip.currentTime = 0
        clip.volume = 0.9
        void clip.play().catch(() => speak(word))
      } else {
        speak(word)
      }
    },
    [voices],
  )

  const pop = useCallback(
    (b: Balloon, clientX: number, clientY: number) => {
      try {
        ctxRef.current ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        if (ctxRef.current.state === 'suspended') void ctxRef.current.resume()
        popSound(ctxRef.current)
      } catch {
        /* no audio */
      }
      const phrase = settings.balloons.phrases[wordIdx.current++ % settings.balloons.phrases.length]
      say(phrase.say)
      setBursts((s) => [...s, { id: ++seq, x: clientX, y: clientY, word: phrase.text }])
      onPop?.(phrase.text)
      setBalloons((list) => list.map((x) => (x.id === b.id ? { ...make(list.indexOf(x)), delay: 1 + Math.random() * 2 } : x)))
    },
    [say, onPop],
  )

  useEffect(() => {
    if (!bursts.length) return
    const t = window.setTimeout(() => setBursts((s) => s.slice(1)), 1800)
    return () => window.clearTimeout(t)
  }, [bursts])

  if (!settings.balloons.enabled) return null

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden={false}>
      {balloons.map((b) => (
        <button
          key={b.id}
          type="button"
          aria-label="Pop a balloon"
          onPointerDown={(e) => active && pop(b, e.clientX, e.clientY)}
          className="pointer-events-auto absolute bottom-0 flex min-h-[56px] min-w-[56px] items-center justify-center bg-transparent active:scale-125"
          style={{
            left: `${b.x}%`,
            animation: reduced ? 'none' : `balloon-rise ${b.duration}s linear ${b.delay}s infinite`,
            transform: reduced ? 'translateY(-45vh)' : undefined,
          }}
        >
          <span
            className="relative block"
            style={{ animation: reduced ? 'none' : `balloon-sway ${4 + b.wobble / 5}s ease-in-out ${b.delay / 2}s infinite alternate` }}
          >
            <span
              className="block"
              style={{
                width: b.size,
                height: b.size * 1.2,
                borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
                background: `radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.55), transparent 35%), ${b.hue}`,
                boxShadow: b.glow
                  ? `0 0 26px 8px ${b.hue.replace(')', ' / 0.55)')}, inset 0 -8px 16px rgb(0 0 0 / 0.25)`
                  : 'inset 0 -8px 16px rgb(0 0 0 / 0.25)',
                opacity: b.glow ? 0.95 : 0.85,
              }}
            />
            <span
              className="absolute left-1/2 top-full h-10 w-px origin-top bg-ivory/40"
              style={{ transform: `rotate(${(b.wobble - 11) * 0.6}deg)` }}
            />
          </span>
        </button>
      ))}

      <style>{`
        @keyframes balloon-rise { from { transform: translateY(105vh); opacity: 0 } 5% { opacity: 1 } 96% { opacity: 1 } to { transform: translateY(-30vh); opacity: 0 } }
        @keyframes balloon-sway { from { transform: translateX(-10px) rotate(-3deg) } to { transform: translateX(10px) rotate(3deg) } }
      `}</style>

      <AnimatePresence>
        {bursts.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -90, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="fixed z-30 -translate-x-1/2 whitespace-nowrap font-hand text-3xl text-gold drop-shadow-[0_2px_8px_rgb(0_0_0/0.6)]"
            style={{ left: p.x, top: p.y - 30 }}
          >
            {p.word}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

function speak(text: string) {
  if (!settings.balloons.speakFallback || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const all = window.speechSynthesis.getVoices()
    const { pitch, rate, preferFemale } = settings.balloons.voice
    const female = (v: SpeechSynthesisVoice) => /female|woman|girl|zira|heera|veena|lekha|samantha|kalpana|priya|neerja|swara/i.test(v.name)
    const pick = (pred: (v: SpeechSynthesisVoice) => boolean) => all.find((v) => pred(v) && (!preferFemale || female(v))) ?? all.find(pred)
    u.voice = pick((v) => /hi[-_]IN/i.test(v.lang)) ?? pick((v) => /en[-_]IN/i.test(v.lang)) ?? pick((v) => v.lang.startsWith('en')) ?? null
    u.lang = 'hi-IN'
    u.pitch = Math.min(2, Math.max(0.1, pitch))
    u.rate = rate
    u.volume = 1
    window.speechSynthesis.speak(u)
  } catch {
    /* unsupported */
  }
}
