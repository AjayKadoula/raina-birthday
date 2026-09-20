import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App'
import { settings } from './data/settings'

// Palette from settings → CSS variables, so Tailwind colours follow the config.
const root = document.documentElement
for (const [name, rgb] of Object.entries(settings.colors)) {
  root.style.setProperty(`--c-${name}`, rgb)
}
document.title = settings.pageTitle

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
