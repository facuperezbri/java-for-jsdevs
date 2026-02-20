/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          950: 'var(--color-surface-950)',
          900: 'var(--color-surface-900)',
          800: 'var(--color-surface-800)',
          700: 'var(--color-surface-700)',
          600: 'var(--color-surface-600)',
          500: 'var(--color-surface-500)',
        },
        java: {
          DEFAULT: '#e52520',
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc5c5',
          300: '#ff9898',
          400: '#ff5b5b',
          500: '#f82b2b',
          600: '#e52520',
          700: '#c01111',
          800: '#9f1212',
          900: '#841515',
          950: '#480505',
        },
        js: {
          DEFAULT: '#f7df1e',
          dark: '#c9b400',
        },
        module: {
          blue: '#3b82f6',
          purple: '#a855f7',
          green: '#22c55e',
          red: '#e52520',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        }
      },
    },
  },
  plugins: [],
}
