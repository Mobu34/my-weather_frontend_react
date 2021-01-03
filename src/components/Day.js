import React from "react";
import "./Day.css";
import moment from "moment";

const Day = ({ item }) => {
  return (
    <div className="Day">
      <div>{moment(item.dt * 1000).format("dddd")}</div>
      <div>Min : {item.temp.min.toFixed(0)}°C</div>
      <div>Max : {item.temp.max.toFixed(0)}°C</div>
    </div>
  );
};

export default Day;
