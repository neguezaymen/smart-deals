import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT,
  LOAD_PICTURE_SUCCESS,
  LOAD_IMAGE_SUCCESS,
  LOAD_IMAGE_FAIL,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
} from "./types";

import axios from "axios";
import setToken from "../setToken";
export const registerUser = (info) => (dispatch) => {
  axios
    .post("https://smart-deals-tunisie.herokuapp.com/signin", info)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      })
    );
};
export const updateUser = (img) => (dispatch) => {
  setToken();
  axios
    .put("https://smart-deals-tunisie.herokuapp.com/profile", img)
    .then((res) =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: err.response.data,
      })
    );
};

export const loadUser = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/login")
    .then((res) =>
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err,
      })
    );
};

export const loadImage = (img) => (dispatch) => {
  setToken();
  axios
    .post("https://smart-deals-tunisie.herokuapp.com/profile", img)
    .then((res) =>
      dispatch({
        type: LOAD_IMAGE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: LOAD_IMAGE_FAIL,
        payload: err,
      })
    );
};
export const loginUser = (data) => (dispatch) => {
  axios
    .post("https://smart-deals-tunisie.herokuapp.com/login", data)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => dispatch({ type: LOGIN_FAIL, payload: err.response.data }));
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
