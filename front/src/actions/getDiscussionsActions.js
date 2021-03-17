import { GET_ALL_DISCUSSIONS_SUCCESS, GET_ALL_DISCUSSIONS_FAIL } from "./types";
import setToken from "../setToken";

import axios from "axios";
export const getAllDiscussions = () => (dispatch) => {
  setToken();
  axios
    .get(
      "https://smart-deals-tunisie.herokuapp.com/discussions/get-all-discussions"
    )
    .then((res) =>
      dispatch({
        type: GET_ALL_DISCUSSIONS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ALL_DISCUSSIONS_FAIL,
        payload: err,
      })
    );
};
