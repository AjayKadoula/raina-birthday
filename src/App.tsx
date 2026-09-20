import { useEffect } from 'react'
import { settings } from './data/settings'
import { BirthdayExperience } from './pages/BirthdayExperience'

/**
 * Routing is deliberately tiny: there is one page. Both the site root and
 * /<secretPath> (or #/<secretPath>) open the experience; anything else is
 * normalised back to the root so shared links never 404 on GitHub Pages.
 */
export default function App() {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
    const path = window.location.pathname.replace(/\/$/, '')
    const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '')
    const isRoot = path === base || path === ''
    const isSecret = path === `${base}/${settings.secretPath}` || hash === settings.secretPath
    if (!isRoot && !isSecret) {
      window.history.replaceState(null, '', `${base}/${window.location.search}`)
    }
  }, [])

  return <BirthdayExperience />
}
