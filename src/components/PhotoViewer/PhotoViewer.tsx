import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo } from '../../data/types'
import { asset } from '../../utils/assets'

export type ViewerItem = { photo: Photo; caption?: string; title?: string }

type Props = {
  items: ViewerItem[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

/**
 * Full-screen lightbox: swipe on touch, arrow keys on desktop, Escape to close.
 * Images are shown whole (object-contain) so nothing is cropped here.
 */
export function PhotoViewer({ items, index, onClose, onIndex }: Props) {
  const open = index !== null && items[index] !== undefined
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onIndex((index + dir + items.length) % items.length)
    },
    [index, items.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, go, onClose])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-3 pt-3">
            <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-ivory/50">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={onClose} aria-label="Close" className="btn-quiet">
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={index}
                src={asset(items[index].photo.src)}
                alt={items[index].photo.alt ?? ''}
                drag={items.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={onDragEnd}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-cinematic"
                draggable={false}
              />
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-ink/50 p-3 text-ivory/70 hover:text-gold sm:block"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-ink/50 p-3 text-ivory/70 hover:text-gold sm:block"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          <div className="safe-bottom px-6 pt-3 text-center">
            {items[index].title && <p className="font-serif text-xl text-ivory">{items[index].title}</p>}
            {items[index].caption && <p className="mt-1 font-sans text-sm text-ivory/60">{items[index].caption}</p>}
            {items.length > 1 && <p className="mt-3 font-sans text-[0.65rem] tracking-[0.2em] text-ivory/30 sm:hidden">SWIPE</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
