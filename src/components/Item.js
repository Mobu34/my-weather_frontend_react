import React, { useState } from "react";
import "./Item.css";
import moment from "moment";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

import Details from "./Details";

const Item = ({
  dispatch,
  data,
  isFavorite,
  setIsSearch,
  showDetails,
  setShowDetails,
}) => {
  const hours = Math.floor(data.dt / 60 / 60);
  const minutes = Math.floor(data.dt / 60) - hours * 60;

  // const [isDetailed, setIsDetailed] = useState(false);

  const handleClick = () => {
    if (showDetails === data.id) {
      setShowDetails(null);
    } else {
      setShowDetails(data.id);
    }
  };

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

  console.log(data);

  return (
    <>
      <div className="Item" onClick={handleClick}>
        <div className="Item-left-container">
          <span className="Item-time">
            {/* {hours}:{minutes} */}
            {moment().format("LT")}
            {/* <Moment unix>{data.dt + data.timezone}</Moment> */}
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
      {showDetails === data.id && <Details data={data} />}
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
