/**
 * Resolves a "/assets/..." path from the data files to the deployed URL.
 * On GitHub Pages the site lives under /raina-birthday/, so the Vite base
 * must be prefixed. Absolute http(s) URLs pass through untouched.
 */
export function asset(path: string | undefined): string {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}
