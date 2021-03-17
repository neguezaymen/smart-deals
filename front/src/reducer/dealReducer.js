import {
  POST_DEAL_FAIL,
  POST_DEAL_SUCCESS,
  GET_DEAL_SUCCESS,
  GET_DEAL_FAIL,
  INIT_STATE,
} from "../actions/types";

let initState = {
  deal: null,
  postStatus: null,
  errors: null,
  getdeal: null,
  getStatus: null,
};

const dealReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_DEAL_SUCCESS:
      return { ...state, deal: action.payload, postStatus: true };
    case GET_DEAL_SUCCESS:
      return { ...state, getdeal: action.payload, getStatus: true };

    case POST_DEAL_FAIL:
      return { ...state, postStatus: false, errors: action.payload };
    case GET_DEAL_FAIL:
      return { ...state, getStatus: false, errors: action.payload };
    case INIT_STATE:
      return {
        deal: null,
        postStatus: null,
        errors: null,
        getdeal: null,
        getStatus: null,
      };
    default:
      break;
  }
  return state;
};

export default dealReducer;
