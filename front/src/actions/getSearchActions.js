import { GET_SEARCH } from "./types";

export const getSearch = (search) => {
  return { type: GET_SEARCH, payload: search };
};
