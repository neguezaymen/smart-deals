import {
  POST_DISCUSSION_SUCCESS,
  GET_DISCUSSION_SUCCESS,
  GET_DISCUSSION_FAIL,
} from "../actions/types";

let initState = [
  {
    titre: "",
    description: "",
    groupe: "",
    getStatus: null,
    owner: null,
    getdiscussion: null,
    userAvatar: "",
    userPseudo: "",
  },
];
const discussionReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_DISCUSSION_SUCCESS:
      return [...state, action.payload];
    case GET_DISCUSSION_SUCCESS:
      return { ...state, getdiscussion: action.payload, getStatus: true };
    case GET_DISCUSSION_FAIL:
      return { ...state, getStatus: false, errors: action.payload };
    default:
      break;
  }
  return state;
};

export default discussionReducer;
