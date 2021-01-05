import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
import Loader from "react-loader-spinner";

import Header from "./components/Header";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";

import ThemeContext from "./context/ThemeContext";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faTimes, faStar);

const App = () => {
  const API = "https://myweather-backend.herokuapp.com";

  const [isLoading, setIsLoading] = useState(true);
  const [weatherCurrentPosition, setWeatherCurrentPosition] = useState({}); // will get the weather data of the geolocation
  const [weatherSearchCity, setWeatherSearchCity] = useState({}); // will get the weather data of the search
  const [isSearch, setIsSearch] = useState(false); // allows to display the SearchResult component when there is a search
  const [textInput, setTextInput] = useState(""); // will
  const [searchErrorMessage, setSearchErrorMessage] = useState(""); // will manage the error message when the search is incorrect
  const [theme, setTheme] = useState({}); // will get the theme (day or night)

  useEffect(() => {
    // request to get the geolocation
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (coords) {
          // if the request is accepted, a request is sent to the backend to get the weather data
          (async () => {
            try {
              const response = await axios.get(
                `${API}/weather/currentposition?lat=${coords.latitude}&lon=${coords.longitude}`
              );

              if (response.status === 200) {
                // if the data sends by the backend is correct
                setWeatherCurrentPosition(response.data);
                const currentTimestamp = moment().unix();

                if (
                  currentTimestamp >= response.data.sys.sunrise &&
                  currentTimestamp <= response.data.sys.sunset
                ) {
                  // if the current datetime is between the sunrise and the sunset of the weather geolocation, the theme is day (light)
                  setTheme("day");
                } else {
                  // otherwise, the theme is night (dark)
                  setTheme("night");
                }
                setIsLoading(false);
              }
            } catch (err) {
              console.log(err);
            }
          })();
        }
      },
      () => {
        // if the request for the geolocation is denied, the theme is automatically set as day
        setTheme("day");
        setIsLoading(false);
      }
    );
  }, []);

  // function used to make the city search
  const searchCity = async (city) => {
    try {
      const response = await axios.get(
        `${API}/weather/searchcity?city=${city}`
      );

      if (response.status === 200) {
        setWeatherSearchCity(response.data);
        setIsSearch(true);
      }
    } catch (err) {
      console.log(err);
      setSearchErrorMessage("La ville est incorrect");
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`App ${theme === "night" ? "App-night" : "App-day"}`}>
        {theme && (
          <Header
            textInput={textInput}
            setTextInput={setTextInput}
            searchCity={searchCity}
            searchErrorMessage={searchErrorMessage}
            setSearchErrorMessage={setSearchErrorMessage}
          />
        )}
        {isLoading ? (
          <div className="Loader-container">
            <Loader type="Oval" color="#fff" />
          </div>
        ) : isSearch ? (
          <div className="wrapper">
            <SearchResult
              API={API}
              data={weatherSearchCity}
              setIsSearch={setIsSearch}
              setTextInput={setTextInput}
            />
          </div>
        ) : (
          <div className="wrapper">
            <Main API={API} data={weatherCurrentPosition} />
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
