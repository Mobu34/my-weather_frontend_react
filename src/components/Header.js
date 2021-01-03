import React, { useState, useEffect, useRef, useContext } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ThemeContext from "../context/ThemeContext";

import logo from "../assets/logo.png";

const Header = ({
  textInput,
  setTextInput,
  searchCity,
  searchErrorMessage,
  setSearchErrorMessage,
}) => {
  const [displayInput, setDisplayInput] = useState(false);

  const inputRef = useRef(null);

  const themeContext = useContext(ThemeContext);

  // console.log(theme);

  useEffect(() => {
    console.log("useEffect");
    if (displayInput) {
      console.log("if");
      inputRef.current.focus();
    }
  }, [displayInput]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (textInput.length > 0) {
      searchCity(textInput);
    }
  };

  const handleChange = (e) => {
    setTextInput(e.target.value);
    if (searchErrorMessage !== "") {
      setSearchErrorMessage("");
    }
  };

  const handleClick = () => {
    if (textInput.length > 0 && displayInput) {
      handleSubmit();
    } else {
      setDisplayInput(!displayInput);
    }
  };

  return (
    <header className="Header">
      <div className="wrapper">
        <div
          className={`Header-container ${
            themeContext.name === "night"
              ? "Header-container-night"
              : "Header-container-day"
          }`}
        >
          <div className="Header-logo-container">
            <img className="Header-logo" src={logo} alt="MyWeather logo" />
            <h1>MyWeather</h1>
          </div>
          <form onSubmit={handleSubmit} className="Header-form">
            {displayInput && (
              <div className="Header-input-container">
                <input
                  className="Header-input"
                  type="text"
                  value={textInput}
                  onChange={handleChange}
                  ref={inputRef}
                />
                <span className="Header-input-errormessage">
                  {searchErrorMessage}
                </span>
              </div>
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
