/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',      // Main Background
        card: '#0a0a0a',      // Component Background
        navy: '#1e3a8a',      // Ambient Glows
        periwinkle: '#818cf8',// Primary Accent
      },
      fontFamily: {
        serif: ['Times New Roman', 'serif'], // Fallback to system serif for MVP
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}