import { useCallback, useEffect, useRef, useState } from 'react'
import { settings } from '../data/settings'
import { asset } from '../utils/assets'

/**
 * A single looping <audio> element. Browsers refuse autoplay, so playback is
 * only ever started from a user gesture: the toggle, or (optionally) the
 * first tap anywhere on the page.
 */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [available, setAvailable] = useState<boolean>(settings.music.enabled)
  const triedAutoStart = useRef(false)

  useEffect(() => {
    if (!settings.music.enabled) return
    const el = new Audio(asset(settings.music.src))
    el.loop = true
    el.preload = 'auto'
    el.volume = settings.music.volume
    el.addEventListener('error', () => setAvailable(false))
    el.addEventListener('play', () => setPlaying(true))
    el.addEventListener('pause', () => setPlaying(false))
    audioRef.current = el
    return () => {
      el.pause()
      audioRef.current = null
    }
  }, [])

  const play = useCallback(async () => {
    const el = audioRef.current
    if (!el) return
    try {
      await el.play()
    } catch {
      /* blocked until a real gesture */
    }
  }, [])

  const pause = useCallback(() => audioRef.current?.pause(), [])

  const toggle = useCallback(() => {
    if (audioRef.current?.paused) void play()
    else pause()
  }, [play, pause])

  // First interaction anywhere starts the music once (if allowed).
  useEffect(() => {
    if (!settings.music.enabled || !settings.music.startOnFirstInteraction) return
    const handler = () => {
      if (triedAutoStart.current) return
      triedAutoStart.current = true
      void play()
    }
    window.addEventListener('pointerdown', handler, { once: true })
    window.addEventListener('keydown', handler, { once: true })
    return () => {
      window.removeEventListener('pointerdown', handler)
      window.removeEventListener('keydown', handler)
    }
  }, [play])

  return { playing, available, toggle }
}
