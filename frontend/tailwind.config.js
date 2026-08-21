/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F3FA',
          100: '#E0E7F5',
          600: '#1E3A8A',
          700: '#1D4ED8',
          800: '#1E293B',
          900: '#0F172A',
        },
        college: {
          blue: '#1E40AF',
          accent: '#0D9488',
          lost: '#DC2626',
          found: '#059669',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
