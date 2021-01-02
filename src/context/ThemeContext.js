import { createContext } from "react";

const themes = {
  day: {
    name: "day",
    // backgroundColor: "#f2faff",
    // textColor: "#000",
    // btnBackgroundColor: "#007db9",
    // btnColor: "#fff",
  },
  night: {
    name: "night",
    // backgroundColor: "#005e89",
    // textColor: "#fff",
    // btnBackgroundColor: "#005e89",
    // btnColor: "#000",
  },
};

const ThemeContext = createContext(themes);

export default ThemeContext;
