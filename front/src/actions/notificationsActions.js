import {
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "./types";
import setToken from "../setToken";

import axios from "axios";
export const addNotification = (notification, id) => (dispatch) => {
  setToken();

  axios
    .post("https://smart-deals-tunisie.herokuapp.com/notifications", {
      notification,
      id,
    })
    .then((res) =>
      dispatch({
        type: ADD_NOTIFICATION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: ADD_NOTIFICATION_FAIL,
        payload: err,
      })
    );
};

export const getNotifications = () => (dispatch) => {
  setToken();

  axios
    .get("https://smart-deals-tunisie.herokuapp.com/notifications")
    .then((res) =>
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_NOTIFICATION_FAIL,
        payload: err,
      })
    );
};
