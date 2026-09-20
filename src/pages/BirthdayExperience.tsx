import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Gift as GiftIcon, Heart, X } from 'lucide-react'
import { settings } from '../data/settings'
import { useBirthdayProgress, type Stage } from '../hooks/useBirthdayProgress'
import { useMusic } from '../hooks/useMusic'
import { birthdayPhase, msUntilBirthday } from '../utils/date'
import { Countdown } from '../components/Countdown/Countdown'
import { CursorGlow } from '../components/Effects/CursorGlow'
import { Particles } from '../components/Effects/Particles'
import { GiftCalendar, useUnlockedGifts } from '../components/GiftReveal/GiftCalendar'
import { GiftReveal } from '../components/GiftReveal/GiftReveal'
import { Intro } from '../components/Intro/Intro'
import { LoveLetter } from '../components/LoveLetter/LoveLetter'
import { MemoryGame } from '../components/MemoryGame/MemoryGame'
import { MusicPlayer } from '../components/MusicPlayer/MusicPlayer'
import { Progress } from '../components/Progress/Progress'
import { Quiz } from '../components/Quiz/Quiz'
import { Reasons } from '../components/Reasons/Reasons'
import { RoastGame } from '../components/RoastGame/RoastGame'
import { SecretReveal } from '../components/SecretReveal/SecretReveal'
import { SettingsPanel } from '../components/Settings/SettingsPanel'
import { SurpriseCard } from '../components/SurpriseCard/SurpriseCard'
import { Timeline } from '../components/Timeline/Timeline'
import { BirthdayWish } from '../components/Wish/BirthdayWish'
import { Chapter } from '../components/ui/Chapter'
import { Reveal } from '../components/ui/Reveal'

/** Which surprise (1–7) a stage belongs to, for the progress dots. */
const CURRENT: Partial<Record<Stage, number>> = { quiz: 1, s1: 1, s2: 2, s3: 3, s4: 4, s5: 5, s6: 6, s7: 7 }

/**
 * One continuous experience. Stages cross-fade; progress persists in
 * localStorage; the whole thing sits behind the birthday countdown unless
 * settings.lockUntilBirthday is off or the URL carries ?preview.
 */
export function BirthdayExperience() {
  const { progress, stage, goTo, unlock, reset, markSecretSeen, markGiftSeen } = useBirthdayProgress()
  const music = useMusic()

  const preview = useMemo(() => new URLSearchParams(window.location.search).has('preview'), [])
  const [phase, setPhase] = useState(() => birthdayPhase())
  useEffect(() => {
    const t = window.setInterval(() => setPhase(birthdayPhase()), 30_000)
    return () => window.clearInterval(t)
  }, [])
  const locked = settings.lockUntilBirthday && !preview && phase === 'before'
  // Live "time to go" for the preview chip on the intro (ticks every 30s).
  const [msToGo, setMsToGo] = useState(() => msUntilBirthday())
  useEffect(() => {
    const t = window.setInterval(() => setMsToGo(msUntilBirthday()), 30_000)
    return () => window.clearInterval(t)
  }, [])

  // Scroll to the top whenever the chapter changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [stage])

  return (
    <main className="relative min-h-[100svh]">
      {settings.effects.cursorGlow && <CursorGlow />}

      {!locked && stage !== 'intro' && stage !== 'wish' && <Progress unlocked={progress.unlocked} current={CURRENT[stage]} />}

      <AnimatePresence mode="wait">
        {locked ? (
          <Countdown key="countdown" />
        ) : (
          <motion.div key={stage} className="min-h-[100svh]">
            {stage === 'intro' && <Intro onBegin={() => goTo('wish')} msToGo={phase === 'before' ? msToGo : null} />}
            {stage === 'wish' && <BirthdayWish onNext={() => goTo('quiz')} />}
            {stage === 'quiz' && <Quiz onVerified={() => goTo('s1')} />}
            {stage === 's1' && <SurpriseCard onNext={() => unlock(1, 's2')} />}
            {stage === 's2' && <Timeline onNext={() => unlock(2, 's3')} />}
            {stage === 's3' && <RoastGame onNext={() => unlock(3, 's4')} />}
            {stage === 's4' && <MemoryGame onNext={() => unlock(4, 's5')} />}
            {stage === 's5' && <Reasons onNext={() => unlock(5, 's6')} />}
            {stage === 's6' && <GiftReveal onNext={() => unlock(6, 's7')} seen={progress.giftsSeen} onSeen={markGiftSeen} />}
            {stage === 's7' && <LoveLetter onFinished={() => unlock(7, 'end')} />}
            {stage === 'end' && (
              <End onSecretSeen={markSecretSeen} onReplay={() => goTo('intro')} today={phase === 'today'} giftsSeen={progress.giftsSeen} onGiftSeen={markGiftSeen} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer playing={music.playing} available={music.available} onToggle={music.toggle} />
      <SettingsPanel stage={stage} unlocked={progress.unlocked} onReset={reset} onJump={goTo} />
    </main>
  )
}

function End({
  onSecretSeen,
  onReplay,
  today,
  giftsSeen,
  onGiftSeen,
}: {
  onSecretSeen: () => void
  onReplay: () => void
  today: boolean
  giftsSeen: string[]
  onGiftSeen: (id: string) => void
}) {
  const unlocked = useUnlockedGifts()
  const fresh = [...unlocked].filter((id) => !giftsSeen.includes(id)).length
  const [giftsOpen, setGiftsOpen] = useState(false)

  return (
    <Chapter tone="charcoal">
      {settings.effects.particles && <Particles kind="both" density={0.7} />}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8 text-center">
        <Reveal>
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
            <Heart size={22} strokeWidth={1.5} />
          </span>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="eyebrow mb-3">07 / 07</p>
          <h1 className="font-serif text-headline leading-[1.05] text-ivory">{today ? 'Today is your day.' : 'All seven. Unlocked.'}</h1>
          <p className="mt-4 font-sans text-lead text-ivory/65">Don't get used to this level of effort.</p>
          <p className="mt-1 font-hand text-2xl text-gold/70">Okay, maybe you are special.</p>
        </Reveal>
        <div className="flex flex-col items-center gap-3 pt-2">
          <Reveal delay={0.7}>
            <button type="button" onClick={() => setGiftsOpen(true)} className="btn-primary relative">
              <GiftIcon size={18} />
              Your gifts this week
              {fresh > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-wine px-1.5 font-sans text-[0.7rem] font-medium text-ivory shadow-card">
                  {fresh}
                </span>
              )}
            </button>
          </Reveal>
          <SecretReveal onSeen={onSecretSeen} />
          <Reveal delay={1}>
            <button type="button" onClick={onReplay} className="btn-quiet text-ivory/50">
              Watch it again from the start
            </button>
          </Reveal>
        </div>
        <Reveal delay={1.4}>
          <p className="font-sans text-[0.68rem] tracking-[0.2em] text-ivory/30">{settings.footer}</p>
        </Reveal>
      </div>

      <AnimatePresence>
        {giftsOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Your gifts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-md"
          >
            <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-5 py-10 sm:py-16">
              <div className="flex w-full items-center justify-between">
                <p className="eyebrow">Surprise #6</p>
                <button type="button" onClick={() => setGiftsOpen(false)} aria-label="Close" className="btn-quiet">
                  <X size={20} />
                </button>
              </div>
              <GiftCalendar unlocked={unlocked} seen={giftsSeen} onSeen={onGiftSeen} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Chapter>
  )
}
