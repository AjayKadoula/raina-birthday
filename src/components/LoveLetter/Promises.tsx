import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { promises } from '../../data/birthday'
import { Reveal } from '../ui/Reveal'

type Props = { onNext: () => void }

/**
 * Her own words, quoted back — then everything she asked for, ticked off
 * one by one with what he has done about it. Sits inside Surprise #7,
 * just before the envelope.
 */
export function Promises({ onNext }: Props) {
  const quoteDone = 0.6 + promises.quote.length * 0.9
  const listStart = quoteDone + 0.8
  const listDone = listStart + promises.items.length * 0.55
  const vowStart = listDone + 0.6
  const closingAt = vowStart + promises.vow.length * 0.9 + 0.4

  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-9 text-left">
      <Reveal className="w-full text-center">
        <p className="eyebrow mb-3">{promises.eyebrow}</p>
        <h2 className="font-serif text-headline leading-[1.05] text-ivory">{promises.title}</h2>
      </Reveal>

      <blockquote className="w-full border-l-2 border-gold/50 pl-5">
        {promises.quote.map((q, i) => (
          <motion.p
            key={q}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.9, duration: 0.9 }}
            className="mb-3 font-hand text-[1.45rem] leading-snug text-gold/90 last:mb-0"
          >
            “{q}”
          </motion.p>
        ))}
      </blockquote>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: listStart }}
        className="w-full"
        aria-label={promises.listTitle}
      >
        <p className="eyebrow mb-3">{promises.listTitle}</p>
        <ul className="divide-y divide-ivory/10 rounded-2xl border border-ivory/10 bg-ink/40">
          {promises.items.map((it, i) => (
            <motion.li
              key={it.ask}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: listStart + i * 0.55, duration: 0.6 }}
              className="flex items-start gap-3.5 px-4 py-3.5"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: listStart + i * 0.55 + 0.35, type: 'spring', stiffness: 300, damping: 16 }}
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink"
                aria-hidden
              >
                <Check size={13} strokeWidth={3} />
              </motion.span>
              <span className="min-w-0">
                <span className="block font-serif text-lg leading-snug text-ivory">{it.ask}</span>
                <span className="mt-0.5 block font-sans text-sm text-gold/80">{it.status}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      <div className="w-full space-y-4">
        {promises.vow.map((v, i) => (
          <motion.p
            key={v}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: vowStart + i * 0.9, duration: 0.9 }}
            className="font-serif text-[1.2rem] leading-relaxed text-ivory/85"
          >
            {v}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: closingAt, duration: 1 }}
        className="w-full text-center font-serif text-title italic text-gold"
      >
        {promises.closing}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: closingAt + 1.2, duration: 0.9 }}
        className="w-full text-center font-hand text-3xl text-ivory"
      >
        {promises.lastWord}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: closingAt + 2.2 }}
        type="button"
        onClick={onNext}
        className="btn-primary"
      >
        {promises.button.replace(/\s*→$/, '')} <ArrowRight size={18} />
      </motion.button>
    </div>
  )
}
