import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/logo.png";

const Header = ({ textInput, setTextInput, searchCity }) => {
  const [displayInput, setDisplayInput] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    console.log("useEffect");
    if (displayInput) {
      console.log("if");
      inputRef.current.focus();
    }
  }, [displayInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCity(textInput);
  };

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleClick = () => {
    setDisplayInput(!displayInput);
  };

  return (
    <header className="Header">
      <div className="wrapper">
        <div className="Header-container">
          <div className="Header-logo-container">
            <img className="Header-logo" src={logo} alt="MyWeather logo" />
            <h1>MyWeather</h1>
          </div>
          <form onSubmit={handleSubmit} className="Header-form">
            {displayInput && (
              <input
                className="Header-input"
                type="text"
                value={textInput}
                onChange={handleChange}
                ref={inputRef}
              />
            )}
            <FontAwesomeIcon
              icon="search"
              // size=
              onClick={handleClick}
              className="Header-search-icon"
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
