/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'wiggler': 'wiggle 1.5s cubic-bezier(0.1, -0.6, 0.2, 0) infinite',
        'antiWiggler': 'wiggle 0.5s reverse infinite',
        'leftVanish': 'flyLeft 3s ease-in-out 1',
        'rightVanish': 'flyRight 3s ease-in-out 1',
        'spin': 'spinning 0.1s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-3deg)' },
        },
        spinning: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flyRight: {
          '0%': { scale: 1, opacity: 1, transform: 'translate(0px, 0px)' },
          '80%': { scale: 0.4, opacity: 0.4, transform: 'translate(-200px, 50px)' },
          '100%': { scale: 0, opacity: 0, transform: 'translate(-150px, 10px)' },
        },
        flyLeft: {
          '0%': { scale: 1, opacity: 1, transform: 'translate(0px, 0px)' },
          '80%': { scale: 0.4, opacity: 0.4, transform: 'translate(200px, -50px)' },
          '100%': { scale: 0, opacity: 0, transform: 'translate(150px, -10px)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: [
          'Geologica',
          {
            fontVariationSettings: '"CRSV" 1, "slnt" 0, "SHRP" 100'
          }
        ],
        serif: [
          'Anton'
        ],
        mono: [
          'Rubik'
        ]
      }
    }
  },
  plugins: [require('nativewind/tailwind/css')],
};
