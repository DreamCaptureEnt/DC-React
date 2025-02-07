/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2761ce',
        'secondary': '#dddbff',
        'accent': '#3d81ff',
        'text': '#040316',
        'text-light': '#262626',
        'background': '#fbfbfe',
        'background-accent': '#e1e2ea',
       },
       fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        '.container' : {
            '@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-14 xl:max-w-[87.5rem]':{},
        }
      })
    }
  ],
}