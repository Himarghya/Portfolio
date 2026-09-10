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
        glass: {
          bg: '#F3F4F8',
          card: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.8)',
          'border-subtle': 'rgba(226, 232, 240, 0.8)',
          primary: '#0F172A',
          secondary: '#6366F1',
          accent: '#8B5CF6',
          text: '#0F172A',
          muted: '#64748B',
          soft: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 14px 40px 0 rgba(99, 102, 241, 0.12)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
        'pill': '0 2px 10px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'fluid-mesh': 'radial-gradient(at 10% 10%, rgba(224, 231, 255, 0.7) 0px, transparent 50%), radial-gradient(at 90% 15%, rgba(243, 232, 255, 0.8) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(241, 245, 249, 0.6) 0px, transparent 60%), radial-gradient(at 80% 85%, rgba(224, 242, 254, 0.7) 0px, transparent 50%), radial-gradient(at 15% 90%, rgba(254, 243, 199, 0.5) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
