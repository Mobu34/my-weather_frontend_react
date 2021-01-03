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

  const inputRef = useRef(null); // this ref is used to focus on the input when it is displayed

  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (displayInput) {
      inputRef.current.focus();
    }
  }, [displayInput]);

  // function triggers when we make a search (by pressing enter or click on the search icon)
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (textInput.length > 0) {
      searchCity(textInput); // state passes to the function (props)
    }
  };

  // function that manages the text input
  const handleChange = (e) => {
    setTextInput(e.target.value);
    if (searchErrorMessage !== "") {
      setSearchErrorMessage("");
    }
  };

  // function that manages the click on the search icon
  const handleClick = () => {
    if (textInput.length > 0 && displayInput) {
      // if the input is displayed and the text is longer than 0, it submits the search
      handleSubmit();
    } else {
      // otherwise, it displayed or undisplayed the input
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
