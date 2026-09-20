import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Mail } from 'lucide-react'
import { memoryGame } from '../../data/birthday'
import { asset } from '../../utils/assets'
import { celebrate } from '../Effects/confetti'
import { Particles } from '../Effects/Particles'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { aspectClass } from '../../utils/aspect'
import { Unlocked } from '../ui/Unlocked'
import { settings } from '../../data/settings'

type Props = { onNext: () => void }

type Card = { key: string; pairId: string; photo: (typeof memoryGame.pairs)[number]['photo']; label: string }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Surprise #4 — the memory lock. Sealed envelopes hide photo pairs; match
 * them all to open a quiet, cinematic reveal.
 */
export function MemoryGame({ onNext }: Props) {
  const cards = useMemo<Card[]>(
    () =>
      shuffle(
        memoryGame.pairs.flatMap((p) => [
          { key: `${p.id}-a`, pairId: p.id, photo: p.photo, label: p.label },
          { key: `${p.id}-b`, pairId: p.id, photo: p.photo, label: p.label },
        ]),
      ),
    [],
  )
  const [open, setOpen] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [phase, setPhase] = useState<'play' | 'solved' | 'reveal' | 'done'>('play')

  const flip = (c: Card) => {
    if (phase !== 'play' || open.length === 2 || open.includes(c.key) || matched.has(c.pairId)) return
    const next = [...open, c.key]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next.map((k) => cards.find((x) => x.key === k)!)
      if (a.pairId === b.pairId) {
        window.setTimeout(() => {
          setMatched((s) => new Set(s).add(a.pairId))
          setOpen([])
        }, 500)
      } else {
        window.setTimeout(() => setOpen([]), 900)
      }
    }
  }

  useEffect(() => {
    if (phase === 'play' && matched.size === memoryGame.pairs.length) {
      const t = window.setTimeout(() => {
        setPhase('solved')
        celebrate()
      }, 500)
      return () => window.clearTimeout(t)
    }
  }, [matched, phase])

  useEffect(() => {
    if (phase !== 'solved') return
    const t = window.setTimeout(() => setPhase('reveal'), 2600)
    return () => window.clearTimeout(t)
  }, [phase])

  const cols = cards.length <= 6 ? 'grid-cols-3' : 'grid-cols-4 sm:grid-cols-4'

  return (
    <Chapter tone="dark">
      {settings.effects.particles && phase !== 'play' && <Particles kind="both" density={0.6} />}
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {phase === 'play' && (
            <motion.div key="play" exit={{ opacity: 0, scale: 0.98 }}>
              <Reveal className="mb-8 text-center">
                <p className="eyebrow mb-3">Surprise #4</p>
                <h1 className="font-serif text-headline leading-[1.05] text-ivory">{memoryGame.title}</h1>
                <p className="mt-3 font-sans text-sm text-ivory/55">{memoryGame.subtitle}</p>
              </Reveal>

              <div className={`grid ${cols} gap-2.5 sm:gap-3`} role="group" aria-label="Memory cards">
                {cards.map((c, i) => {
                  const isOpen = open.includes(c.key) || matched.has(c.pairId)
                  return (
                    <motion.button
                      key={c.key}
                      type="button"
                      onClick={() => flip(c)}
                      aria-label={isOpen ? c.label : 'Sealed envelope'}
                      aria-pressed={isOpen}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="relative aspect-[3/4] [perspective:800px]"
                    >
                      <motion.div
                        animate={{ rotateY: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-full w-full [transform-style:preserve-3d]"
                      >
                        {/* Back — sealed envelope */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border border-gold/25 bg-[linear-gradient(160deg,rgb(var(--c-charcoal)),rgb(var(--c-burgundy)))] shadow-card [backface-visibility:hidden]">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold/70">
                            <Mail size={13} strokeWidth={1.5} />
                          </span>
                          <span className="font-serif text-[0.6rem] tracking-[0.25em] text-gold/40">SEALED</span>
                        </div>
                        {/* Front — the photo, polaroid style */}
                        <div
                          className={`absolute inset-0 rounded-lg bg-ivory p-1.5 pb-4 shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                            matched.has(c.pairId) ? 'ring-2 ring-gold/70' : ''
                          }`}
                        >
                          <SmartImage photo={c.photo} className="h-full w-full rounded-[2px]" />
                          <span className="absolute bottom-0.5 left-0 right-0 truncate text-center font-hand text-[0.7rem] text-ink/60">{c.label}</span>
                        </div>
                      </motion.div>
                    </motion.button>
                  )
                })}
              </div>

              <p className="mt-6 text-center font-sans text-[0.68rem] uppercase tracking-[0.3em] text-ivory/35">
                {matched.size} / {memoryGame.pairs.length} matched · {moves} {moves === 1 ? 'move' : 'moves'}
              </p>
            </motion.div>
          )}

          {phase === 'solved' && (
            <motion.div key="solved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <p className="font-serif text-display leading-none text-ivory">{memoryGame.solved}</p>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-7 text-center"
              role="dialog"
              aria-label="A hidden memory"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full overflow-hidden rounded-2xl shadow-cinematic"
              >
                {memoryGame.reveal.video ? (
                  <video src={asset(memoryGame.reveal.video)} controls playsInline className="w-full" />
                ) : (
                  <SmartImage photo={memoryGame.reveal.photo} priority className={`w-full ${aspectClass(memoryGame.reveal.photo)}`} />
                )}
              </motion.div>
              <Reveal delay={0.6}>
                <h2 className="font-serif text-title leading-tight text-ivory">{memoryGame.reveal.title}</h2>
                <p className="mt-4 font-sans text-lead leading-relaxed text-ivory/75">{memoryGame.reveal.message}</p>
              </Reveal>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                type="button"
                onClick={() => setPhase('done')}
                className="btn-ghost"
              >
                Okay. I'm ready.
              </motion.button>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Unlocked label={memoryGame.unlocked} next="Open Surprise #5" onNext={onNext} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
