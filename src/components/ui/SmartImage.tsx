import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { Photo } from '../../data/types'
import { asset } from '../../utils/assets'

type Props = {
  photo: Photo
  className?: string
  /** Load eagerly for above-the-fold hero imagery. */
  priority?: boolean
  draggable?: boolean
}

/**
 * Every photo goes through here: lazy-loading, a soft loading shimmer,
 * object-position from the config so faces stay in frame, and a graceful
 * tile when a file is missing (so a typo in birthday.ts never breaks a screen).
 */
export function SmartImage({ photo, className = '', priority = false, draggable = false }: Props) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  if (state === 'error') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-charcoal text-ivory/40 ${className}`}
        role="img"
        aria-label={photo.alt ?? 'Photo'}
      >
        <ImageOff size={22} strokeWidth={1.25} />
        <span className="font-serif text-sm italic">a photo goes here</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      {state === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-charcoal via-wine/20 to-charcoal" aria-hidden />
      )}
      <img
        src={asset(photo.src)}
        alt={photo.alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={draggable}
        onLoad={() => setState('ready')}
        onError={() => setState('error')}
        style={{ objectPosition: photo.position ?? 'center' }}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-cinematic ${
          state === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
