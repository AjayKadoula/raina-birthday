import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { story } from '../../data/birthday'
import type { Memory } from '../../data/types'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { aspectClass } from '../../utils/aspect'
import { Unlocked } from '../ui/Unlocked'
import { PhotoViewer, type ViewerItem } from '../PhotoViewer/PhotoViewer'

type Props = { onNext: () => void }

/**
 * Surprise #2 — a vertical mini-film. Each memory is a large photo with a
 * gentle parallax drift and a caption that slides in beside it. Chapter
 * titles act as interstitials. Tapping any photo opens the lightbox with
 * the whole story loaded, so she can swipe through.
 */
export function Timeline({ onNext }: Props) {
  const [viewer, setViewer] = useState<number | null>(null)

  const flat = useMemo<ViewerItem[]>(
    () =>
      story.chapters.flatMap((c) =>
        c.memories.map((m) => ({ photo: m.photo, title: m.title, caption: `${m.date} — ${m.caption}` })),
      ),
    [],
  )

  let running = 0

  return (
    <Chapter tone="wine" center={false} className="!px-0">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <Reveal className="mb-20 text-center sm:mb-28">
          <p className="eyebrow mb-3">Surprise #2</p>
          <h1 className="font-serif text-headline leading-[1.05] text-ivory">{story.title}</h1>
          <p className="mt-3 font-hand text-2xl text-gold/70">{story.subtitle}</p>
        </Reveal>

        {story.chapters.map((chapter, ci) => (
          <section key={chapter.title} className="mb-16 sm:mb-24" aria-label={chapter.title}>
            <Reveal onScroll className="mb-10 sm:mb-14">
              <div className="flex items-baseline gap-4">
                <span className="font-serif text-4xl text-gold/50">{String(ci + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-serif text-title leading-tight text-ivory">{chapter.title}</h2>
                  {chapter.subtitle && <p className="mt-1 font-sans text-sm text-ivory/55">{chapter.subtitle}</p>}
                </div>
              </div>
              <div className="mt-5 h-px w-full bg-gradient-to-r from-gold/50 via-gold/15 to-transparent" />
            </Reveal>

            <div className="space-y-16 sm:space-y-24">
              {chapter.memories.map((m, mi) => {
                const index = running++
                return <MemoryCard key={m.title} memory={m} flip={(ci + mi) % 2 === 1} onOpen={() => setViewer(index)} />
              })}
            </div>
          </section>
        ))}

        <div className="mt-28 mb-10 flex flex-col items-center gap-10 text-center">
          <Reveal onScroll>
            <div className="space-y-1">
              {story.outro.map((l, i) => (
                <p key={l} className={`font-serif text-title leading-tight ${i === story.outro.length - 1 ? 'text-gold' : 'text-ivory'}`}>
                  {l}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal onScroll delay={0.4}>
            <Unlocked label={story.unlocked} next="Open Surprise #3" onNext={onNext} />
          </Reveal>
        </div>
      </div>

      <PhotoViewer items={flat} index={viewer} onClose={() => setViewer(null)} onIndex={setViewer} />
    </Chapter>
  )
}

function MemoryCard({ memory, flip, onOpen }: { memory: Memory; flip: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [30, -30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.06, 1, 1.06])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8 ${flip ? 'sm:flex-row-reverse' : ''}`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${memory.title}`}
        className="group relative w-full overflow-hidden rounded-xl shadow-cinematic sm:w-[58%]"
      >
        <motion.div style={{ y, scale }} className="h-full w-full">
          <SmartImage photo={memory.photo} className={`w-full ${aspectClass(memory.photo)}`} />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-3 left-4 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-ivory/80">{memory.date}</span>
      </button>

      <motion.div
        initial={{ opacity: 0, x: flip ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="sm:w-[42%] sm:pb-6"
      >
        <h3 className="font-serif text-2xl leading-tight text-ivory sm:text-3xl">{memory.title}</h3>
        <p className="mt-3 font-sans text-[0.95rem] leading-relaxed text-ivory/70">{memory.caption}</p>
        {memory.note && <p className="mt-3 font-hand text-xl text-gold/70">{memory.note}</p>}
      </motion.div>
    </motion.article>
  )
}
