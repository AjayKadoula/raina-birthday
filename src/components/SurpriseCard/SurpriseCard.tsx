import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { surprise1 } from '../../data/birthday'
import { celebrate } from '../Effects/confetti'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { Unlocked } from '../ui/Unlocked'
import { PhotoViewer } from '../PhotoViewer/PhotoViewer'

type Props = { onNext: () => void }

/** Surprise #1 — the first reveal: one photo, one message. */
export function SurpriseCard({ onNext }: Props) {
  const [viewer, setViewer] = useState<number | null>(null)

  useEffect(() => {
    const t = window.setTimeout(celebrate, 900)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <Chapter tone="wine" center={false} className="flex flex-col items-center">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-8">
        <Reveal className="text-center">
          <p className="eyebrow">{surprise1.eyebrow}</p>
        </Reveal>

        <motion.button
          type="button"
          onClick={() => setViewer(0)}
          aria-label="Open photo"
          initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          className="w-full rounded-sm bg-ivory p-3 pb-12 shadow-cinematic"
        >
          <SmartImage photo={surprise1.photo} priority className="aspect-[4/5] w-full rounded-[2px]" />
          <span className="mt-4 block text-center font-hand text-2xl text-ink/70">{surprise1.title}</span>
        </motion.button>

        <Reveal delay={0.9} className="text-center">
          <p className="font-sans text-lead leading-relaxed text-ivory/80">{surprise1.message}</p>
        </Reveal>

        <div className="pt-4">
          <Unlocked label={surprise1.unlocked} next={surprise1.next} onNext={onNext} />
        </div>
      </div>

      <PhotoViewer
        items={[{ photo: surprise1.photo, title: surprise1.title }]}
        index={viewer}
        onClose={() => setViewer(null)}
        onIndex={setViewer}
      />
    </Chapter>
  )
}
