import React, { useState, useEffect } from "react";
import "./Details.css";

const Details = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="Details">
      {isLoading ? "Chargement en cours ..." : data.name}
    </div>
  );
};

export default Details;
