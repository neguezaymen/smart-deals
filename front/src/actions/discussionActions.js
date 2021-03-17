import {
  POST_DISCUSSION_SUCCESS,
  POST_DISCUSSION_FAIL,
  GET_DISCUSSION_SUCCESS,
  GET_DISCUSSION_FAIL,
} from "./types";
import setToken from "../setToken";

import axios from "axios";
export const postDiscussion = (deal, history) => (dispatch) => {
  setToken();
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/post/post-discussion",
      deal
    )
    .then((res) => {
      history.push("/discussions");
      dispatch({
        type: POST_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: POST_DISCUSSION_FAIL,
        payload: err.response.data,
      })
    );
};

export const getDiscussion = (id) => (dispatch) => {
  axios
    .get(`https://smart-deals-tunisie.herokuapp.com/discussions/${id}`, {
      params: { id: id },
    })
    .then((res) => {
      dispatch({
        type: GET_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_DISCUSSION_FAIL,
        payload: err.response.data,
      })
    );
};
