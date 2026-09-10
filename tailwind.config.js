/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#020704',
          surface: '#040E08',
          card: 'rgba(5, 18, 10, 0.75)',
          panel: 'rgba(7, 24, 14, 0.82)',
          border: 'rgba(0, 255, 135, 0.18)',
          'border-bright': 'rgba(0, 255, 135, 0.45)',
          emerald: '#00FF87',
          lime: '#A3FF12',
          mint: '#6EE7B7',
          teal: '#14B8A6',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, rgba(0,255,135,0.15) 0%, rgba(163,255,18,0.1) 50%, rgba(2,7,4,0.95) 100%)',
        'radial-emerald': 'radial-gradient(circle at center, rgba(0, 255, 135, 0.15) 0%, rgba(163, 255, 18, 0.05) 45%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
