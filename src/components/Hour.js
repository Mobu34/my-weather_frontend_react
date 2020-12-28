import React from "react";
import "./Hour.css";
import moment from "moment";

const Hour = ({ item }) => {
  // console.log(item);
  return (
    <div className="Hour">
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
