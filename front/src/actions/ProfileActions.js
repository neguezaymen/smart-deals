import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_SUCCESS,
  GET_USER_DEALS_SUCCESS,
  GET_USER_DEALS_FAIL,
  GET_USER_DISCUSSIONS_SUCCESS,
  GET_USER_DISCUSSIONS_FAIL,
  DELETE_USER_DEALS_SUCCESS,
  DELETE_USER_DEALS_FAIL,
  DELETE_USER_DISCUSSIONS_SUCCESS,
  DELETE_USER_DISCUSSIONS_FAIL,
  DELETE_USER_DISCUSSION_FAIL,
  DELETE_USER_DISCUSSION_SUCCESS,
  DELETE_USER_DEAL_SUCCESS,
  DELETE_USER_DEAL_FAIL,
  UPDATE_PROFILE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_PASSWORD_FAIL,
} from "./types";
import setToken from "../setToken";
import axios from "axios";

export const updateProfile = (newUserInfo) => (dispatch) => {
  setToken();
  axios
    .put(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile",
      newUserInfo
    )
    .then((res) =>
      dispatch({
        type: UPDATE_PROFILE_PASSWORD_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_PROFILE_PASSWORD_FAIL,
        payload: err.response.data,
      })
    );
};

export const updateProfilePassword = (
  actualPassword,
  newPassword,
  confirmPassword
) => (dispatch) => {
  setToken();
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile/password",
      {
        actualPassword: actualPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }
    )
    .then((res) =>
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: err.response.data,
      })
    );
};

export const deleteProfile = (user) => (dispatch) => {
  setToken();
  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile",
      user
    )
    .then((res) =>
      dispatch({
        type: DELETE_PROFILE_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_PROFILE_FAIL,
        payload: err.response.data,
      })
    );
};

export const getUserDeals = (user) => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile/deals",
      user
    )
    .then((res) =>
      dispatch({
        type: GET_USER_DEALS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_DEALS_FAIL,
        payload: err.response.data,
      })
    );
};

export const getUserDiscussions = (user) => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile/discussions",
      user
    )
    .then((res) =>
      dispatch({
        type: GET_USER_DISCUSSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_DISCUSSIONS_FAIL,
        payload: err.response.data,
      })
    );
};

export const deleteUserDeal = (id) => (dispatch) => {
  setToken();

  axios
    .delete(
      `https://smart-deals-tunisie.herokuapp.com/profile/mes-deals/${id}`,
      { params: { id: id } }
    )
    .then((res) => {
      dispatch({
        type: DELETE_USER_DEAL_SUCCESS,
        payload: res.data,
      });
      // alert("Votre Deal a été supprimé");
    })
    .catch((err) => {
      dispatch({
        type: DELETE_USER_DEAL_FAIL,
        payload: err.response.data,
      });
    });
};

export const deleteUserDiscussion = (id) => (dispatch) => {
  setToken();

  axios
    .delete(
      `https://smart-deals-tunisie.herokuapp.com/profile/mes-discussions/${id}`,
      { params: { id: id } }
    )
    .then((res) => {
      dispatch({
        type: DELETE_USER_DISCUSSION_SUCCESS,
        payload: res.data,
      });
      // alert("Votre Deal a été supprimé");
    })
    .catch((err) => {
      dispatch({
        type: DELETE_USER_DISCUSSION_FAIL,
        payload: err.response.data,
      });
    });
};

export const deleteUserDeals = () => (dispatch) => {
  setToken();
  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile/deals"
    )
    .then((res) =>
      dispatch({
        type: DELETE_USER_DISCUSSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_USER_DISCUSSIONS_FAIL,
        payload: err.response.data,
      })
    );
};

export const deleteUserDiscussions = () => (dispatch) => {
  setToken();
  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/profile/editer-profile/discussions"
    )
    .then((res) =>
      dispatch({
        type: DELETE_USER_DEALS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: DELETE_USER_DEALS_FAIL,
        payload: err.response.data,
      })
    );
};
