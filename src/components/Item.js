import React, { useContext } from "react";
import "./Item.css";
import moment from "moment";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeContext from "../context/ThemeContext";

import Details from "./Details";

const Item = ({
  dispatch,
  data,
  isFavorite,
  setIsSearch,
  showDetails,
  setShowDetails,
  setTextInput,
}) => {
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    // console.log(data.id);
    if (showDetails === data.new_id) {
      setShowDetails(null);
    } else {
      setShowDetails(data.new_id);
    }
  };

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

  // console.log("showDetails =", showDetails);
  console.log("showDetails =", showDetails);
  console.log("id =", data.id);

  // console.log("before =", data.id);
  // console.log("after =", data.id);

  console.log(data);

  return (
    <>
      <div className="Item" onClick={handleClick}>
        <div className="Item-left-container">
          <span className="Item-time">
            {/* {hours}:{minutes} */}
            {/* {moment().format("LT")} */}
            {moment(data.dt + data.timezone).format("LT")}
            {/* <Moment unix>{data.dt + data.timezone}</Moment> */}
          </span>
          <h3 className="Item-city">{data.name}</h3>
          <span className="Item-country">{data.sys.country}</span>
        </div>
        <img
          className="Item-weather-icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
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
      {showDetails === data.new_id && <Details data={data} />}
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
