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
      flowX1: 'flowX 6s infinite linear',
      flowReverseX1: 'flowReverseX 6s infinite linear',
      flowX2: 'flowX 6s infinite linear',
      flowReverseX2: 'flowReverseX 6s infinite linear',
      flowY: 'flowY 6s infinite linear',
      flowReverseY: 'flowReverseY 6s infinite linear',
    },
    keyframes: {
      flowX: {
        '0%': { transform: 'translateX(-40%)' },
        '100%': { transform: 'translateX(40%)' },
      },
      flowReverseX: {
        '0%': { transform: 'translateX(40%)' },
        '100%': { transform: 'translateX(-40%)' },
      },
      flowX1: {
        '0%': { transform: 'translateX(-30%)' },
        '100%': { transform: 'translateX(30%)' },
      },
      flowReverseX1: {
        '0%': { transform: 'translateX(30%)' },
        '100%': { transform: 'translateX(-30%)' },
      },
      flowX2: {
        '0%': { transform: 'translateX(-12%)' },
        '100%': { transform: 'translateX(12%)' },
      },
      flowReverseX2: {
        '0%': { transform: 'translateX(12%)' },
        '100%': { transform: 'translateX(-12%)' },
      },
      flowY: {
        '0%': { transform: 'translateY(40%)' },
        '100%': { transform: 'translateY(-10%)' },
      },
      flowReverseY: {
        '0%': { transform: 'translateY(-40%)' },
        '100%': { transform: 'translateY(10%)' },
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
