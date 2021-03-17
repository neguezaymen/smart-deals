import {
  GET_FOOTER_DEALS_SUCCESS,
  GET_FOOTER_DEALS_FAIL,
  GET_FOOTER_DISCUSSIONS_SUCCESS,
  GET_FOOTER_DISCUSSIONS_FAIL,
  GET_FOOTER_COMMENTS_DEALS_SUCCESS,
  GET_FOOTER_COMMENTS_DEALS_FAIL,
  GET_FOOTER_COMMENTS_DISCUSSIONS_SUCCESS,
  GET_FOOTER_COMMENTS_DISCUSSIONS_FAIL,
  GET_FOOTER_USERS_SUCCESS,
  GET_FOOTER_USERS_FAIL,
  GET_FOOTER_REPLIES_COMMENTS_SUCCESS,
  GET_FOOTER_REPLIES_COMMENTS_FAIL,
} from "./types";
import setToken from "../setToken";
import axios from "axios";

export const getFooterInfoDeals = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/footerinfo/deals")
    .then((res) =>
      dispatch({
        type: GET_FOOTER_DEALS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_DEALS_FAIL,
        payload: err.response.data,
      })
    );
};
export const getFooterInfoUsers = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/footerinfo/users")
    .then((res) =>
      dispatch({
        type: GET_FOOTER_USERS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_USERS_FAIL,
        payload: err.response.data,
      })
    );
};
export const getFooterInfoDiscussions = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/footerinfo/discussions")
    .then((res) =>
      dispatch({
        type: GET_FOOTER_DISCUSSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_DISCUSSIONS_FAIL,
        payload: err.response.data,
      })
    );
};

export const getFooterInfoDiscussionsComments = () => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/footerinfo/discussions-comments"
    )
    .then((res) =>
      dispatch({
        type: GET_FOOTER_COMMENTS_DISCUSSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_COMMENTS_DISCUSSIONS_FAIL,
        payload: err.response.data,
      })
    );
};

export const getFooterInfoDealsComments = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/footerinfo/deals-comments")
    .then((res) =>
      dispatch({
        type: GET_FOOTER_COMMENTS_DEALS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_COMMENTS_DEALS_FAIL,
        payload: err.response.data,
      })
    );
};

export const getFooterInfoReplies = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/footerinfo/replies")
    .then((res) =>
      dispatch({
        type: GET_FOOTER_REPLIES_COMMENTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FOOTER_REPLIES_COMMENTS_FAIL,
        payload: err.response.data,
      })
    );
};
