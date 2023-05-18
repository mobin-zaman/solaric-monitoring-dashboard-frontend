/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    animation: {
      flowX: 'flowX 6s infinite linear',
      flowReverseX: 'flowReverseX 6s infinite linear',
      flowY: 'flowY 6s infinite linear',
      flowReverseY: 'flowReverseY 6s infinite linear',
    },
    keyframes: {
      flowX: {
        '0%': { transform: 'translateX(-50%)' },
        '100%': { transform: 'translateX(50%)' },
      },
      flowReverseX: {
        '0%': { transform: 'translateX(50%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      flowY: {
        '0%': { transform: 'translateY(100%)' },
        '100%': { transform: 'translateY(0%)' },
      },
      flowReverseY: {
        '0%': { transform: 'translateY(0%)' },
        '100%': { transform: 'translateY(100%)' },
      },
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
