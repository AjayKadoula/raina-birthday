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
    /** Balloons on screen at once, and how many she must pop to open the gift box. */
    count: 8,
    goal: 12,
    /** `text` floats up on screen; `say` is what the voice reads (Hindi script so डुग्गू is pronounced right). */
    phrases: [ // ✎  one per balloon, in rotation — `text` shows, `say` is spoken (Hindi script = right pronunciation)
      { text: 'Love you', say: 'लव यू' },
      { text: 'Dugguu', say: 'डुग्गू' },
      { text: "You're mine", say: 'यू आर माइन' },
      { text: 'Jaan', say: 'जान' },
      { text: 'Kuchhu Puchhu', say: 'कुच्छू पुच्छू' },
      { text: 'Baby', say: 'बेबी' },
      { text: 'Meri jaan', say: 'मेरी जान' },
      { text: 'Main sambhal lunga', say: 'मैं संभाल लूंगा' },
      { text: 'Hum hain, hum hi rahenge', say: 'हम हैं, हम ही रहेंगे' },
      { text: 'Meri Duggu', say: 'मेरी डुग्गू' },
      { text: 'Cutie', say: 'क्यूटी' },
      { text: 'Pagal', say: 'पागल' },
      { text: 'Sundar', say: 'सुंदर' },
      { text: 'Your eyes', say: 'योर आइज़' },
      { text: 'Tenfold', say: 'टेनफोल्ड' },
      { text: 'Same team', say: 'सेम टीम' },
      { text: 'Always', say: 'ऑलवेज़' },
      { text: 'My espresso', say: 'माय एस्प्रेसो' },
      { text: 'Haste haste', say: 'हंसते हंसते' },
      { text: 'Mine. Only mine.', say: 'माइन, ओनली माइन' },
      { text: 'Happy birthday, Duggu', say: 'हैप्पी बर्थडे डुग्गू' },
      { text: 'Best decision', say: 'बेस्ट डिसिज़न' },
      { text: 'Aakhiri saans tak', say: 'आख़िरी सांस तक' },
      { text: 'Mera dil', say: 'मेरा दिल' },
      { text: 'Beautiful', say: 'ब्यूटीफुल' },
      { text: '8 April', say: 'आठ अप्रैल' },
      { text: '1 June', say: 'एक जून' },
      { text: '26 July', say: 'छब्बीस जुलाई' },
      { text: '21 September', say: 'इक्कीस सितंबर' },
      { text: 'Chai?', say: 'चाय?' },
      { text: 'Five minutes', say: 'फ़ाइव मिनट्स' },
      { text: "I'm not hungry", say: 'आइम नॉट हंग्री' },
      { text: 'Meri jaan bhi aapki', say: 'मेरी जान भी आपकी' },
      { text: 'Muskaan', say: 'मुस्कान' },
      { text: 'Bahut saara pyaar', say: 'बहुत सारा प्यार' },
      { text: 'Forever', say: 'फ़ॉरएवर' },
      { text: 'Yours', say: 'योर्स' },
      { text: 'Team us', say: 'टीम अस' },
      { text: '2060', say: 'ट्वेंटी सिक्सटी' },
      { text: 'Zindagi', say: 'ज़िंदगी' },
      { text: 'Dil se', say: 'दिल से' },
      { text: 'Sath', say: 'साथ' },
      { text: 'Hamesha', say: 'हमेशा' },
      { text: 'Duggu ❤', say: 'डुग्गू' },
      { text: 'Love you, Dugguu', say: 'लव यू डुग्गू' },
      { text: 'Better cook: me', say: 'बेटर कुक: मी' },
      { text: 'Sorry first: you', say: 'सॉरी फ़र्स्ट: यू' },
      { text: 'Chalo, long drive', say: 'चलो, लॉन्ग ड्राइव' },
      { text: 'Baarish', say: 'बारिश' },
      { text: 'Sunrise, mountains', say: 'सनराइज़, माउंटेन्स' },
    ],
    /**
     * Each phrase has a generated clip at /assets/audio/voice/<slug>.mp3
     * (slug = the `text`, lower-case, non-letters → '-'). Re-run the generator
     * after adding phrases, or drop in your own recording under the same name.
     */
    voiceClips: true,
    /** If a clip is missing, let the phone's own voice say it. */
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
