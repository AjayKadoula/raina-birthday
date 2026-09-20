import { useCallback, useEffect, useRef, useState } from 'react'
import { settings } from '../data/settings'
import { asset } from '../utils/assets'
import { MusicBox } from '../utils/musicBox'

type Engine = 'file' | 'synth' | null

/**
 * Background music with two engines:
 *  - 'file'  — a looping <audio> element playing settings.music.src, if that
 *              file exists;
 *  - 'synth' — a built-in music-box "Happy Birthday" (public-domain melody,
 *              rendered with Web Audio) when the file is missing and
 *              settings.music.fallbackMelody is on.
 * Browsers refuse autoplay, so playback only ever starts from a user
 * gesture: the toggle, or (optionally) the first tap anywhere.
 */
export function useMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const boxRef = useRef<MusicBox | null>(null)
  const [engine, setEngine] = useState<Engine>(settings.music.enabled ? 'file' : null)
  const [playing, setPlaying] = useState(false)
  const triedAutoStart = useRef(false)

  useEffect(() => {
    if (!settings.music.enabled) return
    const el = new Audio(asset(settings.music.src))
    el.loop = true
    el.preload = 'auto'
    el.volume = settings.music.volume
    el.addEventListener('error', () => setEngine(settings.music.fallbackMelody ? 'synth' : null))
    el.addEventListener('play', () => setPlaying(true))
    el.addEventListener('pause', () => setPlaying(false))
    audioRef.current = el
    return () => {
      el.pause()
      audioRef.current = null
      boxRef.current?.dispose()
      boxRef.current = null
    }
  }, [])

  const startSynth = useCallback(async () => {
    boxRef.current ??= new MusicBox(settings.music.volume)
    try {
      await boxRef.current.start()
      setPlaying(true)
    } catch {
      /* AudioContext unavailable */
    }
  }, [])

  const play = useCallback(async () => {
    if (engine === 'file') {
      const el = audioRef.current
      if (!el) return
      try {
        if (el.error) throw el.error
        await el.play()
      } catch (err) {
        // A missing file (not an autoplay block) → fall through to the music box.
        const blocked = err instanceof DOMException && err.name === 'NotAllowedError'
        if (!blocked && settings.music.fallbackMelody) {
          setEngine('synth')
          await startSynth()
        }
      }
    } else if (engine === 'synth') {
      await startSynth()
    }
  }, [engine, startSynth])

  const pause = useCallback(() => {
    if (engine === 'file') audioRef.current?.pause()
    else if (engine === 'synth') {
      boxRef.current?.stop()
      setPlaying(false)
    }
  }, [engine])

  const toggle = useCallback(() => {
    if (playing) pause()
    else void play()
  }, [playing, play, pause])

  // First interaction anywhere starts the music once (if allowed).
  useEffect(() => {
    if (!engine || !settings.music.startOnFirstInteraction) return
    const handler = () => {
      if (triedAutoStart.current) return
      triedAutoStart.current = true
      void play()
    }
    // These are the events browsers accept as a user gesture for audio on
    // both desktop and touch (pointerdown from a finger is NOT one on Android).
    const events = ['click', 'touchend', 'keydown'] as const
    for (const ev of events) window.addEventListener(ev, handler, { passive: true })
    return () => {
      for (const ev of events) window.removeEventListener(ev, handler)
    }
  }, [engine, play])

  return { playing, available: engine !== null, engine, toggle }
}
