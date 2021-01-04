import React, { useContext } from "react";
import "./Item.css";
import moment from "moment";
import "moment/locale/fr";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeContext from "../context/ThemeContext";

import Details from "./Details";

moment.locale("fr");

const Item = ({
  dispatch,
  API,
  data,
  isFavorite,
  setIsSearch,
  showDetails,
  setShowDetails,
  setTextInput,
}) => {
  const theme = useContext(ThemeContext);

  // function that shows the weather details of a city
  const handleClick = () => {
    if (showDetails === data.new_id) {
      setShowDetails(null);
    } else {
      setShowDetails(data.new_id);
    }
  };

  // function that puts the city in favorites
  const handleFavorite = (e) => {
    e.stopPropagation();

    let action;
    if (!isFavorite) {
      action = { type: "ADD", value: data.id };
    } else {
      action = { type: "DELETE", value: data.id };
    }
    dispatch(action);

    if (setIsSearch) {
      setIsSearch(false);
    }

    if (setTextInput) {
      setTextInput("");
    }
  };

  moment.locale("fr");
  const time = moment(data.dt + data.timezone).format("LT");

  return (
    <>
      <div className="Item" onClick={handleClick}>
        <div className="Item-left-container">
          <span className="Item-time">{time}</span>
          <h3 className="Item-city">{data.name}</h3>
          <span className="Item-country">{data.sys.country}</span>
        </div>
        <img
          className="Item-weather-icon"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt=""
        />
        <div className="Item-right-container">
          <div
            className={`Item-favorite-btn ${
              theme.name === "night"
                ? "Item-favorite-btn-night"
                : "Item-favorite-btn-day"
            }`}
            onClick={handleFavorite}
          >
            {isFavorite ? (
              <span className="Item-favorite-btn-text">
                Supprimer des favoris
              </span>
            ) : (
              <span className="Item-favorite-btn-text">Ajouter en favoris</span>
            )}
            <FontAwesomeIcon
              icon="star"
              color={isFavorite ? "#FFCC04" : "#c9c9c9"}
              className="Item-star-icon"
            />
          </div>
          <span className="Item-temp">{data.main.temp.toFixed(0)}°C</span>
        </div>
      </div>
      {showDetails === data.new_id && <Details API={API} data={data} />}
    </>
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
