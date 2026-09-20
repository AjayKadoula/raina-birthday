/**
 * ─────────────────────────────────────────────────────────────
 *  BIRTHDAY CONTENT — everything Raina reads, in one place.
 *
 *  Photos live under public/assets/photos/... and are referenced by path.
 *  Save your photos with the filenames used below (or change the paths).
 *  Use `position` to keep faces in frame when an image is cropped.
 *
 *  Look for  ✎  — those are the lines most worth personalising.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  Chapter,
  EasterEgg,
  GiftItem,
  MemoryPair,
  Photo,
  QuizQuestion,
  Reason,
  RoastQuestion,
} from './types'
import { formatBirthday } from '../utils/date'

/* ── Photo registry ─────────────────────────────────────────────
 * Naming the photos once here keeps the rest of the file readable.
 * Add as many as you like; unused ones are simply ignored.
 */
export const photos = {
  hero: {
    portrait: { src: '/assets/photos/hero/hero-portrait.jpg', alt: 'Raina and Ajay, studio portrait', position: '50% 20%' },
    rain: { src: '/assets/photos/hero/rain.jpg', alt: 'Raina peeking over Ajay\'s shoulder by a rainy window', position: '50% 30%' },
  },
  memories: {
    bike: { src: '/assets/photos/memories/bike-collage.jpg', alt: 'Raina on the Royal Enfield, Ajay in a kurta', position: '50% 30%', aspect: 'square' },
    rajasthani: { src: '/assets/photos/memories/rajasthani-collage.jpg', alt: 'Traditional Rajasthani portraits', position: 'center', aspect: 'square' },
    heart: { src: '/assets/photos/memories/heart-celebration.jpg', alt: 'A celebration under a heart of roses', position: '50% 35%' },
    family: { src: '/assets/photos/memories/raina-family.jpg', alt: 'Raina with family', position: '50% 25%' },
    tilak: { src: '/assets/photos/memories/tilak-ceremony.jpg', alt: 'The tilak ceremony', position: '50% 40%', aspect: 'landscape' },
    retro: { src: '/assets/photos/memories/1980s.jpg', alt: 'Us, if it were the 1980s', position: 'center', aspect: 'square' },
    future: { src: '/assets/photos/memories/2060.jpg', alt: 'Us, in 2060', position: 'center', aspect: 'square' },
    futurePortrait: { src: '/assets/photos/memories/2060-portrait.jpg', alt: 'Us, in 2060', position: '50% 30%' },
  },
  reactions: {
    smug: { src: '/assets/photos/reactions/raina-sunglasses.jpg', alt: 'Raina in sunglasses', position: 'center' },
    guilty: { src: '/assets/photos/reactions/raina-peek.jpg', alt: 'Raina peeking over a shoulder', position: 'center' },
    innocent: { src: '/assets/photos/reactions/raina-innocent.jpg', alt: 'Raina looking innocent', position: 'center' },
    evidence: { src: '/assets/photos/memories/1980s.jpg', alt: 'Exhibit A: the 1980s photoshoot', position: 'center' },
  },
} satisfies Record<string, Photo | Record<string, Photo>>

/* ── Screen 0: the hook ───────────────────────────────────────── */
export const intro = {
  lines: ['Hey Raina...', 'I made you something.', "But there's one rule."],
  rule: "You're only allowed to unlock one surprise at a time.",
  button: "Okay, let's see what you've done →",
  footnote: 'Yes, I spent an unreasonable amount of time on this.',
}

/* ── The birthday wish (before any surprise) ─────────────────── */
export const wish = {
  eyebrow: formatBirthday(),
  headline: 'Happy Birthday, Raina.',
  sub: "Officially one year more amazing. Also one year more stubborn. Both are true.", // ✎
  candleHint: 'Tap the candles. Make a wish.',
  afterBlow: ['Okay. Wish made.', "If it was about me — understandable."], // ✎
  /** Handwritten note under the cake. Each string is a line. */
  note: [ // ✎
    "I didn't buy a card.",
    "A card can't do what this does.",
    "(Also I forgot. Kidding. Mostly.)",
    "Happy birthday, Duggu.",
  ],
  button: 'Now, the rules →',
}

