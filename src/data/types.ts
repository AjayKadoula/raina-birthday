/**
 * Shared types for the editable content files.
 * You should not need to touch this file — edit birthday.ts / letter.ts / settings.ts.
 */

export type Photo = {
  /** Path under /public. Example: "/assets/photos/memories/photo-01.jpg" */
  src: string
  alt?: string
  /**
   * Where to anchor the image when it has to be cropped. Use this to keep faces in frame.
   * Examples: "center", "top", "50% 30%", "left center".
   */
  position?: string
}

export type QuizQuestion = {
  question: string
  options: string[]
  /** Index (0-based) of the correct option in `options`. */
  answer: number
  /** Shown after the first wrong attempt. */
  hint?: string
  /** Rotated through on wrong answers. */
  wrongResponses?: string[]
  /** Shown when she gets it right. */
  rightResponse?: string
}

export type Memory = {
  date: string
  title: string
  photo: Photo
  caption: string
  /** Optional small italic line under the caption. */
  note?: string
}

export type Chapter = {
  title: string
  subtitle?: string
  memories: Memory[]
}

export type RoastQuestion = {
  question: string
  /** Response shown when she votes for herself / for you. */
  ifRaina: string
  ifAjay: string
  /** Optional reaction photo shown with the response. */
  reaction?: Photo
}

export type MemoryPair = {
  id: string
  photo: Photo
  label: string
}

export type Reason = {
  title: string
  body?: string
  photo: Photo
}

export type Gift = {
  title: string
  description: string
  /** Optional large image of the gift / destination / reservation. */
  image?: Photo
  /** Longer personal message shown under the reveal. */
  message?: string
  /** Optional external link (shop, booking, map). */
  link?: { label: string; url: string }
  /** Optional voucher / booking / redeem code shown in a copyable chip. */
  code?: string
  /** Optional QR image (put a PNG under /assets/photos/gifts/). */
  qrImage?: string
}

export type GiftItem = {
  id: string
  /** When this gift unlocks, in IST: "YYYY-MM-DDTHH:mm". */
  unlockAt: string
  /** Short label for the calendar row, e.g. "Monday · midnight". */
  when: string
  /** One line shown while locked. Keep it teasing, not revealing. */
  teaser: string
  title: string
  description: string
  image?: Photo
  /** Handwritten line under the reveal. */
  message?: string
  link?: { label: string; url: string }
  code?: string
}

export type EasterEgg = {
  enabled: boolean
  title: string
  intro: string
  items: Array<{
    kind: 'photo' | 'text' | 'audio' | 'video' | 'countdown'
    title: string
    body?: string
    src?: string
    /** For kind = "countdown": ISO date, e.g. "2026-12-25". */
    date?: string
  }>
}
