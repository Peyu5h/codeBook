/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens:{
    
      xs: '418px',
      xss: '496px',
      sm: '618px',
      md:'768px',
      lg:'984px',
      lgg: '1093px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        com : ['Comfortaa', 'sans-serif'],
        pop : ['Poppins', 'sans-serif'],

      }
    },
  },
  plugins: [],
}

