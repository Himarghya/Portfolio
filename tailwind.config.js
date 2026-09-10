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
        aurora: {
          bg: '#040711',
          surface: '#0A0F1D',
          card: 'rgba(12, 18, 34, 0.82)',
          cyan: '#00F2FE',
          blue: '#4FACFE',
          violet: '#8B5CF6',
          fuchsia: '#D946EF',
          emerald: '#00F5D4',
          amber: '#F59E0B',
          text: '#F8FAFC',
          muted: '#94A3B8',
          border: 'rgba(0, 242, 254, 0.16)'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'aurora-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 254, 0.12), rgba(139, 92, 246, 0.08) 50%, transparent 80%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
