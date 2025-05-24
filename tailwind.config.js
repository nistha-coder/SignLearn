/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Main palette
        'green-100': '#d9ed92',
        'green-200': '#b5e48c',
        'green-300': '#99d98c',
        'green-400': '#76c893',
        'teal-500': '#52b69a',
        'teal-600': '#34a0a4',
        'blue-700': '#168aad',
        'blue-800': '#1e6091',
        
        // Additional functional colors
        'primary': '#34a0a4',
        'secondary': '#99d98c',
        'accent': '#1e6091',
        'success': '#76c893',
        'warning': '#ffd166',
        'error': '#ef476f',
        
        // Background shades
        'bg-dark': '#121212',
        'bg-medium': '#1e1e1e',
        'bg-light': '#2d2d2d',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};