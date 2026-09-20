/**
 * ─────────────────────────────────────────────────────────────
 *  SETTINGS — names, date, music, colours, toggles.
 *  Edit freely. Nothing in here is secret (GitHub Pages is public).
 * ─────────────────────────────────────────────────────────────
 */

export const settings = {
  her: 'Raina',
  him: 'Ajay',

  /** The birthday. Local to the timezone below. */
  birthday: { year: 2026, month: 9, day: 21 },
  timezone: 'Asia/Kolkata',

  /**
   * If true, visitors see only the countdown until the birthday (IST).
   * While you are building, set it to false, or open the site with `?preview`
   * (e.g. https://ajaykadoula.github.io/raina-birthday/?preview) to skip the lock.
   */
  lockUntilBirthday: true,

  /** Browser tab title. */
  pageTitle: 'For Raina',

  music: {
    enabled: true,
    /** Put an .mp3 under public/assets/audio/ and reference it here. */
    src: '/assets/audio/theme.mp3',
    label: 'Music',
    volume: 0.35,
    /** Try to start on the first tap/click (browsers block true autoplay). */
    startOnFirstInteraction: true,
    /**
     * If the file above is missing, play a soft built-in music-box
     * "Happy Birthday" (public-domain melody, generated in the browser).
     */
    fallbackMelody: true,
  },

  /** Subtle ambient effects. Turn any off if the phone struggles. */
  effects: {
    particles: true,
    cursorGlow: true,
    confetti: true,
    paperTexture: true,
  },

  /**
   * Palette. Values are "R G B" so Tailwind can add alpha.
   * Warm ivory / deep wine / muted gold / charcoal / soft rose.
   */
  colors: {
    ivory: '245 238 226',
    cream: '235 224 205',
    wine: '96 30 42',
    burgundy: '66 19 29',
    gold: '201 169 110',
    charcoal: '30 25 24',
    ink: '20 16 15',
    rose: '196 122 130',
  },

  /** Optional. Opening the site at /raina (or #/raina) works too; everything else redirects to the main experience. */
  secretPath: 'raina',

  /** Shown in the tiny "made by" footer line. */
  footer: 'Made with an unreasonable amount of time by Ajay.',
} as const

export type Settings = typeof settings
