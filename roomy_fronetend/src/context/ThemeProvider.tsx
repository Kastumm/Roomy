import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }: any) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    darkTheme
      ? document.body.classList.add("dark-theme")
      : document.body.classList.remove("dark-theme");
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;