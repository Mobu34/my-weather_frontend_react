import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import Item from "./Item";
import { connect } from "react-redux";
import axios from "axios";
import uid2 from "uid2";

import ThemeContext from "../context/ThemeContext";

const Main = ({ favorites, API, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favs, setFavs] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(false);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (favorites.length > 0) {
      // if there are some favorites, a request is triggers to get weather data for all cities in favs
      (async () => {
        try {
          const response = await axios.post(`${API}/weather/favorites`, {
            favorites,
          });

          if (response.status === 200) {
            for (let i = 0; i < response.data.cnt; i++) {
              response.data.list[i].new_id = uid2(16); // here we create a unique id as a workaround when we set the current location as favs and show the details
            }
            setFavs(response.data);
            for (let i = 0; i < response.data.cnt; i++) {
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
  }, [API, data.id, favorites, isCurrentFavorite]);

  return (
    <main className={theme.name === "night" ? "Main-night" : "Main-day"}>
      {data.dt ? (
        <Item
          API={API}
          data={data}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          isFavorite={isCurrentFavorite}
        />
      ) : (
        <div className="Main-unknownposition">
          Votre position n'est pas connu
        </div>
      )}
      {favorites.length > 0 &&
        (isLoading ? (
          <div className="Main-favorites-loader">
            Chargement des favoris en cours ...
          </div>
        ) : (
          favs.list.map((item) => {
            return (
              <Item
                API={API}
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
