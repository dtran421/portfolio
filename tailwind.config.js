module.exports = {
   purge: ["./pages/**/*.js", "./components/**/*.js"],
   darkMode: "class", // or 'media' or 'class'
   theme: {
      extend: {
         animation: {
            bounce: "bounce 1.25s linear infinite"
         },
         backgroundImage: (theme) => ({
            "banner-img": "url('/city_night.jpg')"
         }),
         colors: {
            "java-orange": "#e76f00",
            "python-yellow": "#ffcf3e",
            "react-blue": "#61dbfb",
            "swift-red": "#eb4548",
            "cpp-blue": "#00589d",
            "node-green": "#8cc84b",
            "mongo-green": "#4caf50",
            "typescript-blue": "#007acc",
            "tailwind-blue": "#17b9b9",
            "google-green": "#34a853"
         }
      },
      fontFamily: {
         sans: ["Quicksand"]
      }
   },
   variants: {
      extend: {
         animation: ["hover"]
      }
   },
   plugins: []
};
