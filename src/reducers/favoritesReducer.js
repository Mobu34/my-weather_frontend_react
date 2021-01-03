const initialState = { favorites: [] };

const manageFavorites = (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case "ADD": // case triggers to add the city in favs
      nextState = {
        ...state,
        favorites: [...state.favorites, action.value],
      };
      return nextState || state;

    case "DELETE": // case triggers to remove the city from favs
      for (let i = 0; i < state.favorites.length; i++) {
        console.log(state.favorites[i]);
        if (state.favorites[i] === action.value) {
          state.favorites.splice(i, 1);
          nextState = {
            ...state,
            favorites: [...state.favorites],
          };
          break;
        }
      }
      return nextState || state;

    default:
      return state;
  }
};

export default manageFavorites;
