const initialState = { favorites: [] };

const manageFavorites = (state = initialState, action) => {
  let nextState;
  console.log(action);
  switch (action.type) {
    case "ADD":
      nextState = {
        ...state,
        favorites: [...state.favorites, action.value],
      };
      return nextState || state;

    case "DELETE":
      for (let i = 0; i < state.favorites.length; i++) {
        if (state.favorites[i].id === action.value.id) {
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
