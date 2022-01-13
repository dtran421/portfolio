import { createContext, useState } from "react";

import "../styles/globals.css";

export const ThemeContext = createContext(null);

function MyApp({ Component, pageProps }) {
   const [darkMode, toggleDarkMode] = useState(true);

   return (
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
         <Component {...pageProps} />
      </ThemeContext.Provider>
   );
}

export default MyApp;
