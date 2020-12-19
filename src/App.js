import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [coords, setCoords] = useState({});

  useEffect(() => {
    console.log("useEffect");
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (coords) {
        setCoords(coords);
      }
    });
  }, []);

  console.log(coords);
  return (
    <div>
      Hello from <a href="https://www.lereacteur.io">Le Reacteur !</a>
    </div>
  );
};

export default App;
