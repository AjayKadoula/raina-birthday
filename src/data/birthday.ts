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
    bike: { src: '/assets/photos/memories/bike-collage.jpg', alt: 'Raina on the Royal Enfield, Ajay in a kurta', position: '50% 30%' },
    rajasthani: { src: '/assets/photos/memories/rajasthani-collage.jpg', alt: 'Traditional Rajasthani portraits', position: 'center' },
    heart: { src: '/assets/photos/memories/heart-celebration.jpg', alt: 'A celebration under a heart of roses', position: '50% 35%' },
    family: { src: '/assets/photos/memories/raina-family.jpg', alt: 'Raina with family', position: '50% 25%' },
    tilak: { src: '/assets/photos/memories/tilak-ceremony.jpg', alt: 'The tilak ceremony', position: '50% 40%' },
    retro: { src: '/assets/photos/memories/1980s.jpg', alt: 'Us, if it were the 1980s', position: 'center' },
    future: { src: '/assets/photos/memories/2060.jpg', alt: 'Us, in 2060', position: 'center' },
  },
  reactions: {
    smug: { src: '/assets/photos/reactions/raina-sunglasses.jpg', alt: 'Raina in sunglasses', position: 'center' },
    guilty: { src: '/assets/photos/reactions/raina-peek.jpg', alt: 'Raina peeking over a shoulder', position: 'center' },
    innocent: { src: '/assets/photos/reactions/raina-innocent.jpg', alt: 'Raina looking innocent', position: 'center' },
    evidence: { src: '/assets/photos/memories/1980s.jpg', alt: 'Exhibit A: the 1980s photoshoot', position: 'center' },
  },
  gift: { src: '/assets/photos/gifts/gift-01.svg', alt: 'The gift', position: 'center' },
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
      question: "What does Ajay pretend he doesn't care about?", // ✎
      options: ['Winning arguments', 'What you think of his outfit', 'The Royal Enfield', 'Getting the last piece'],
      answer: 1,
      hint: 'It involves a mirror and you.',
      wrongResponses: ['Incorrect. Do you even know me.', 'Wrong, but I admire the confidence.', 'That one I openly care about. Try again.'],
      rightResponse: 'Okay. That one stung a little.',
    },
    {
      question: 'Who is more dramatic?', // ✎
      options: ['Raina', 'Ajay', 'Both, equally', 'The question is offensive'],
      answer: 0,
      hint: 'The honest answer, please.',
      wrongResponses: ['Wrong. We both know. Try again.', 'Nice try. Again.', 'Picking "offensive" is, itself, dramatic.'],
      rightResponse: 'Thank you for your honesty. Verified.',
    },
    {
      question: 'What happens whenever we say "5 minutes"?', // ✎
      options: ['Five minutes', 'Twenty minutes', 'Forty-five minutes and a snack', 'We forget what we were doing'],
      answer: 2,
      hint: 'Be realistic.',
      wrongResponses: ['Optimistic. Wrong, but optimistic.', 'That has never once happened.', 'Close. Add a snack.'],
      rightResponse: 'Correct. Also, we should work on that.',
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
      subtitle: 'Neither of us knew where this was going.',
      memories: [
        { date: 'The first chapter', title: 'Where it started', photo: photos.hero.rain, caption: 'Neither of us knew where this was going.', note: 'I did. I just didn\'t say it.' }, // ✎
        { date: 'A little later', title: 'Getting used to each other', photo: photos.memories.bike, caption: 'Evidence that we actually leave the house.', note: 'The bike gets more attention than I do.' }, // ✎
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
        { date: 'A celebration', title: 'Under a heart of roses', photo: photos.memories.heart, caption: 'Somehow this became one of my favourite memories.', note: 'You said the decoration was too much. You were right. I\'d do it again.' }, // ✎
        { date: 'Home', title: 'The people who love you', photo: photos.memories.family, caption: 'Every good thing about you makes more sense after meeting them.' }, // ✎
        { date: 'The tilak', title: 'When it became official', photo: photos.memories.tilak, caption: 'I look calm. I was not calm.' }, // ✎
      ],
    },
    {
      title: 'Today',
      subtitle: 'And, apparently, 2060.',
      memories: [
        { date: 'Now', title: 'Us', photo: photos.hero.portrait, caption: 'Still here. Still choosing this.' }, // ✎
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
  subtitle: "I'm legally obligated to expose you.",
  questions: [
    { question: 'Who takes longer to get ready?', ifRaina: "Correct. The evidence is overwhelming.", ifAjay: "Incorrect. We all know the answer.", reaction: photos.reactions.smug }, // ✎
    { question: "Who says 'I'm not hungry' and then steals food?", ifRaina: "Thank you for admitting it. Growth.", ifAjay: "I'll allow this answer because it's your birthday.", reaction: photos.reactions.guilty }, // ✎
    { question: 'Who is more stubborn?', ifRaina: 'Finally. Some honesty.', ifAjay: 'Wrong, and I will not be discussing this further.', reaction: photos.reactions.innocent }, // ✎
    { question: 'Who starts arguments and then forgets why?', ifRaina: 'Correct. And then blames me. Iconic.', ifAjay: 'Objection. Overruled. Next.', reaction: photos.reactions.smug }, // ✎
    { question: 'Who is actually always right?', ifRaina: "...Fine. Yes. It's you. Happy birthday.", ifAjay: "Wow. I'll take it. (We both know it's you.)", reaction: photos.reactions.guilty }, // ✎
  ] satisfies RoastQuestion[],
  evidence: {
    label: 'Exhibit A',
    photo: photos.reactions.evidence,
    caption: 'We took ninety photos that day. Ninety. I rest my case.', // ✎  (swap in your funniest photo)
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
    { title: 'Our understanding.', body: "Half a look, and we both know. Nobody else gets it. Nobody else needs to.", photo: photos.memories.future }, // ✎
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
    image: photos.memories.heart,
    message: 'Wear the crown, Duggu. All day. Non-negotiable.', // ✎
  },
  {
    id: 'morning',
    unlockAt: '2026-09-21T12:30',
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
    description: "Six feet. Because a normal-sized one would not have been dramatic enough, and we've established who the dramatic one is.", // ✎
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

/* ── Surprise 7: the letter ───────────────────────────────────── */
export const finale = {
  lines: ['For the last surprise...', "This one isn't a gift.", "It's something I've wanted to tell you."],
  envelope: 'Open',
  closing: ['Happy Birthday, Raina.', 'You are one of my favourite parts of this life.'],
  lastButton: 'One last thing...',
  lastScreen: ["Here's to all the memories we've already made...", "...and all the ones we haven't lived yet.", 'Happy Birthday, Duggu ❤️', '— Ajay'],
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
