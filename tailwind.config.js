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
        netflix: {
          red: '#E50914',
          darkRed: '#B81D24',
          black: '#141414',
          dark: '#0B0B0B',
          card: '#181818',
          cardHover: '#232323',
          gray: '#808080',
          lightGray: '#E5E5E5',
          border: '#333333'
        }
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'Ubuntu', 'sans-serif'],
        bebas: ['Bebas Neue', 'Impact', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'netflix-hero': 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.6) 20%, rgba(20,20,20,0) 60%, rgba(20,20,20,0.7) 100%)',
        'netflix-card': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)',
        'netflix-red-gradient': 'linear-gradient(135deg, #E50914 0%, #B81D24 100%)',
      }
    },
  },
  plugins: [],
}