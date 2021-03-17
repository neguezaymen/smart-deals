import {
  COMMENT_FAIL,
  COMMENT_SUCCESS,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_SUCCESS,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  REPLY_FAIL,
  REPLY_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_REPLY_FAIL,
  UPDATE_REPLY_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
} from "./types";
import axios from "axios";

export const postDealComment = (comment, id) => (dispatch) => {
  //id  deal
  axios
    .post("https://smart-deals-tunisie.herokuapp.com/comment/deal/" + id, {
      comment: comment,
    })

    .then((res) => {
      dispatch({
        type: COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const postDealReply = (reply, id) => (dispatch) => {
  axios
    .post(
      "https://smart-deals-tunisie.herokuapp.com/comment/deal/reply/" + id,
      { reply: reply }
    ) //id  commentaire mère
    .then((res) => {
      dispatch({
        type: REPLY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateDealComment = (comment, id) => (dispatch) => {
  //id  comment
  axios
    .put("https://smart-deals-tunisie.herokuapp.com/comment/deal/" + id, {
      comment: comment,
    })
    .then((res) =>
      dispatch({
        type: UPDATE_COMMENT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteDealComment = (id) => (dispatch) => {
  //id  comment

  axios
    .delete("https://smart-deals-tunisie.herokuapp.com/comment/deal/" + id)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const updateDealReply = (reply, id) => (dispatch) => {
  axios
    .put("https://smart-deals-tunisie.herokuapp.com/comment/deal/reply/" + id, {
      reply: reply,
    }) //id  reply
    .then((res) =>
      dispatch({
        type: UPDATE_REPLY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: UPDATE_REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const deleteDealReply = (id, commentId) => (dispatch) => {
  console.log(id, commentId);
  axios
    .delete(
      "https://smart-deals-tunisie.herokuapp.com/comment/deal/reply/" + id,
      { data: { commentId: commentId } }
    ) //id  reply
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_REPLY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: DELETE_REPLY_FAIL,
        payload: err.response.data.errors,
      })
    );
};

export const getDealComment = (id) => (dispatch) => {
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/comment/deal/" + id) //id  deal
    .then((res) => {
      dispatch({
        type: GET_COMMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_COMMENT_FAIL,
        payload: err.response.data.errors,
      })
    );
};
