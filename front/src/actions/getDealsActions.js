import { GET_ALL_DEALS_SUCCESS, GET_ALL_DEALS_FAIL } from "./types";
import setToken from "../setToken";

import axios from "axios";
export const getAllDeals = () => (dispatch) => {
  setToken();
  axios
    .get("https://smart-deals-tunisie.herokuapp.com/post/get-all-deals")
    .then((res) =>
      dispatch({
        type: GET_ALL_DEALS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ALL_DEALS_FAIL,
        payload: err,
      })
    );
};
