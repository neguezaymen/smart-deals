import {
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "../actions/types";
const initialState = {
  isPosted: false,
  notifications: [
    {
      update: "",
      timestamp: 0,
    },
  ],
  errors: null,
  isGetted: false,
  isChanged: false,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,

        isPosted: true,
        isChanged: !state.isChanged,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isGetted: true,
      };
    case ADD_NOTIFICATION_FAIL:
    case GET_NOTIFICATION_FAIL:
      return {
        ...state,

        errors: action.payload,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
