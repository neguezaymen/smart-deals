import { LOAD_PICTURE_SUCCESS } from "./types";

const pictureSrc = (payload) => {
  return {
    type: LOAD_PICTURE_SUCCESS,
    payload,
  };
};

export default pictureSrc;
