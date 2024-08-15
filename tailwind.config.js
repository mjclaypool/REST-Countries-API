/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ["nunito", 'sans-serif'],
      },
      colors: {
        'dark-theme-txt': 'hsl(0, 0%, 100%)',
        'dark-theme-elem': 'hsl(209, 23%, 22%)',
        'dark-theme-bg': 'hsl(207, 26%, 17%)',
        'light-theme-txt': 'hsl(200, 15%, 8%)',
        'light-theme-elem': 'hsl(0, 0%, 100%)',
        'light-theme-bg': 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
}

