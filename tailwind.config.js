module.exports = {
   content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
   // darkMode: "class", // or 'media' or 'class'
   theme: {
      extend: {
         animation: {
            bounce: "bounce 1.25s linear infinite"
         },
         backgroundImage: (theme) => ({
            "banner-img": "url('/city_night.jpg')"
         })
      },
      fontFamily: {
         display: ["Quicksand"],
         body: ["Quicksand"],
         Oxygen: ["Oxygen", "sans-serif"]
      }
   },
   plugins: []
};