/* ── Surprise 1: the password ─────────────────────────────────── */
export const quiz = {
  title: 'Before we begin...',
  subtitle: "Prove you're actually Raina.",
  blurb: "This website contains sensitive material (my feelings). Identity check required.", // ✎
  notHer: "Not Raina? Then this isn't for you. Close the tab. (Send it to her first.)",
  questions: [
    {
      question: "What is Ajay's most annoying habit?", // ✎
      options: ['Saying "5 minutes"', 'Explaining things nobody asked about', 'Checking his phone mid-sentence', 'All of the above, obviously'],
      answer: 3,
      hint: 'Think bigger. Think... all of it.',
      wrongResponses: ['Wrong. Interesting. We need to discuss this relationship.', 'Bold of you to pick just one.', 'Generous. Wrong, but generous.'],
      rightResponse: 'Correct. I hate that you know this.',
    },
    {
      question: "What does Ajay call you when nobody's listening?", // ✎
      options: ['Madam', 'Boss', 'Duggu', 'Raina, formally'],
      answer: 2,
      hint: 'Two syllables. You pretend to mind.',
      wrongResponses: ['Only when I am in trouble.', 'Accurate, but not what I call you.', 'I have never once called you that.'],
      rightResponse: 'Correct, Duggu.',
    },
    {
      question: 'Which three words of mine do you like most?', // ✎
      options: ["I'm not hungry", 'Five more minutes', 'Main sambhal lunga', 'You were right'],
      answer: 2,
      hint: "The ones I say when you're worried.",
      wrongResponses: ['Those are three words I say. Not the ones you like.', "I have said that exactly once. Under protest.", 'Wrong. Think about the last time you were stressed.'],
      rightResponse: 'Correct. And I mean it every time.',
    },
    {
      question: 'What happens whenever we say "5 minutes"?', // ✎
      options: ['Five minutes', 'Twenty minutes', 'Forty-five minutes and a snack', 'We forget what we were doing'],
      answer: 2,
      hint: 'Be realistic.',
      wrongResponses: ['Optimistic. Wrong, but optimistic.', 'That has never once happened.', 'Close. Add a snack.'],
      rightResponse: 'Correct. Also, we should work on that.',
    },
    {
      question: 'What is this relationship actually built on?', // ✎
      options: ['Money', 'Looking attractive', 'Winning arguments', 'Loyalty, honesty, transparency, respect, understanding'],
      answer: 3,
      hint: 'The serious one. You know it.',
      wrongResponses: ['Have you seen my bank balance. No.', 'Flattering. Also wrong.', 'Tempting. Wrong. (I would have won that argument, though.)'],
      rightResponse: 'Correct. All five. Every day.',
    },
  ] satisfies QuizQuestion[],
  verified: "Okay. She's verified. Hi, Duggu.",
  verifiedSub: 'Confidence: 100%. Sass level: also 100%.',
}

export const surprise1 = {
  eyebrow: 'Surprise #1',
  title: 'This is my favourite photo of us.', // ✎
  photo: photos.hero.portrait,
  message: // ✎
    "I looked through 400 photos to pick this one. Not because it's the best — because it's the most us. Anyway. Welcome. There are six more of these, and yes, I'm aware I have a problem.",
  unlocked: 'Surprise #1 unlocked.',
  next: 'Open Surprise #2',
}

