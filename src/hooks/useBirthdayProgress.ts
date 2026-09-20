import { useCallback, useEffect, useState } from 'react'
import { clearProgress, loadProgress, saveProgress, type StoredProgress } from '../utils/storage'

/**
 * Ordered stages of the experience. A stage id doubles as the resume point
 * after a refresh. Surprise N is "unlocked" once its stage completes.
 */
export const STAGES = [
  'intro',
  'wish',
  'quiz',
  's1',
  's2',
  's3',
  's4',
  's5',
  'balloons',
  's6',
  's7',
  'end',
] as const

export type Stage = (typeof STAGES)[number]

export const TOTAL_SURPRISES = 7

export function useBirthdayProgress() {
  const [progress, setProgress] = useState<StoredProgress>(() => {
    // Older saves have no `furthest`; the stage they were on is at least that far.
    const p = loadProgress()
    return { ...p, furthest: Math.max(p.furthest, STAGES.indexOf(p.stage as Stage)) }
  })

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const stage = (STAGES.includes(progress.stage as Stage) ? progress.stage : 'intro') as Stage

  const goTo = useCallback((next: Stage) => {
    setProgress((p) => ({
      ...p,
      stage: next,
      introSeen: p.introSeen || next !== 'intro',
      furthest: Math.max(p.furthest, STAGES.indexOf(next)),
    }))
  }, [])

  /** Mark surprise `n` (1–7) as unlocked and move on to the following stage. */
  const unlock = useCallback((n: number, next: Stage) => {
    setProgress((p) => ({ ...p, unlocked: Math.max(p.unlocked, n), stage: next, furthest: Math.max(p.furthest, STAGES.indexOf(next)) }))
  }, [])

  const markSecretSeen = useCallback(() => setProgress((p) => ({ ...p, secretSeen: true })), [])

  const markGiftSeen = useCallback((id: string) => {
    setProgress((p) => (p.giftsSeen.includes(id) ? p : { ...p, giftsSeen: [...p.giftsSeen, id] }))
  }, [])

  const reset = useCallback(() => {
    clearProgress()
    setProgress(loadProgress())
  }, [])

  return { progress, stage, goTo, unlock, reset, markSecretSeen, markGiftSeen }
}
