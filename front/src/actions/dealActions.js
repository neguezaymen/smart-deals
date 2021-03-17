import {
  POST_DEAL_SUCCESS,
  POST_DEAL_FAIL,
  GET_DEAL_SUCCESS,
  GET_DEAL_FAIL,
} from "./types";
import setToken from "../setToken";

import axios from "axios";
export const postDeal = (deal, history) => (dispatch) => {
  setToken();
  axios
    .post("https://smart-deals-tunisie.herokuapp.com/post/post-deal", deal)
    .then((res) => {
      history.push("/bon-plans");
      dispatch({
        type: POST_DEAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: POST_DEAL_FAIL,
        payload: err.response.data,
      })
    );
};

export const getDeal = (id) => (dispatch) => {
  axios
    .get(`https://smart-deals-tunisie.herokuapp.com/bon-plans/${id}`, {
      params: { id: id },
    })
    .then((res) => {
      dispatch({
        type: GET_DEAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_DEAL_FAIL,
        payload: err.response.data,
      })
    );
};
