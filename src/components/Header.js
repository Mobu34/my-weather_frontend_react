import React, { useState, useRef } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/logo.png";

const Header = ({ textInput, setTextInput, searchCity }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    searchCity(textInput);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextInput(e.target.value);
  };

  //   const handleClick = () => {
  //     // setDisplayInput(!displayInput);
  //     console.log(refInput);
  //     // if (displayInput) {
  //     refInput.current.focus();
  //     // }
  //   };

  return (
    <header className="Header">
      <div className="wrapper">
        <div className="Header-container">
          <div className="Header-logo-container">
            <img className="Header-logo" src={logo} alt="MyWeather logo" />
            <h1>MyWeather</h1>
          </div>
          <form onSubmit={handleSubmit}>
            {/* {displayInput && ( */}
            <input
              className="Header-input"
              type="text"
              value={textInput}
              onChange={handleChange}
            />
            {/* )} */}
            <FontAwesomeIcon icon="search" size="lg" />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
