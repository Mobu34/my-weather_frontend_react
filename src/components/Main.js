import React from "react";
import "./Main.css";
import Item from "./Item";
import { connect } from "react-redux";

const Main = ({ favorites, data }) => {
  return (
    <main className="Main">
      <Item data={data} />
      {/* {favorites && <h3>Mes villes en favoris</h3>} */}
      {favorites.map((item) => {
        return <Item key={item.id} data={item} isFavorite={true} />;
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