/* ── Surprise 2: our story ────────────────────────────────────── */
export const story = {
  title: 'Our story',
  subtitle: 'A short film, badly edited by me.',
  chapters: [
    {
      title: 'The beginning',
      subtitle: 'It started with a follow request.',
      memories: [
        { date: '8 April 2026', title: 'One Instagram request', photo: photos.hero.rain, caption: 'Neither of us knew where this was going.', note: "I did. I just didn't say it." }, // ✎
        { date: 'The weeks after', title: 'Getting used to each other', photo: photos.memories.bike, caption: 'Evidence that we actually leave the house.', note: 'The bike gets more attention than I do.' }, // ✎
      ],
    },
    {
      title: 'The chaos',
      subtitle: 'Peak nonsense.',
      memories: [
        { date: 'Some weekend', title: 'The photoshoot that got out of hand', photo: photos.memories.retro, caption: 'Same people. Different era. Same nonsense.', note: 'You wanted one photo. We took ninety.' }, // ✎
        { date: 'A festival', title: 'Full Rajasthani mode', photo: photos.memories.rajasthani, caption: 'Peak nonsense. Peak elegance. Somehow both.' }, // ✎
      ],
    },
    {
      title: 'The memories',
      subtitle: 'The ones I secretly loved.',
      memories: [
        { date: '1 June 2026', title: 'The day I called your mama', photo: photos.memories.family, caption: 'Before anything else, I wanted your people to know me. Every good thing about you makes more sense after meeting them.', note: 'Scariest phone call of my life. Worth it.' }, // ✎
        { date: '26 July 2026', title: 'Official.', photo: photos.memories.tilak, caption: 'I look calm. I was not calm.' }, // ✎
        { date: 'A celebration', title: 'Under a heart of roses', photo: photos.memories.heart, caption: 'Somehow this became one of my favourite memories.', note: "You said the decoration was too much. You were right. I'd do it again." }, // ✎
      ],
    },
    {
      title: 'Today',
      subtitle: 'And, apparently, 2060.',
      memories: [
        { date: '21 September 2026', title: 'Your first birthday with me', photo: photos.hero.portrait, caption: 'Still here. Still choosing this.', note: 'First of many. I checked.' }, // ✎
        { date: '2060', title: 'Same people, bigger dreams', photo: photos.memories.future, caption: 'I ran the numbers. We look great.', note: 'Same team. Always.' }, // ✎
      ],
    },
  ] satisfies Chapter[],
  outro: ['Okay...', 'that was cute.', "But I wasn't done."],
  unlocked: 'Surprise #2 unlocked.',
}

/* ── Surprise 3: the roast ────────────────────────────────────── */
export const roast = {
  title: "Since it's your birthday...",
  subtitle: 'a short trial. Raina vs Ajay.',
  intro: "Vote honestly. I've already lost most of these.", // ✎
  questions: [
    { question: "Who says 'I'm not hungry' and then eats half of the other person's plate?", ifRaina: 'Thank you for admitting it. Growth.', ifAjay: "I'll allow this because it's your birthday. (It's you.)", reaction: photos.reactions.guilty }, // ✎
    { question: "Who says 'five minutes' and means forty-five?", ifRaina: 'Bold, coming from— no. No, that one is me.', ifAjay: "Correct. I'm on my way. Five minutes.", reaction: photos.reactions.smug }, // ✎
    { question: 'Who is more stubborn?', ifRaina: "Wrong. It's me. I will argue this point for hours, which proves it.", ifAjay: "Correct. I'm working on it. (I'm not.)", reaction: photos.reactions.innocent }, // ✎
    { question: 'Who apologises first?', ifRaina: "Correct. Every time. And I'm sorry about that. (See? I can too.)", ifAjay: 'Generous. Wrong. You always go first, and I always let you. Working on it.', reaction: photos.reactions.innocent }, // ✎
    { question: 'Who starts arguments and then forgets why?', ifRaina: "Generous. Wrong. It's me, and I've already forgotten what this question was.", ifAjay: 'Correct. What were we talking about?', reaction: photos.reactions.smug }, // ✎
    { question: 'Who is the better cook?', ifRaina: "Sweet of you. Wrong. It's me, and dinner is on me, apparently forever.", ifAjay: "Correct. I'll keep cooking if you keep acting surprised.", reaction: photos.reactions.guilty }, // ✎
    { question: 'Who is actually always right?', ifRaina: "I'll allow this because it's your birthday. (It's me. Historically.)", ifAjay: 'Correct. Finally, some recognition. Screenshot this.', reaction: photos.reactions.smug }, // ✎
  ] satisfies RoastQuestion[],
  evidence: {
    label: 'Exhibit A',
    photo: photos.reactions.evidence,
    caption: 'We took ninety photos that day. Ninety. Neither of us is innocent.', // ✎  (swap in your funniest photo)
  },
  outro: ['Okay, okay.', 'I promise I have something sweet too.'],
  unlocked: 'Surprise #3 unlocked.',
}

/* ── Surprise 4: the memory lock ──────────────────────────────── */
export const memoryGame = {
  title: 'The memory lock',
  subtitle: 'Match the pairs. No pressure. (Some pressure.)',
  /** 4 pairs → 8 cards. Keep it to 3–5 pairs on a phone. */
  pairs: [
    { id: 'rain', photo: photos.hero.rain, label: 'The rain' },
    { id: 'bike', photo: photos.memories.bike, label: 'The bike' },
    { id: 'retro', photo: photos.memories.retro, label: 'The 80s' },
    { id: 'heart', photo: photos.memories.heart, label: 'The roses' },
  ] satisfies MemoryPair[],
  solved: 'You remembered.',
  reveal: {
    photo: photos.memories.future, // ✎  or a video: { video: '/assets/video/secret.mp4' }
    video: undefined as string | undefined,
    title: 'The one I keep coming back to.', // ✎
    message: // ✎
      "I don't know what 2060 looks like. I just know who I want sitting next to me in it. That's the whole plan. That's the only part I've figured out.",
  },
  unlocked: 'Surprise #4 unlocked.',
}

