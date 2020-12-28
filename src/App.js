import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes, faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faTimes, faStar);

const App = () => {
  const API = "http://localhost:3001";

  const [isLoading, setIsLoading] = useState(true);
  const [weatherCurrentPosition, setWeatherCurrentPosition] = useState({});
  const [weatherSearchCity, setWeatherSearchCity] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    // console.log("useEffect");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      // console.log(coords);
      if (coords) {
        (async () => {
          try {
            // console.log("avant req");
            const response = await axios.get(
              `${API}/weather/currentposition?lat=${coords.latitude}&lon=${coords.longitude}`
            );

            // console.log(response);

            if (response.status === 200) {
              setWeatherCurrentPosition(response.data);
              setIsLoading(false);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      } else {
        // console.log("else");
        setIsLoading(false);
      }
    });
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
    }
  };

  return (
    <div className="App">
      <Header
        textInput={textInput}
        setTextInput={setTextInput}
        searchCity={searchCity}
      />
      {isLoading ? (
        <span>Chargement en cours ...</span>
      ) : isSearch ? (
        <>
          <div className="wrapper">
            <SearchResult
              data={weatherSearchCity}
              setIsSearch={setIsSearch}
              setTextInput={setTextInput}
            />
          </div>
        </>
      ) : (
        <div className="wrapper">
          <Main data={weatherCurrentPosition} />
        </div>
      )}
    </div>
  );
};

export default App;
