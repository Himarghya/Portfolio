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
          bg: '#05070D',
          card: 'rgba(11, 17, 32, 0.75)',
          panel: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(0, 229, 255, 0.18)',
          'border-bright': 'rgba(0, 229, 255, 0.45)',
          cyan: '#00E5FF',
          purple: '#7C3AED',
          lime: '#A3FF12',
          blue: '#3B82F6',
          text: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(124,58,237,0.15) 50%, rgba(5,7,13,0.9) 100%)',
        'grid-pattern': 'linear-gradient(to right, rgba(0, 229, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.05) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(124, 58, 237, 0.05) 45%, transparent 70%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spinReverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
