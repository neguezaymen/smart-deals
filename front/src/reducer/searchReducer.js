import { GET_SEARCH } from "../actions/types";
const initialState = {
  search: "",
  searchLoaded: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SEARCH":
      return {
        ...state,
        search: action.payload,
        searchLoaded: true,
      };

    default:
      return state;
  }
};

export default searchReducer;
