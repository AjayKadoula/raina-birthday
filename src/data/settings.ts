/**
 * ─────────────────────────────────────────────────────────────
 *  SETTINGS — names, date, music, colours, toggles.
 *  Edit freely. Nothing in here is secret (GitHub Pages is public).
 * ─────────────────────────────────────────────────────────────
 */

export const settings = {
  her: 'Raina',
  /** What Ajay actually calls her. Used sparingly, where it lands. */
  herPet: 'Duggu',
  him: 'Ajay',
  /** Used where a signature belongs: the letter, the last screen, the footer. */
  himFull: 'Ajay Kadoula',

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
    /** Put an .mp3 under public/assets/audio/ and reference it here. Empty = use the built-in melody. */
    src: '',
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

  gifts: {
    /**
     * false → locked gifts are completely hidden (only "N more are still
     * sealed"). true → locked rows show their day, teaser and unlock time.
     */
    showLockedTeasers: false,
    /** true → locked gifts still show WHEN they open (date + time, IST), nothing else. */
    showLockedTimes: true,
  },

  /**
   * Floating balloons she can pop (wish screen, gifts, the end). Each pop plays
   * a voice clip from `voices` if any exist; otherwise the phone's own voice
   * says the next phrase. Record the clips — her hearing YOU is the point.
   */
  balloons: {
    enabled: true,
    count: 7,
    /** `text` floats up on screen; `say` is what the voice reads (Hindi script so डुग्गू is pronounced right). */
    phrases: [ // ✎
      { text: 'Love you', say: 'लव यू' },
      { text: 'Dugguu', say: 'डुग्गू' },
      { text: 'Love you, Dugguu', say: 'लव यू डुग्गू' },
      { text: 'Happy birthday, Duggu', say: 'हैप्पी बर्थडे डुग्गू' },
    ],
    /** e.g. ['/assets/audio/voice/love-you.mp3', '/assets/audio/voice/dugguu.mp3'] */
    voices: [] as string[], // ✎
    speakFallback: true,
    /** Spoken-voice character: pitch 2.0 = small child, 1.0 = adult; rate 1.0 = normal. */
    voice: { pitch: 1.9, rate: 1.05, preferFemale: true }, // ✎
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
  footer: 'Made with an unreasonable amount of time by Ajay Kadoula.',
} as const

export type Settings = typeof settings
