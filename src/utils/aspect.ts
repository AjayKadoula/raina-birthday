import type { Photo } from '../data/types'

/** Tailwind aspect class matching a photo's declared shape. */
export function aspectClass(photo: Photo, portrait = 'aspect-[4/5]'): string {
  switch (photo.aspect) {
    case 'landscape':
      return 'aspect-[4/3]'
    case 'square':
      return 'aspect-square'
    default:
      return portrait
  }
}
