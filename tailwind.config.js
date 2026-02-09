/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1e3a8a',
          blue: '#2563eb',
          light: '#3b82f6',
        },
        secondary: {
          green: '#10b981',
          light: '#34d399',
        },
        neutral: {
          light: '#f3f4f6',
          gray: '#6b7280',
          dark: '#1f2937',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'opensans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}