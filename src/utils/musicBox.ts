/**
 * A tiny music-box rendition of "Happy Birthday" (the melody is public
 * domain) synthesised with Web Audio. Used as the background music when no
 * audio file is provided, so the site never depends on a licensed track.
 *
 * Sound: soft bell — sine fundamental with a faint 3rd harmonic, fast attack,
 * long decay — through a gentle feedback delay for a little room.
 */

type Note = [freq: number, beats: number]

const G4 = 392.0
const A4 = 440.0
const B4 = 493.88
const C5 = 523.25
const D5 = 587.33
const E5 = 659.25
const F5 = 698.46
const G5 = 783.99

// "Happy birthday to you / ... to you / ... dear Raina / ... to you"
const MELODY: Note[] = [
  [G4, 0.75], [G4, 0.25], [A4, 1], [G4, 1], [C5, 1], [B4, 2],
  [G4, 0.75], [G4, 0.25], [A4, 1], [G4, 1], [D5, 1], [C5, 2],
  [G4, 0.75], [G4, 0.25], [G5, 1], [E5, 1], [C5, 1], [B4, 1], [A4, 2],
  [F5, 0.75], [F5, 0.25], [E5, 1], [C5, 1], [D5, 1], [C5, 3],
]

// Soft accompanying chords (root + fifth, an octave below), one per bar.
const CHORDS: Array<[freqs: number[], beats: number]> = [
  [[G4 / 2, D5 / 4], 3], [[C5 / 4, G4 / 2], 3],
  [[G4 / 2, D5 / 4], 3], [[C5 / 4, G4 / 2], 3],
  [[C5 / 4, G4 / 2], 3], [[F5 / 4, C5 / 4], 3],
  [[G4 / 2, D5 / 4], 3], [[C5 / 4, G4 / 2], 4],
]

const BEAT = 0.62 // seconds per beat — unhurried
const PICKUP = 1 // the melody starts one beat before the first bar
const GAP = 4 // seconds of silence before the tune repeats

export class MusicBox {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private loopTimer = 0
  private _playing = false

  private volume: number

  constructor(volume: number) {
    this.volume = volume
  }

  get playing() {
    return this._playing
  }

  private ensure() {
    if (this.ctx) return this.ctx
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = this.volume

    // A little space: feedback delay mixed in quietly.
    const delay = ctx.createDelay(1)
    delay.delayTime.value = 0.28
    const feedback = ctx.createGain()
    feedback.gain.value = 0.28
    const wet = ctx.createGain()
    wet.gain.value = 0.22
    master.connect(ctx.destination)
    master.connect(delay)
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(wet)
    wet.connect(ctx.destination)

    this.ctx = ctx
    this.master = master
    return ctx
  }

  private bell(freq: number, at: number, dur: number, gain: number) {
    const ctx = this.ctx!
    const out = this.master!
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, at)
    env.gain.linearRampToValueAtTime(gain, at + 0.012)
    env.gain.exponentialRampToValueAtTime(0.0008, at + Math.max(dur, 0.9) + 0.9)
    env.connect(out)

    const o1 = ctx.createOscillator()
    o1.type = 'sine'
    o1.frequency.value = freq
    o1.connect(env)
    const o2 = ctx.createOscillator()
    o2.type = 'sine'
    o2.frequency.value = freq * 3
    const g2 = ctx.createGain()
    g2.gain.value = 0.08
    o2.connect(g2)
    g2.connect(env)

    const stop = at + Math.max(dur, 0.9) + 1
    o1.start(at)
    o2.start(at)
    o1.stop(stop)
    o2.stop(stop)
  }

  private pad(freqs: number[], at: number, dur: number) {
    const ctx = this.ctx!
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, at)
    env.gain.linearRampToValueAtTime(0.05, at + 0.4)
    env.gain.linearRampToValueAtTime(0.0001, at + dur)
    env.connect(this.master!)
    for (const f of freqs) {
      const o = ctx.createOscillator()
      o.type = 'triangle'
      o.frequency.value = f
      o.connect(env)
      o.start(at)
      o.stop(at + dur + 0.1)
    }
  }

  /** Schedules one full pass of the tune starting at `t0`; returns its length in seconds. */
  private schedulePass(t0: number): number {
    let t = t0
    for (const [freq, beats] of MELODY) {
      this.bell(freq, t, beats * BEAT, 0.5)
      t += beats * BEAT
    }
    let c = t0 + PICKUP * BEAT
    for (const [freqs, beats] of CHORDS) {
      this.pad(freqs, c, beats * BEAT)
      c += beats * BEAT
    }
    return t - t0
  }

  private loop() {
    if (!this._playing || !this.ctx) return
    const len = this.schedulePass(this.ctx.currentTime + 0.05)
    this.loopTimer = window.setTimeout(() => this.loop(), (len + GAP) * 1000)
  }

  async start() {
    const ctx = this.ensure()
    if (ctx.state === 'suspended') await ctx.resume()
    if (this._playing) return
    this._playing = true
    this.master!.gain.cancelScheduledValues(ctx.currentTime)
    this.master!.gain.setValueAtTime(0, ctx.currentTime)
    this.master!.gain.linearRampToValueAtTime(this.volume, ctx.currentTime + 1.2)
    this.loop()
  }

  stop() {
    if (!this._playing || !this.ctx) return
    this._playing = false
    window.clearTimeout(this.loopTimer)
    const now = this.ctx.currentTime
    this.master!.gain.cancelScheduledValues(now)
    this.master!.gain.setValueAtTime(this.master!.gain.value, now)
    this.master!.gain.linearRampToValueAtTime(0, now + 0.6)
    const ctx = this.ctx
    window.setTimeout(() => {
      if (!this._playing) void ctx.suspend()
    }, 700)
  }

  dispose() {
    this.stop()
    void this.ctx?.close()
    this.ctx = null
    this.master = null
  }
}
