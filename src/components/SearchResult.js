import React from "react";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Item from "./Item";

const SearchResult = ({ data, setIsSearch, setTextInput }) => {
  const handleClick = () => {
    setIsSearch(false);
    setTextInput("");
  };

  return (
    <div className="SearchResult">
      <div className="SearchResult-title-container">
        <div></div>
        <h3>Résultat de la recherche</h3>
        <FontAwesomeIcon icon="times" onClick={handleClick} />
      </div>
      <Item data={data} setIsSearch={setIsSearch} />
    </div>
  );
};

export default SearchResult;
