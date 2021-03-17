import { GET_ALL_DEALS_SUCCESS } from "../actions/types";

let deals = { allDeals: null, dealsLoaded: false };
const getDealsReducer = (state = deals, action) => {
  switch (action.type) {
    case GET_ALL_DEALS_SUCCESS:
      return { ...state, allDeals: action.payload, dealsLoaded: true };

    default:
      return state;
  }
};

export default getDealsReducer;
