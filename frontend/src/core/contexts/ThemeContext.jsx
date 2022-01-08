import React, { createContext, useState, useMemo } from "react";

import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const lastSelectedTheme = useMemo(() => {
    return localStorage.getItem("@money-balance:theme");
  }, []);

  const [theme, setTheme] = useState(
    lastSelectedTheme === "light" ? light : dark
  );

  const toggleTheme = () => {
    if (theme.title === "dark") {
      setTheme(light);
      localStorage.setItem("@money-balance:theme", "light");
    } else {
      setTheme(dark);
      localStorage.setItem("@money-balance:theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
