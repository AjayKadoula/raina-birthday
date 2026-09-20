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
      title={playing ? 'Mute' : 'Play'}
      className="fixed right-4 z-40 flex h-10 items-center gap-2.5 rounded-full border border-ivory/10 bg-ink/60 pl-3.5 pr-4 font-sans text-[0.68rem] tracking-[0.25em] text-ivory/75 backdrop-blur-md transition-colors hover:text-gold"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <span className="flex h-4 w-4 items-center justify-center" aria-hidden>
        {playing ? (
          <span className="flex h-3.5 items-end gap-[2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-sm bg-gold"
                style={{ height: 6, animation: `eq 0.9s ease-in-out ${i * 0.15}s infinite alternate` }}
              />
            ))}
          </span>
        ) : (
          <VolumeX size={15} strokeWidth={1.75} />
        )}
      </span>
      <Music size={13} strokeWidth={1.75} className="opacity-60" aria-hidden />
      <span className="leading-none">{settings.music.label.toUpperCase()}</span>
      <style>{`@keyframes eq { from { height: 4px } to { height: 14px } }`}</style>
    </button>
  )
}
