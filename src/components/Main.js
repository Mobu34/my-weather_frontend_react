import React from "react";
import Item from "./Item";

const Main = ({ API, weatherCurrentPosition, coords }) => {
  return (
    <main className="Main">
      <div className="wrapper">
        <Item weatherCurrentPosition={weatherCurrentPosition} />
      </div>
    </main>
  );
};

export default Main;
