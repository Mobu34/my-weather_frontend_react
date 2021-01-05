import React, { useContext } from "react";
import "./Hour.css";
import moment from "moment";

import ThemeContext from "../context/ThemeContext";

const Hour = ({ item }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`Hour ${theme === "night" ? "Hour-night" : "Hour-day"}`}>
      <span className="Hour-text">{moment(item.dt * 1000).format("LT")}</span>
      <img
        className="Hour-weather-icon"
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
        alt=""
      />
      <span className="Hour-description">{item.weather[0].description}</span>
      <span className="Hour-text">{item.temp.toFixed(0)}°C</span>
    </div>
  );
};

export default Hour;
