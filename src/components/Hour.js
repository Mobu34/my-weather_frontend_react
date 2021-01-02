import React, { useContext } from "react";
import "./Hour.css";
import moment from "moment";

import ThemeContext from "../context/ThemeContext";

const Hour = ({ item }) => {
  const theme = useContext(ThemeContext);
  console.log(theme);

  return (
    <div
      className={`Hour ${theme.name === "night" ? "Hour-night" : "Hour-day"}`}
    >
      <span>{moment(item.dt * 1000).format("LT")}</span>
      <img
        className="Hour-weather-icon"
        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt=""
      />
      <span>{item.weather[0].description}</span>
      <span>{item.temp.toFixed(0)}°C</span>
    </div>
  );
};

export default Hour;
