import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
// so production assets must be prefixed with the repository name.
// Locally (`npm run dev`) the app is served from `/`.
const REPO_NAME = 'raina-birthday'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
  plugins: [
    react(),
    {
      // GitHub Pages has no SPA rewrite; serving index.html as 404.html makes
      // deep links like /raina-birthday/raina open the experience too.
      name: 'spa-404-fallback',
      closeBundle() {
        try {
          copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'))
        } catch {
          /* dist not produced (e.g. dev) */
        }
      },
    },
  ],
  build: {
    target: 'es2020',
    sourcemap: false,
  },
}))
