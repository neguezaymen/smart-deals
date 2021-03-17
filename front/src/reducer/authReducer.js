import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_IMAGE_SUCCESS,
  LOAD_IMAGE_FAIL,
  LOGOUT,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errors: null,
        isAuth: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        errors: null,
        isAuth: true,
      };
    case LOAD_IMAGE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, avatar: action.payload },
        errors: null,
        isAuth: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        errors: null,
      };
    case UPDATE_USER_FAIL:
    case LOAD_USER_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        errors: action.payload,
      };
    case LOAD_IMAGE_FAIL:
      return {
        ...state,

        errors: null,
        isAuth: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { isAuth: false, errors: null, user: null };
    default:
      return state;
  }
};

export default AuthReducer;
