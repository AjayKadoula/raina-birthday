import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { intro } from '../../data/birthday'
import { Chapter } from '../ui/Chapter'
import { LineSequence } from '../ui/LineSequence'
import { Particles } from '../Effects/Particles'
import { settings } from '../../data/settings'

type Props = { onBegin: () => void; daysToGo: number | null }

/** Screen 0 — the hook. Three lines, one rule, one button. */
export function Intro({ onBegin, daysToGo }: Props) {
  const [showRule, setShowRule] = useState(false)

  return (
    <Chapter tone="charcoal">
      {settings.effects.particles && <Particles kind="stars" density={0.7} />}
      {daysToGo !== null && daysToGo > 0 && (
        <p className="absolute top-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-ivory/10 bg-ink/50 px-3 py-1.5 font-sans text-[0.62rem] uppercase tracking-[0.25em] text-ivory/50 backdrop-blur-md">
          Preview · {daysToGo} {daysToGo === 1 ? 'day' : 'days'} to go
        </p>
      )}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-10 text-center">
        <LineSequence lines={intro.lines} hold={2.1} onDone={() => setShowRule(true)} />

        <AnimatePresence>
          {showRule && (
            <motion.div
              key="rule"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="max-w-md font-sans text-lead leading-relaxed text-ivory/75">{intro.rule}</p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onBegin}
                className="btn-primary"
              >
                {intro.button.replace(/\s*→$/, '')}
                <ArrowRight size={18} />
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="font-hand text-xl text-gold/70"
              >
                {intro.footnote}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Chapter>
  )
}
