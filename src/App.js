import React, { useState, useEffect, useContext } from "react";
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
  // const API = "http://localhost:3001";
  const API = "https://myweather-backend.herokuapp.com";

  const themeContext = useContext(ThemeContext);
  // console.log(themeContext);

  const [isLoading, setIsLoading] = useState(true);
  const [weatherCurrentPosition, setWeatherCurrentPosition] = useState({});
  const [weatherSearchCity, setWeatherSearchCity] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [theme, setTheme] = useState({});

  useEffect(() => {
    // console.log("useEffect");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (coords) {
          (async () => {
            try {
              // console.log("avant req");
              const response = await axios.get(
                `${API}/weather/currentposition?lat=${coords.latitude}&lon=${coords.longitude}`
              );

              console.log(response.data);

              if (response.status === 200) {
                setWeatherCurrentPosition(response.data);
                const currentTimestamp = moment().unix();
                if (
                  currentTimestamp >= response.data.sys.sunrise &&
                  currentTimestamp <= response.data.sys.sunrise
                ) {
                  setTheme(themeContext.day);
                } else {
                  setTheme(themeContext.night);
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
        setTheme(themeContext.day);
        setIsLoading(false);
      }
    );
  }, []);

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

  // console.log(moment().unix());

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={`App ${theme.name === "night" ? "App-night" : "App-day"}`}
      >
        {theme.name && (
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
              data={weatherSearchCity}
              setIsSearch={setIsSearch}
              setTextInput={setTextInput}
            />
          </div>
        ) : (
          <div className="wrapper">
            <Main data={weatherCurrentPosition} />
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
