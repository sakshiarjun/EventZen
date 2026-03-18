/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e71111',     // red-500 (vibrant but not too aggressive)
          light: '#f87171',       // light red
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#6b7280',     // gray-500
          light: '#f3f4f6',       // light grey
        },
        background: '#ffffff',
        foreground: '#111827',    // almost black
        muted: {
          DEFAULT: '#f3f4f6',
          foreground: '#6b7280',
        },
        accent: '#ef4444',
        destructive: '#ef4444',
        border: '#e5e7eb',
        input: '#e5e7eb',
        ring: '#ef4444',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}