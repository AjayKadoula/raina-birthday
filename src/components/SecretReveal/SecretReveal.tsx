import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { easterEgg } from '../../data/birthday'
import { asset } from '../../utils/assets'
import { msUntilDate, splitDuration } from '../../utils/date'
import { SmartImage } from '../ui/SmartImage'

type Props = { onSeen: () => void }

/**
 * The easter egg — deliberately labelled a secret, not "Surprise #8".
 * A small sparkle button appears once the seven are done; it opens a sheet
 * of "things I almost put on this website". Disable via easterEgg.enabled.
 */
export function SecretReveal({ onSeen }: Props) {
  const [open, setOpen] = useState(false)
  if (!easterEgg.enabled) return null

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 14 }}
        onClick={() => {
          setOpen(true)
          onSeen()
        }}
        aria-label="Open the secret"
        className="btn-ghost"
      >
        <Sparkles size={16} className="text-gold" />
        {easterEgg.title}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={easterEgg.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 backdrop-blur-md"
          >
            <div className="mx-auto w-full max-w-lg px-5 py-10 sm:py-16">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow mb-2">Not one of the seven</p>
                  <h2 className="font-serif text-title leading-tight text-ivory">{easterEgg.intro}</h2>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="btn-quiet shrink-0">
                  <X size={20} />
                </button>
              </div>

              <ul className="space-y-5">
                {easterEgg.items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12 }}
                    className="overflow-hidden rounded-2xl border border-ivory/10 bg-charcoal/60"
                  >
                    {item.kind === 'photo' && item.src && <SmartImage photo={{ src: item.src, alt: item.title }} className="aspect-[4/3] w-full" />}
                    {item.kind === 'video' && item.src && <video src={asset(item.src)} controls playsInline className="w-full" />}
                    <div className="p-5">
                      <h3 className="font-serif text-2xl text-ivory">{item.title}</h3>
                      {item.body && <p className="mt-2 font-sans text-[0.95rem] leading-relaxed text-ivory/65">{item.body}</p>}
                      {item.kind === 'audio' && item.src && <audio src={asset(item.src)} controls className="mt-4 w-full" />}
                      {item.kind === 'countdown' && item.date && <MiniCountdown iso={item.date} />}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function MiniCountdown({ iso }: { iso: string }) {
  const [ms, setMs] = useState(msUntilDate(iso))
  useEffect(() => {
    const t = window.setInterval(() => setMs(msUntilDate(iso)), 1000)
    return () => window.clearInterval(t)
  }, [iso])
  if (ms <= 0) return <p className="mt-4 font-hand text-2xl text-gold">It's today.</p>
  const d = splitDuration(ms)
  return (
    <p className="mt-4 font-serif text-3xl tabular-nums text-gold">
      {d.days}
      <span className="mx-1 font-sans text-xs uppercase tracking-[0.2em] text-ivory/40">d</span>
      {String(d.hours).padStart(2, '0')}
      <span className="mx-1 font-sans text-xs uppercase tracking-[0.2em] text-ivory/40">h</span>
      {String(d.minutes).padStart(2, '0')}
      <span className="mx-1 font-sans text-xs uppercase tracking-[0.2em] text-ivory/40">m</span>
    </p>
  )
}
