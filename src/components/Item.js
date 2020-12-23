import React from "react";
import "./Item.css";
import moment from "moment";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import sun from "../assets/sun.svg";

const Item = ({ dispatch, data, isFavorite, setIsSearch }) => {
  const hours = Math.floor(data.dt / 60 / 60);
  const minutes = Math.floor(data.dt / 60) - hours * 60;

  const handleFavorite = (e) => {
    e.stopPropagation();

    let action;
    if (!isFavorite) {
      action = { type: "ADD", value: data };
    } else {
      action = { type: "DELETE", value: data };
    }
    dispatch(action);

    if (setIsSearch) {
      setIsSearch(false);
    }
  };

  return (
    <div className="Item">
      <div className="Item-left-container">
        <span className="Item-time">
          {/* {hours}:{minutes} */}
          {moment().format("LT")}
        </span>
        <h3 className="Item-city">{data.name}</h3>
      </div>
      <img
        className="Item-weather-icon"
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt=""
      />
      <div className="Item-right-container">
        {/* {!location && <div>Add Favorites</div>} */}
        <div className="Item-favorite-btn" onClick={handleFavorite}>
          {isFavorite ? "Supprimer des favoris" : "Ajouter en favoris"}
          <FontAwesomeIcon
            icon="star"
            color={isFavorite ? "#FFCC04" : "gray"}
            className="Item-star-icon"
          />
        </div>
        <span className="Item-temp">{data.main.temp.toFixed(0)}°C</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapDispatchToProps)(Item);
