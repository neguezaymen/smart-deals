import {
  GET_FOOTER_DEALS_SUCCESS,
  GET_FOOTER_DEALS_FAIL,
  GET_FOOTER_DISCUSSIONS_SUCCESS,
  GET_FOOTER_DISCUSSIONS_FAIL,
  GET_FOOTER_COMMENTS_DEALS_SUCCESS,
  GET_FOOTER_COMMENTS_DEALS_FAIL,
  GET_FOOTER_COMMENTS_DISCUSSIONS_SUCCESS,
  GET_FOOTER_COMMENTS_DISCUSSIONS_FAIL,
  GET_FOOTER_USERS_SUCCESS,
  GET_FOOTER_USERS_FAIL,
  GET_FOOTER_REPLIES_COMMENTS_SUCCESS,
  GET_FOOTER_REPLIES_COMMENTS_FAIL,
} from "../actions/types";

let initState = {
  deals: null,
  discussions: null,
  dealsComments: null,
  discussionsComments: null,
  errors: null,
  users: null,
  replies: null,
};

const footerInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_FOOTER_DEALS_SUCCESS:
      return {
        ...state,
        deals: action.payload,
        errors: null,
      };
    case GET_FOOTER_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        errors: null,
      };
    case GET_FOOTER_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussions: action.payload,
        errors: null,
      };
    case GET_FOOTER_COMMENTS_DISCUSSIONS_SUCCESS:
      return {
        ...state,
        discussionsComments: action.payload,
        errors: null,
      };
    case GET_FOOTER_COMMENTS_DEALS_SUCCESS:
      return {
        ...state,
        dealsComments: action.payload,
        errors: null,
      };
    case GET_FOOTER_REPLIES_COMMENTS_SUCCESS:
      return {
        ...state,
        replies: action.payload,
        errors: null,
      };

    case GET_FOOTER_DEALS_FAIL:
    case GET_FOOTER_REPLIES_COMMENTS_FAIL:
    case GET_FOOTER_USERS_FAIL:
    case GET_FOOTER_DISCUSSIONS_FAIL:
    case GET_FOOTER_COMMENTS_DEALS_FAIL:
    case GET_FOOTER_COMMENTS_DISCUSSIONS_FAIL:
      return {
        ...state,

        errors: action.payload,
      };

    default:
      return state;
  }
};

export default footerInfoReducer;
