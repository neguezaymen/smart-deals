import {
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,
  GET_USER_PROFILE_DISCUSSIONS_SUCCESS,
  GET_USER_PROFILE_DISCUSSIONS_FAIL,
  GET_USER_PROFILE_DEALS_FAIL,
  GET_USER_PROFILE_DEALS_SUCCESS,
} from "./types";
import setToken from "../setToken";
import axios from "axios";

export const getUserInfo = (id) => (dispatch) => {
  axios
    .get(`https://smart-deals-tunisie.herokuapp.com/user/${id}`, {
      params: { id: id },
    })
    .then((res) => {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_INFO_FAIL,
        payload: err.response.data,
      });
    });
};
export const getUserProfileDeals = (id) => (dispatch) => {
  axios
    .get(`https://smart-deals-tunisie.herokuapp.com/user/${id}/deals`, {
      params: { id: id },
    })
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_PROFILE_DEALS_FAIL,
        payload: err.response.data,
      });
    });
};

export const getUserProfileDiscussions = (id) => (dispatch) => {
  axios
    .get(`https://smart-deals-tunisie.herokuapp.com/user/${id}/discussions`, {
      params: { id: id },
    })
    .then((res) => {
      dispatch({
        type: GET_USER_PROFILE_DISCUSSIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_PROFILE_DISCUSSIONS_FAIL,
        payload: err.response.data,
      });
    });
};
