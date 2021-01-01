import React, { useState } from "react";
import "./SearchResult.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Item from "./Item";

const SearchResult = ({ data, setIsSearch, setTextInput }) => {
  const [showDetails, setShowDetails] = useState(null);
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
      <Item
        data={data}
        setIsSearch={setIsSearch}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        setTextInput={setTextInput}
      />
    </div>
  );
};

export default SearchResult;
