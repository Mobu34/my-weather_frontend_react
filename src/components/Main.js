import React, { useState } from "react";
import "./Main.css";
import Item from "./Item";
import { connect } from "react-redux";

const Main = ({ favorites, data }) => {
  const [showDetails, setShowDetails] = useState(null);

  return (
    <main className="Main">
      <Item
        data={data}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      {favorites.map((item) => {
        return (
          <Item
            key={item.id}
            data={item}
            isFavorite={true}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
        );
      })}
    </main>
  );
};

const mapStateToProps = (state) => {
  console.log(state.favorites);
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(Main);
