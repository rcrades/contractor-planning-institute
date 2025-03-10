/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        yellow: {
          400: '#facc15',
          500: '#eab308',
        },
        zinc: {
          300: '#d4d4d8',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
    },
  },
  plugins: [],
} 