import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import Item from "./Item";
import { connect } from "react-redux";
import axios from "axios";

import ThemeContext from "../context/ThemeContext";

const Main = ({ favorites, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

  const theme = useContext(ThemeContext);

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

          console.log("response =", response.data);

          if (response.status === 200) {
            setFavs(response.data);
            for (let i = 0; i < response.data.list.length; i++) {
              if (response.data.list[i].id === data.id) {
                setIsCurrentFavorite(true);
              } else if (isCurrentFavorite) {
                setIsCurrentFavorite(false);
              }
            }
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    } else if (isCurrentFavorite) {
      setIsCurrentFavorite(false);
    }
  }, [favorites]);

  // console.log("data =", data);

  return (
    <main className={theme.name === "night" ? "Main-night" : "Main-day"}>
      <Item
        data={data}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        isFavorite={isCurrentFavorite}
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
