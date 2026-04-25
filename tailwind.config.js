/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        paper: '#FAF7F2',
        forest: '#2D3A3A',
        terracotta: '#E8704A',
        sage: '#8BA888',
        ink: '#1A1A2E',
        taupe: '#B8A9A0',
        mist: '#E8E0D5',
        // dark mode tokens
        void: '#0F0F1A',
        dusk: '#1A1A2E',
        glow: '#E8704A',
        moss: '#64FFDA',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'blink': 'blink 1.2s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(var(--rotate, 0deg))' },
          '50%': { transform: 'translateY(-8px) rotate(var(--rotate, 0deg))' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
