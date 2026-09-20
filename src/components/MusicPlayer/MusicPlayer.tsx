import { Music, VolumeX } from 'lucide-react'
import { settings } from '../../data/settings'

type Props = {
  playing: boolean
  available: boolean
  onToggle: () => void
}

/** A tasteful "♫ Music" pill in the corner. Hidden if music is off or the file is missing. */
export function MusicPlayer({ playing, available, onToggle }: Props) {
  if (!settings.music.enabled || !available) return null
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={playing ? 'Mute music' : 'Play music'}
      className="fixed bottom-4 right-4 z-40 flex min-h-[44px] items-center gap-2 rounded-full border border-ivory/10 bg-ink/60 px-4 py-2 font-sans text-xs tracking-[0.2em] text-ivory/75 backdrop-blur-md transition-colors hover:text-gold"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {playing ? (
        <span className="flex items-end gap-[2px]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-sm bg-gold"
              style={{ height: 10, animation: `eq 0.9s ease-in-out ${i * 0.15}s infinite alternate` }}
            />
          ))}
        </span>
      ) : (
        <VolumeX size={14} />
      )}
      <Music size={13} className="opacity-60" />
      {settings.music.label.toUpperCase()}
      <style>{`@keyframes eq { from { height: 4px } to { height: 12px } }`}</style>
    </button>
  )
}
