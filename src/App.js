import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  const API = "http://localhost:3001";

  const [isLoading, setIsLoading] = useState(true);
  const [weatherCurrentPosition, setWeatherCurrentPosition] = useState({});

  useEffect(() => {
    console.log("useEffect");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        (async () => {
          try {
            const response = await axios.get(
              `${API}/weather/currentposition?lat=${coords.latitude}&lon=${coords.longitude}`
            );

            if (response.status === 200) {
              setWeatherCurrentPosition(response.data);
              setIsLoading(false);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }
    });
  }, []);

  console.log(weatherCurrentPosition);

  return (
    <div className="App">
      <Header />
      {isLoading ? (
        <span>Chargement en cours ...</span>
      ) : (
        <Main API={API} weatherCurrentPosition={weatherCurrentPosition} />
      )}
    </div>
  );
};

export default App;
