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
  Gift,
  MemoryPair,
  Photo,
  QuizQuestion,
  Reason,
  RoastQuestion,
} from './types'

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

/* ── Surprise 1: the password ─────────────────────────────────── */
export const quiz = {
  title: 'Before we begin...',
  subtitle: "Prove you're actually Raina.",
  questions: [
    {
      question: "What is Ajay's most annoying habit?", // ✎
      options: ['Saying "5 minutes"', 'Explaining things nobody asked about', 'Checking his phone mid-sentence', 'All of the above, obviously'],
      answer: 3,
      hint: 'Think bigger. Think... all of it.',
      wrongResponses: ['Wrong. Interesting. We need to discuss this relationship.', 'Bold of you to pick just one.'],
      rightResponse: 'Correct. I hate that you know this.',
    },
    {
      question: "What does Ajay pretend he doesn't care about?", // ✎
      options: ['Winning arguments', 'What you think of his outfit', 'The Royal Enfield', 'Getting the last piece'],
      answer: 1,
      hint: 'It involves a mirror and you.',
      wrongResponses: ['Incorrect. Do you even know me.', 'Wrong, but I admire the confidence.'],
      rightResponse: 'Okay. That one stung a little.',
    },
    {
      question: 'Who is more dramatic?', // ✎
      options: ['Raina', 'Ajay', 'Both, equally', 'The question is offensive'],
      answer: 0,
      hint: 'The honest answer, please.',
      wrongResponses: ['Wrong. We both know. Try again.', 'Nice try. Again.'],
      rightResponse: 'Thank you for your honesty. Verified.',
    },
    {
      question: 'What happens whenever we say "5 minutes"?', // ✎
      options: ['Five minutes', 'Twenty minutes', 'Forty-five minutes and a snack', 'We forget what we were doing'],
      answer: 2,
      hint: 'Be realistic.',
      wrongResponses: ['Optimistic. Wrong, but optimistic.', 'That has never once happened.'],
      rightResponse: 'Correct. Also, we should work on that.',
    },
  ] satisfies QuizQuestion[],
  verified: "Okay. She's verified.",
}

export const surprise1 = {
  eyebrow: 'Surprise #1',
  title: 'This is my favourite photo of us.', // ✎
  photo: photos.hero.portrait,
  message: // ✎
    "I looked through a lot of photos to pick this one. Not because it's the best photo — because it's the most us. Anyway. Welcome. There are six more of these.",
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
    { title: 'Your smile.', body: 'The real one. The one before you remember there\'s a camera.', photo: photos.hero.portrait }, // ✎
    { title: 'The way you somehow turn ordinary moments into memories.', body: 'A Tuesday with you is a story by Thursday.', photo: photos.memories.heart }, // ✎
    { title: 'Your completely unreasonable stubbornness.', body: 'Which, annoyingly, is also why we work.', photo: photos.memories.bike }, // ✎
    { title: 'The way you make life less boring.', body: 'I did not sign up for this much adventure. I\'m keeping it.', photo: photos.memories.retro }, // ✎
    { title: 'You.', body: 'Just — you.', photo: photos.hero.rain }, // ✎
  ] satisfies Reason[],
  twist: ['Actually...', 'That list is unfair.', "Because five isn't enough."],
  outro: ["Let's just say...", 'there are many.'],
  unlocked: 'Surprise #5 unlocked.',
}

/* ── Surprise 6: the gift ─────────────────────────────────────── */
export const gift: Gift = {
  title: 'Your gift', // ✎
  description: 'Something you can actually hold. It\'s waiting for you.', // ✎
  image: photos.gift, // ✎  replace gift-01.svg with a photo of the gift / destination
  message: 'Okay, so this part isn\'t digital. Come find me.', // ✎
  // link: { label: 'See where we\'re going', url: 'https://maps.google.com/?q=' }, // ✎ optional
  // code: 'RAINA-2111', // ✎ optional voucher / booking reference
  // qrImage: '/assets/photos/gifts/qr.png', // ✎ optional
}

export const giftScreen = {
  lines: ["You've made it this far.", 'One more thing...'],
  button: 'Open your gift',
  unlocked: 'Surprise #6 unlocked.',
  tease: 'You really thought that was the end?',
}

/* ── Surprise 7: the letter ───────────────────────────────────── */
export const finale = {
  lines: ['For the last surprise...', "This one isn't a gift.", "It's something I've wanted to tell you."],
  envelope: 'Open',
  closing: ['Happy Birthday, Raina.', 'You are one of my favourite parts of this life.'],
  lastButton: 'One last thing...',
  lastScreen: ["Here's to all the memories we've already made...", "...and all the ones we haven't lived yet.", 'Happy Birthday ❤️', '— Ajay'],
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
    { kind: 'countdown', title: 'Next adventure', date: '2026-12-25', body: 'No details. Keep the weekend free.' }, // ✎
    // { kind: 'audio', title: 'A voice note', src: '/assets/audio/note.mp3' },
    // { kind: 'video', title: 'Behind the scenes', src: '/assets/video/bts.mp4' },
  ],
}

/* ── Progress labels (shown in the tiny dots strip) ──────────── */
export const surpriseNames = ['Password', 'Our story', 'The roast', 'Memory lock', 'Reasons', 'The gift', 'The letter']
