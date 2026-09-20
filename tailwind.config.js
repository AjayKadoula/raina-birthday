/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        cream: 'rgb(var(--c-cream) / <alpha-value>)',
        wine: 'rgb(var(--c-wine) / <alpha-value>)',
        burgundy: 'rgb(var(--c-burgundy) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        rose: 'rgb(var(--c-rose) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', '"Cormorant Garamond"', 'cursive'],
      },
      fontSize: {
        display: 'clamp(2.6rem, 8vw, 6rem)',
        headline: 'clamp(2rem, 5.5vw, 4rem)',
        title: 'clamp(1.5rem, 3.6vw, 2.5rem)',
        lead: 'clamp(1.05rem, 2.2vw, 1.35rem)',
      },
      boxShadow: {
        cinematic: '0 30px 80px -20px rgb(0 0 0 / 0.6), 0 10px 30px -10px rgb(0 0 0 / 0.4)',
        card: '0 20px 50px -20px rgb(20 12 10 / 0.45)',
        glow: '0 0 60px 10px rgb(var(--c-gold) / 0.25)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
