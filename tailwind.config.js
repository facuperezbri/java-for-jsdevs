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
        // Semantic surface tokens (CSS vars handle light/dark)
        'page-bg': 'var(--color-page-bg)',
        'surface-1': 'var(--color-surface-1)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',
        'code-bg': 'var(--color-code-bg)',
        border: {
          subtle: 'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
        },
        // Brand
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
        // Glow / muted tints
        'java-glow': 'rgba(229, 37, 32, 0.2)',
        'js-muted': 'rgba(247, 223, 30, 0.15)',
        // Module accent colors (lightened for dark backgrounds)
        module: {
          blue: '#5b9cf6',
          purple: '#b87aff',
          green: '#4ade80',
          red: '#f05252',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        reading: '42rem',
      },
      lineHeight: {
        reading: '1.7',
      },
      boxShadow: {
        editorial: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)',
        'editorial-lg': '0 2px 6px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)',
        'glow-red': '0 0 12px rgba(229, 37, 32, 0.15)',
        'glow-yellow': '0 0 12px rgba(247, 223, 30, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(229, 37, 32, 0.1)' },
          '50%': { boxShadow: '0 0 16px rgba(229, 37, 32, 0.25)' },
        },
      },
    },
  },
  plugins: [],
}
