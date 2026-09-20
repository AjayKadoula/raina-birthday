# For Raina

A private, interactive birthday experience — seven surprises unlocked one at a
time, built by Ajay. Static site (React + TypeScript + Vite + Tailwind +
Framer Motion), deployed to GitHub Pages. No backend, no accounts, no keys.

**Live:** https://ajaykadoula.github.io/raina-birthday/ (also `/raina`)

> GitHub Pages is public. Nothing genuinely confidential belongs in this repo —
> no addresses, booking references you'd mind a stranger seeing, etc.

## Edit the content (no React required)

| File | What lives there |
| --- | --- |
| `src/data/settings.ts` | Names, the date, timezone, music, colours, effect toggles, the birthday lock |
| `src/data/birthday.ts` | Every word she reads: intro, quiz, story timeline, roast, memory game, reasons, gift, finale, easter egg. Photo paths too. |
| `src/data/letter.ts` | Surprise #7 — the letter. Replace every `✎` placeholder. |

Search for `✎` in `birthday.ts` and `letter.ts` — those are the lines to personalise.

## Photos

Drop files here and reference them from `birthday.ts`:

```
public/assets/photos/
  hero/        big single portraits (surprise #1, reasons)
  memories/    the timeline + memory game
  reactions/   the roast's reaction cards + "Exhibit A"
  gifts/       the gift photo / QR
public/assets/audio/theme.mp3   optional background music (without it, a built-in
                                music-box "Happy Birthday" plays — public-domain melody,
                                generated in the browser; settings.music.fallbackMelody)
public/assets/video/            optional video for the memory-lock reveal / easter egg
```

The config currently expects these filenames (save your photos under them, or edit the paths):

```
hero/hero-portrait.jpg           studio portrait ("Good People Build Great Things")
hero/rain.jpg                    the rainy-window close-up
memories/bike-collage.jpg        Royal Enfield / kurta collage
memories/rajasthani-collage.jpg
memories/heart-celebration.jpg   under the heart of roses
memories/raina-family.jpg
memories/tilak-ceremony.jpg
memories/1980s.jpg
memories/2060.jpg
```

- Portrait, landscape and square all work; every photo is shown with `object-cover`
  and a `position` you control (e.g. `"50% 20%"` keeps faces near the top in frame).
- The lightbox always shows the whole image uncropped.
- A missing file shows a quiet "a photo goes here" tile instead of breaking a screen.
- Keep files under ~500 KB each for phones (export at ~1600px on the long edge).

## The gifts (Surprise #6)

`gifts` in `birthday.ts` is a calendar: each entry has `unlockAt` (IST,
`"YYYY-MM-DDTHH:mm"`), a `teaser` shown while locked, and the reveal (title,
description, image, handwritten message, optional link/code). Gifts unlock on
their own; she reaches them from the box in Surprise #6 and later from
"Your gifts this week" on the final screen, which shows a badge for anything
new. Gift locks are real on every URL, including `?preview`; only `?preview=all`
unlocks them, for proofreading the cards.

## The birthday lock

`settings.lockUntilBirthday = true` shows only the countdown until 21 Sep 2026
(midnight, Asia/Kolkata). To test the full experience before then open the site
with `?preview` — e.g. `https://ajaykadoula.github.io/raina-birthday/?preview` —
or set the flag to `false`.

## Debug panel

Tiny gear bottom-left, or **Shift + D**: reset saved progress, jump to any stage.
Progress lives in `localStorage` (key `raina-birthday:v1`), so a refresh resumes.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview
```

## Deploy

Every push to `main` builds and publishes via `.github/workflows/deploy.yml`
(GitHub Pages, "GitHub Actions" source). `vite.config.ts` sets the base path to
`/raina-birthday/` for production builds and copies `index.html` to `404.html` so
deep links (`/raina`) work on Pages.

## Structure

```
src/
  components/   Intro · Countdown · Progress · Quiz · SurpriseCard · Timeline · RoastGame
                MemoryGame · Reasons · GiftReveal · LoveLetter · SecretReveal
                MusicPlayer · PhotoViewer · Settings · Effects · ui/
  pages/BirthdayExperience.tsx   the stage machine
  data/         settings.ts · birthday.ts · letter.ts · types.ts
  hooks/        useBirthdayProgress · useMusic
  utils/        assets · date · storage
```

Accessibility: keyboard-operable throughout, visible focus rings, `aria-live`
feedback in the games, and every animation collapses under `prefers-reduced-motion`.
