import React from "react";
import "./Day.css";
import moment from "moment";

const Day = ({ item }) => {
  console.log(item);
  return (
    <div className="Day">
      <span>{moment(item.dt * 1000).format("dddd")}</span>
      <span>
        {item.temp.min.toFixed(0)} / {item.temp.max.toFixed(0)}
      </span>
    </div>
  );
};

export default Day;
