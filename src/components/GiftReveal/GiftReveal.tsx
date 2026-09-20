import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Gift as GiftIcon } from 'lucide-react'
import { giftScreen } from '../../data/birthday'
import { settings } from '../../data/settings'
import { giftBurst } from '../Effects/confetti'
import { Particles } from '../Effects/Particles'
import { Chapter } from '../ui/Chapter'
import { LineSequence } from '../ui/LineSequence'
import { Unlocked } from '../ui/Unlocked'
import { GiftCalendar, useUnlockedGifts } from './GiftCalendar'

type Props = { onNext: () => void; seen: string[]; onSeen: (id: string) => void }

/**
 * Surprise #6 — the gift box. Screen darkens, a box sits in warm light;
 * "Open your gift" shakes it, the ribbon lifts, the lid flies, a burst of
 * light and confetti, and the configurable gift card rises out of it.
 */
export function GiftReveal({ onNext, seen, onSeen }: Props) {
  const [phase, setPhase] = useState<'lines' | 'box' | 'opening' | 'revealed' | 'done'>('lines')
  const unlocked = useUnlockedGifts()

  const openBox = () => {
    if (phase !== 'box') return
    setPhase('opening')
    window.setTimeout(giftBurst, 900)
    window.setTimeout(() => setPhase('revealed'), 1500)
  }

  const opening = phase === 'opening' || phase === 'revealed'

  return (
    <Chapter tone="dark">
      {settings.effects.particles && <Particles kind="stars" density={0.5} />}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === 'lines' && (
            <motion.div key="lines" exit={{ opacity: 0 }}>
              <p className="eyebrow mb-6">Surprise #6</p>
              <LineSequence lines={giftScreen.lines} hold={2} onDone={() => setPhase('box')} keepLast={false} />
            </motion.div>
          )}

          {(phase === 'box' || opening) && (
            <motion.div key="box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
              {/* Warm light pool */}
              <motion.div
                aria-hidden
                animate={opening ? { opacity: [0.35, 1, 0.5], scale: [1, 1.8, 1.3] } : { opacity: 0.35, scale: 1 }}
                transition={{ duration: 1.4 }}
                style={{ left: 'calc(50% - 210px)', top: 'calc(50% - 210px)' }}
                className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgb(var(--c-gold)/0.35)_0%,transparent_60%)]"
              />

              <motion.div
                animate={phase === 'opening' ? { x: [0, -6, 6, -5, 5, -3, 3, 0], rotate: [0, -2, 2, -1.5, 1.5, 0] } : { y: [0, -6, 0] }}
                transition={phase === 'opening' ? { duration: 0.7 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mb-12 h-[220px] w-[220px] [perspective:900px]"
                style={{ opacity: phase === 'revealed' ? 0.35 : 1, transition: 'opacity 1s' }}
              >
                {/* Lid */}
                <motion.div
                  animate={opening ? { y: -150, rotateX: -35, rotate: -14, opacity: 0 } : { y: 0, rotateX: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ left: 'calc(50% - 118px)' }}
                  className="absolute top-[38px] z-20 h-[46px] w-[236px] rounded-md bg-[linear-gradient(180deg,rgb(var(--c-wine)),rgb(var(--c-burgundy)))] shadow-cinematic"
                >
                  <div className="absolute left-1/2 top-0 h-full w-[34px] -translate-x-1/2 bg-gold/90" />
                  {/* Bow */}
                  <motion.div
                    animate={opening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    style={{ left: 'calc(50% - 40px)' }}
                    className="absolute top-[-26px]"
                  >
                    <div className="relative h-8 w-20">
                      <span className="absolute left-0 top-1 h-7 w-9 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-2 border-gold/80 bg-gold/30 [transform:rotate(-20deg)]" />
                      <span className="absolute right-0 top-1 h-7 w-9 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] border-2 border-gold/80 bg-gold/30 [transform:rotate(20deg)]" />
                      <span className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-gold" />
                    </div>
                  </motion.div>
                </motion.div>

                {/* Light burst from inside */}
                <motion.div
                  aria-hidden
                  animate={opening ? { opacity: [0, 1, 0.6], scaleY: [0.2, 1.4, 1] } : { opacity: 0, scaleY: 0.2 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  style={{ left: 'calc(50% - 80px)' }}
                  className="absolute bottom-[40px] z-10 h-[220px] w-[160px] origin-bottom bg-[linear-gradient(0deg,rgb(var(--c-gold)/0.6),transparent)] blur-md"
                />

                {/* Body */}
                <div className="absolute bottom-0 left-1/2 h-[150px] w-[210px] -translate-x-1/2 rounded-b-lg rounded-t-sm bg-[linear-gradient(180deg,rgb(var(--c-burgundy)),rgb(var(--c-ink)))] shadow-cinematic">
                  <div className="absolute left-1/2 top-0 h-full w-[34px] -translate-x-1/2 bg-gold/80" />
                  <div className="absolute inset-x-0 top-0 h-px bg-ivory/20" />
                </div>
              </motion.div>

              {phase === 'box' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  type="button"
                  onClick={openBox}
                  className="btn-primary"
                >
                  <GiftIcon size={18} />
                  {giftScreen.button}
                </motion.button>
              )}

              {/* The calendar rising out of the box */}
              <AnimatePresence>
                {phase === 'revealed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: -40 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="-mt-16 flex w-full flex-col items-center gap-6"
                  >
                    <GiftCalendar unlocked={unlocked} seen={seen} onSeen={onSeen} />
                    <button type="button" onClick={() => setPhase('done')} className="btn-ghost">
                      Continue →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Unlocked label={giftScreen.unlocked} lead={[giftScreen.tease]} next="Open Surprise #7" onNext={onNext} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
