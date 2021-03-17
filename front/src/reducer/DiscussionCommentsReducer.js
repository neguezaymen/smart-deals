import {
  COMMENT_DISCUSSION_SUCCESS,
  COMMENT_DISCUSSION_FAIL,
  UPDATE_COMMENT_DISCUSSION_SUCCESS,
  UPDATE_COMMENT_DISCUSSION_FAIL,
  DELETE_COMMENT_DISCUSSION_SUCCESS,
  DELETE_COMMENT_DISCUSSION_FAIL,
  REPLY_DISCUSSION_SUCCESS,
  REPLY_DISCUSSION_FAIL,
  UPDATE_REPLY_DISCUSSION_SUCCESS,
  UPDATE_REPLY_DISCUSSION_FAIL,
  DELETE_REPLY_DISCUSSION_SUCCESS,
  DELETE_REPLY_DISCUSSION_FAIL,
  GET_COMMENT_DISCUSSION_SUCCESS,
  GET_COMMENT_DISCUSSION_FAIL,
  INIT_STATE,
} from "../actions/types";

let initState = {
  comments: [],
  error: [],
};

const DiscussionCommentsReducer = (state = initState, action) => {
  switch (action.type) {
    case COMMENT_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        error: [],
      };

    case COMMENT_DISCUSSION_FAIL:
      return {
        ...state,
        isComment: false,
        error: action.payload,
      };

    case REPLY_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: [...el.replies, action.payload],
            };
          }
          return el;
        }),
        error: [],
      };

    case REPLY_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_COMMENT_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.id) {
            return {
              ...el,
              text: action.payload.text,
            };
          }
          return el;
        }),
        error: [],
      };

    case UPDATE_COMMENT_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_REPLY_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: el.replies.map((r) => {
                if (r._id === action.payload.id) {
                  return {
                    ...r,
                    text: action.payload.text,
                  };
                }
                return r;
              }),
            };
          }
          return el;
        }),
        error: [],
      };

    case UPDATE_REPLY_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_COMMENT_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((el) => el._id !== action.payload.id),
        error: [],
      };

    case DELETE_COMMENT_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REPLY_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.comment) {
            return {
              ...el,
              replies: el.replies.filter((r) => r._id !== action.payload.id),
            };
          }
          return el;
        }),
        error: [],
      };

    case DELETE_REPLY_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMMENT_DISCUSSION_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: [],
      };

    case GET_COMMENT_DISCUSSION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case INIT_STATE:
      return {
        comments: [],
        error: [],
      };

    default:
      return state;
  }
};

export default DiscussionCommentsReducer;
