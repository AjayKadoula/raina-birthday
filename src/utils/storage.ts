const KEY = 'raina-birthday:v1'

export type StoredProgress = {
  /** Highest surprise index (1–7) that has been fully unlocked. */
  unlocked: number
  /** The stage id the visitor was last on, so a refresh resumes there. */
  stage: string
  introSeen: boolean
  secretSeen: boolean
}

export const defaultProgress: StoredProgress = {
  unlocked: 0,
  stage: 'intro',
  introSeen: false,
  secretSeen: false,
}

export function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress
    const parsed = JSON.parse(raw) as Partial<StoredProgress>
    return { ...defaultProgress, ...parsed }
  } catch {
    return defaultProgress
  }
}

export function saveProgress(p: StoredProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* private mode / quota — the experience still works for this session */
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
