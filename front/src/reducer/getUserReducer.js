import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  INIT_STATE,
  GET_USER_PROFILE_DISCUSSIONS_SUCCESS,
  GET_USER_PROFILE_DISCUSSIONS_FAIL,
  GET_USER_PROFILE_DEALS_FAIL,
  GET_USER_PROFILE_DEALS_SUCCESS,
} from "../actions/types";
let initState = {
  userInfo: null,
  getStatus: false,
  errors: null,
  deals: null,
  discussions: null,
};

const getUserReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        errors: null,
        getStatus: true,
      };
    case GET_USER_PROFILE_DEALS_SUCCESS:
      return {
        ...state,
        deals: action.payload,
        errors: null,
        getStatus: true,
      };
    case GET_USER_PROFILE_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload,
        errors: null,
        getStatus: true,
      };
    case GET_USER_PROFILE_DISCUSSIONS_FAIL:
    case GET_USER_PROFILE_DEALS_FAIL:
    case GET_USER_INFO_FAIL:
      return {
        ...state,

        errors: action.payload,
      };
    case INIT_STATE:
      return {
        userInfo: null,
        getStatus: false,
        errors: null,
      };
    default:
      return state;
  }
};

export default getUserReducer;
