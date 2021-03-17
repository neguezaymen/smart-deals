import {
  POST_DEAL_COMMENT_SUCCESS,
  POST_DEAL_COMMENT_FAIL,
  GET_DEAL_COMMENT_SUCCESS,
  GET_DEAL_COMMENT_FAIL,
  POST_DISCUSSION_COMMENT_SUCCESS,
  POST_DISCUSSION_COMMENT_FAIL,
  GET_DISCUSSION_COMMENT_SUCCESS,
  GET_DISCUSSION_COMMENT_FAIL,
} from "../actions/types";

let initState = {
  dealComment: null,
  discussionComment: null,
  postStatus: false,
  errors: null,
  dealComments: null,
  discussionComments: null,
  getStatus: false,
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_DEAL_COMMENT_SUCCESS:
      return { ...state, dealComment: action.payload, postStatus: true };
    case POST_DISCUSSION_COMMENT_SUCCESS:
      return { ...state, discussionComment: action.payload, postStatus: true };
    case GET_DEAL_COMMENT_SUCCESS:
      return { ...state, dealComments: action.payload, getStatus: true };
    case GET_DISCUSSION_COMMENT_SUCCESS:
      return { ...state, discussionComments: action.payload, getStatus: true };
    case GET_DEAL_COMMENT_FAIL:
    case POST_DISCUSSION_COMMENT_FAIL:
    case GET_DISCUSSION_COMMENT_FAIL:
    case POST_DEAL_COMMENT_FAIL:
      return { ...state, postStatus: false, errors: action.payload };

    default:
      break;
  }
  return state;
};

export default commentReducer;
