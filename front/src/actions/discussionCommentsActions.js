import {
  COMMENT_DISCUSSION_SUCCESS,
  COMMENT_DISCUSSION_FAIL,
  UPDATE_COMMENT_DISCUSSION_SUCCESS,
  UPDATE_COMMENT_DISCUSSION_FAIL,
  DELETE_COMMENT_DISCUSSION_SUCCESS,
  DELETE_COMMENT_DISCUSSION_FAIL,
  REPLY_DISCUSSION_SUCCESS,
  REPLY_DISCUSSION_FAIL,
  UPDATE_REPLY_DISCUSSION_SUCCESS,
  UPDATE_REPLY_DISCUSSION_FAIL,
  DELETE_REPLY_DISCUSSION_SUCCESS,
  DELETE_REPLY_DISCUSSION_FAIL,
  GET_COMMENT_DISCUSSION_SUCCESS,
  GET_COMMENT_DISCUSSION_FAIL,
} from "./types";
import axios from "axios";

export const postDiscussionComment = (comment, id) => (dispatch) => {
  //id  deal
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/comment/discussion/" + id,
      { comment: comment }
    )

    .then((res) => {
      dispatch({
        type: COMMENT_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: COMMENT_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const postDiscussionReply = (reply, id) => (dispatch) => {
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/comment/discussion/reply/" +
        id,
      { reply: reply }
    ) //id  commentaire mère
    .then((res) => {
      dispatch({
        type: REPLY_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REPLY_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateDiscussionComment = (comment, id) => (dispatch) => {
  //id  comment
  axios
    .put("https://smart-deals-tunisie.herokuapp.com/comment/discussion/" + id, {
      comment: comment,
    })
    .then((res) =>
      dispatch({
        type: UPDATE_COMMENT_DISCUSSION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_COMMENT_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteDiscussionComment = (id) => (dispatch) => {
  //id  comment

  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/comment/discussion/" + id
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_COMMENT_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_COMMENT_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateDiscussionReply = (reply, id) => (dispatch) => {
  axios
    .put(
      "https://smart-deals-tunisie.herokuapp.com/comment/discussion/reply/" +
        id,
      { reply: reply }
    ) //id  reply
    .then((res) =>
      dispatch({
        type: UPDATE_REPLY_DISCUSSION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_REPLY_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteDiscussionReply = (id, commentId) => (dispatch) => {
  console.log(id, commentId);
  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/comment/discussion/reply/" +
        id,
      {
        data: { commentId: commentId },
      }
    ) //id  reply
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_REPLY_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_REPLY_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const getDiscussionComment = (id) => (dispatch) => {
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/comment/discussion/" + id) //id  deal
    .then((res) => {
      dispatch({
        type: GET_COMMENT_DISCUSSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_COMMENT_DISCUSSION_FAIL,
        payload: err.response.data.errors,
      })
    );
};
