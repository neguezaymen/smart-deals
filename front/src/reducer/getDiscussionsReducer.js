import { GET_ALL_DISCUSSIONS_SUCCESS } from "../actions/types";

let discussions = { allDiscussions: null, discussionsLoaded: false };
const getDiscussionsReducer = (state = discussions, action) => {
  switch (action.type) {
    case GET_ALL_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        allDiscussions: action.payload,
        discussionsLoaded: true,
      };

    default:
      return state;
  }
};

export default getDiscussionsReducer;