/* ── Surprise 5: five reasons ─────────────────────────────────── */
export const reasons = {
  title: '5 things I love about you...',
  items: [
    { title: 'Your eyes.', body: 'I lose whole conversations in them. I have stopped apologising for this.', photo: photos.hero.rain }, // ✎
    { title: 'Your giving nature.', body: "You give before anyone asks. Then you act like it was nothing.", photo: photos.memories.heart }, // ✎
    { title: 'The way you care for your people.', body: 'Watching you with them told me everything I needed to know.', photo: photos.memories.family }, // ✎
    { title: 'Our understanding.', body: 'I give, you return it tenfold. You give, I return it tenfold. In your low, I am there. In my low, you are there.', photo: photos.memories.futurePortrait }, // ✎
    { title: 'Whole you.', body: 'Not the highlights. All of it.', photo: photos.hero.portrait }, // ✎
  ] satisfies Reason[],
  twist: ['Actually...', 'That list is unfair.', "Because five isn't enough."],
  outro: ["Let's just say...", 'there are many.'],
  unlocked: 'Surprise #5 unlocked.',
}

/* ── Surprise 6: the gifts ────────────────────────────────────── */
/**
 * The gift box opens into a calendar. Each gift unlocks on its own at
 * `unlockAt` (IST). Until then she sees only `when` + `teaser`.
 * `?preview` on the URL unlocks everything so you can check the copy.
 */
export const gifts: GiftItem[] = [
  {
    id: 'midnight',
    unlockAt: '2026-09-21T00:00',
    when: 'Monday · midnight',
    teaser: 'It starts at midnight.',
    title: 'The midnight delivery', // ✎
    description: 'A cake like the one from that night. Twenty roses. A spark gun (with refills — I know you). Balloons that light up. A crown. A "Birthday Girl" sash.', // ✎
    image: { ...photos.memories.heart, position: '50% 60%' },
    message: 'Wear the crown, Duggu. All day. Non-negotiable.', // ✎
  },
  {
    id: 'morning',
    unlockAt: '2026-09-21T14:00',
    when: 'Monday · morning',
    teaser: "Don't sleep in. That's all I'm saying.",
    title: 'Phoolon ki barish', // ✎
    description: 'The room this morning. The petals. The people who showed up. Yes — all of it was planned. My sister had one job, and it was two kilos of flowers.', // ✎
    message: 'You were outnumbered. On purpose.', // ✎
  },
  {
    id: 'teddy',
    unlockAt: '2026-09-21T17:00',
    when: 'Monday · afternoon',
    teaser: "Something else arrives today. It's six feet tall.",
    title: 'The bear', // ✎
    description: "Six feet. Arriving today, if Amazon keeps its word. A normal-sized one would not have been enough. Nothing about you is normal-sized. That's a compliment.", // ✎
    image: { src: '/assets/photos/gifts/teddy.jpg', alt: 'A six-foot teddy bear', position: 'center' },
    message: "Name him. I'll pretend to like the name.", // ✎
  },
  {
    id: 'wednesday',
    unlockAt: '2026-09-23T00:00',
    when: 'Wednesday',
    teaser: 'Two small things. One of them glows.',
    title: 'The card, and a rose that never dies', // ✎
    description: 'A handmade card with our photos in it — the ones that did not fit on this website. And a galaxy rose in a glass dome, because a real one would have given up by Friday.', // ✎
    image: { src: '/assets/photos/gifts/galaxy-rose.jpg', alt: 'A galaxy rose in a glass dome', position: 'center' },
    message: 'Read the card slowly. I did not write it quickly.', // ✎
  },
  {
    id: 'thursday',
    unlockAt: '2026-09-24T00:00',
    when: 'Thursday',
    teaser: 'The last box. Probably.',
    title: 'The hamper', // ✎
    description: 'One box, many small things. Something to wear, something to hold, something to keep.', // ✎
    image: { src: '/assets/photos/gifts/hamper.jpg', alt: 'A birthday hamper', position: 'center' },
    message: "Okay. Now I'm done. (For this week.)", // ✎
  },
]

