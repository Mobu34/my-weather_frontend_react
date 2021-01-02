import { createContext } from "react";

const themes = {
  day: {
    name: "day",
  },
  night: {
    name: "night",
  },
};

const ThemeContext = createContext(themes);

export default ThemeContext;
