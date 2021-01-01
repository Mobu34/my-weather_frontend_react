const initialState = { favorites: [] };

const manageFavorites = (state = initialState, action) => {
  // console.log(action);
  let nextState;
  switch (action.type) {
    case "ADD":
      nextState = {
        ...state,
        favorites: [...state.favorites, action.value],
      };
      return nextState || state;

    case "DELETE":
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