export const giftScreen = {
  lines: ["You've made it this far.", 'One more thing...'],
  button: 'Open your gift',
  calendarTitle: 'This week',
  calendarNote: 'New gifts unlock on their own. Come back.',
  unlocked: 'Surprise #6 unlocked.',
  tease: 'You really thought that was the end?',
}

/* ── Her words (shown inside Surprise #7, before the envelope) ── */
export const promises = {
  eyebrow: 'Your words',
  title: 'You told me once what you wanted.',
  /** Quoted as she wrote it. Keep her voice. */
  quote: [ // ✎
    'Mujhe aap aise chahiye ho jo meri care kare, mujhe mujhse zyada samjhe, mujhe pyaar kare bahut saara, mere parivaar ko samjho, sambhalo.',
    'Ki meri muskaan ke peeche ka dard bina kahe samajh jao. Life ke har situation, har mod pe, chahe kuch bhi ho — hum saath ho, aur haste haste sab theek ho jaaye.',
    'Hum hain, hum hi rahenge. Aakhiri saans tak.',
  ],
  listTitle: 'What you asked for',
  /** Each thing she asked for, and where it stands. */
  items: [ // ✎
    { ask: 'Someone who cares for you', status: 'Done. Every day. Loudly.' },
    { ask: 'Someone who understands you more than you understand yourself', status: 'Working on it. Daily. Getting scarily good.' },
    { ask: 'Someone who loves you bahut saara', status: 'Understatement.' },
    { ask: 'Someone who understands and looks after your family', status: '1 June. I called your mama before anything else. You know the rest.' },
    { ask: 'Someone who sees the pain behind your smile without you saying a word', status: "I'm watching. Always. You can't hide it from me." },
    { ask: 'In every situation — together, and haste haste sab theek', status: 'Deal. Signed. Non-negotiable.' },
  ],
  /** Your side of it, under the list. */
  vow: [ // ✎
    'You said you would stay till the last breath. I have read that more times than I will admit.',
    'So here is my side of it: you give, I return it tenfold. I give, you return it tenfold. In your low, I am there. In my low, you are there.',
  ],
  closing: 'Hum hain. Hum hi rahenge.',
  /** The three words she likes most from you. Shown last, handwritten. */
  lastWord: 'Aur baaki sab? Main sambhal lunga.', // ✎
  button: 'Now, the letter →',
}

/* ── Surprise 7: the letter ───────────────────────────────────── */
export const finale = {
  lines: ['For the last surprise...', "This one isn't a gift.", "It's something I've wanted to tell you."],
  envelope: 'Open',
  closing: ['Happy Birthday, Raina.', 'You are one of my favourite parts of this life.'],
  lastButton: 'One last thing...',
  lastScreen: ["Here's to all the memories we've already made...", "...and all the ones we haven't lived yet.", 'Happy Birthday, Duggu ❤️', '— Ajay Kadoula'],
  unlocked: 'Surprise #7 unlocked.',
}

/* ── Easter egg (not one of the seven) ────────────────────────── */
export const easterEgg: EasterEgg = {
  enabled: true, // ✎ set false to hide entirely
  title: 'You found the secret.',
  intro: 'Things I almost put on this website.',
  items: [
    { kind: 'text', title: 'Draft #1 of the letter', body: 'It was four pages. I cut it down. You\'re welcome.' }, // ✎
    { kind: 'photo', title: "The one that didn't make it", src: '/assets/photos/memories/tilak-ceremony.jpg', body: "Look at Papa's face. Look at it." }, // ✎
    // { kind: 'countdown', title: 'Next adventure', date: '2026-12-25', body: 'No details. Keep the weekend free.' }, // ✎ only if you actually plan one
    // { kind: 'audio', title: 'A voice note', src: '/assets/audio/note.mp3' },
    // { kind: 'video', title: 'Behind the scenes', src: '/assets/video/bts.mp4' },
  ],
}

/* ── Progress labels (shown in the tiny dots strip) ──────────── */
export const surpriseNames = ['Password', 'Our story', 'The roast', 'Memory lock', 'Reasons', 'The gift', 'The letter']
