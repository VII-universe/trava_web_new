/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FDFBF7',
        slate: {
          800: '#2D3748',
          900: '#1A202C',
        },
        gold: {
          400: '#D4AF37',
          500: '#C5A028',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
      },
      backgroundImage: {
        'mist-gradient': 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      }
    },
  },
  plugins: [],
}
