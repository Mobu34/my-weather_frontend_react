import React from "react";
import "./Item.css";
import moment from "moment";

moment.locale();

const Item = ({ weatherCurrentPosition }) => {
  return (
    <div className="Item">
      <div className="Item-left-container">
        <span>{moment().format("LT")}</span>
        <h3>{weatherCurrentPosition.name}</h3>
      </div>
      <span>{weatherCurrentPosition.main.temp}°C</span>
    </div>
  );
};

export default Item;
