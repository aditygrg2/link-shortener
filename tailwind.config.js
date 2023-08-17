/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,jpeg}",
  ],
  theme: {
    extend: {
      fontFamily : {
        poppins : ['Poppins' ,'sans-serif'], 
        quicksand : ['Quicksand','sans-serif'],
        grotesque : ['Bricolage Grotesque', 'sans-serif'],
      },
      backgroundColor : {
        dark : ['#0f0f0f'],
        primaryButton : ['#45a0f5'],
      },
      backgroundImage : {
        site : 'url("./public/site-image2.jpg")',
      },
      borderColor : {
        primaryButton : ['#45a0f5'],
      }, 
      textColor : {
        'primaryButton' : '#45a0f5',
      }
    },
  },
  plugins: [],
}

