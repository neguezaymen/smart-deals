import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  GET_USER_DEALS_SUCCESS,
  GET_USER_DEALS_FAIL,
  GET_USER_DISCUSSIONS_SUCCESS,
  GET_USER_DISCUSSIONS_FAIL,
  DELETE_USER_DISCUSSION_FAIL,
  DELETE_USER_DISCUSSION_SUCCESS,
  DELETE_USER_DEAL_SUCCESS,
  DELETE_USER_DEAL_FAIL,
  UPDATE_PROFILE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_PASSWORD_FAIL,
  DELETE_USER_DEALS_SUCCESS,
  DELETE_USER_DEALS_FAIL,
  DELETE_USER_DISCUSSIONS_SUCCESS,
  DELETE_USER_DISCUSSIONS_FAIL,
} from "../actions/types";
let initState = {
  token: localStorage.getItem("token"),
  newUserInfo: {},
  isUpdated: false,
  errors: null,
  userDeals: [],
  userDiscussions: [],
  isDeleted: false,
  passwordUpdated: null,
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        newUserInfo: action.payload,
        errors: null,
        isUpdated: true,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        newUserInfo: action.payload,
        errors: null,
      };
    case GET_USER_DEALS_SUCCESS:
      return {
        ...state,
        userDeals: action.payload,
        errors: null,
      };
    case UPDATE_PROFILE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordUpdated: action.payload,
        errors: null,
      };
    case GET_USER_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        userDiscussions: action.payload,
        errors: null,
      };
    case DELETE_USER_DEAL_SUCCESS:
      return {
        ...state,
        isDeleted: true,

        errors: null,
      };
    case DELETE_USER_DISCUSSIONS_SUCCESS:
    case DELETE_USER_DEALS_SUCCESS:
      return {
        ...state,
        isDeleted: true,

        errors: null,
      };
    case DELETE_USER_DISCUSSION_SUCCESS:
      return {
        ...state,
        isDeleted: true,

        errors: null,
      };

    case DELETE_USER_DEALS_FAIL:
    case DELETE_USER_DISCUSSIONS_FAIL:
    case UPDATE_PROFILE_PASSWORD_FAIL:
    case DELETE_USER_DISCUSSION_FAIL:
    case DELETE_USER_DEAL_FAIL:
    case UPDATE_PROFILE_FAIL:
    case DELETE_PROFILE_FAIL:
    case GET_USER_DEALS_FAIL:
    case GET_USER_DISCUSSIONS_FAIL:
      return {
        ...state,

        errors: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
