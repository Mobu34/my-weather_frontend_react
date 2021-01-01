import React, { useState, useEffect } from "react";
import "./Main.css";
import Item from "./Item";
import { connect } from "react-redux";
import axios from "axios";

const Main = ({ favorites, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    if (favorites.length > 0) {
      (async () => {
        try {
          const response = await axios.post(
            `http://localhost:3001/weather/favorites`,
            {
              favorites,
            }
          );

          if (response.status === 200) {
            setFavs(response.data);
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [favorites]);

  // console.log(favs);

  return (
    <main className="Main">
      <Item
        data={data}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
      {favorites.length > 0 &&
        (isLoading ? (
          <span>Chargement en cours ...</span>
        ) : (
          favs.list.map((item) => {
            return (
              <Item
                key={item.id}
                data={item}
                isFavorite={true}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
              />
            );
          })
        ))}
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps)(Main);
