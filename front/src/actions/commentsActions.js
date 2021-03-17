import {
  POST_DEAL_COMMENT_SUCCESS,
  POST_DEAL_COMMENT_FAIL,
  GET_DEAL_COMMENT_SUCCESS,
  GET_DEAL_COMMENT_FAIL,
  POST_DISCUSSION_COMMENT_SUCCESS,
  POST_DISCUSSION_COMMENT_FAIL,
  GET_DISCUSSION_COMMENT_SUCCESS,
  GET_DISCUSSION_COMMENT_FAIL,
} from "./types";
import setToken from "../setToken";

import axios from "axios";
export const postDealComment = (comment, dealId, owner) => (dispatch) => {
  setToken();
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/comments/deal/post-comment",
      comment,
      dealId,
      owner
    )
    .then((res) => {
      dispatch({
        type: POST_DEAL_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: POST_DEAL_COMMENT_FAIL,
        payload: err.response.data,
      })
    );
};

export const getDealComments = (dealId) => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/comments/deal/get-comments",
      { params: { id: dealId } }
    )
    .then((res) => {
      dispatch({
        type: GET_DEAL_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_DEAL_COMMENT_FAIL,
        payload: err.response.data,
      })
    );
};

export const postDiscussionComment = (comment, discussionId, owner) => (
  dispatch
) => {
  setToken();
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/comments/discussion/post-comment",
      comment,
      discussionId,
      owner
    )
    .then((res) => {
      dispatch({
        type: POST_DISCUSSION_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: POST_DISCUSSION_COMMENT_FAIL,
        payload: err.response.data,
      })
    );
};

export const getDiscussionComments = (discussionId) => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/comments/discussion/get-comments",
      { params: { id: discussionId } }
    )
    .then((res) => {
      dispatch({
        type: GET_DISCUSSION_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_DISCUSSION_COMMENT_FAIL,
        payload: err.response.data,
      })
    );
};
