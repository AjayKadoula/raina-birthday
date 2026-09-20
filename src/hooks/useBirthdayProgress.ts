import { useCallback, useEffect, useState } from 'react'
import { clearProgress, loadProgress, saveProgress, type StoredProgress } from '../utils/storage'

/**
 * Ordered stages of the experience. A stage id doubles as the resume point
 * after a refresh. Surprise N is "unlocked" once its stage completes.
 */
export const STAGES = [
  'intro',
  'quiz',
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  'end',
] as const

export type Stage = (typeof STAGES)[number]

export const TOTAL_SURPRISES = 7

export function useBirthdayProgress() {
  const [progress, setProgress] = useState<StoredProgress>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const stage = (STAGES.includes(progress.stage as Stage) ? progress.stage : 'intro') as Stage

  const goTo = useCallback((next: Stage) => {
    setProgress((p) => ({ ...p, stage: next, introSeen: p.introSeen || next !== 'intro' }))
  }, [])

  /** Mark surprise `n` (1–7) as unlocked and move on to the following stage. */
  const unlock = useCallback((n: number, next: Stage) => {
    setProgress((p) => ({ ...p, unlocked: Math.max(p.unlocked, n), stage: next }))
  }, [])

  const markSecretSeen = useCallback(() => setProgress((p) => ({ ...p, secretSeen: true })), [])

  const reset = useCallback(() => {
    clearProgress()
    setProgress(loadProgress())
  }, [])

  return { progress, stage, goTo, unlock, reset, markSecretSeen }
}
