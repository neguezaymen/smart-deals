import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/commentContainer.css";

import { Editor, EditorState, getDefaultKeyBinding } from "draft-js";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../../node_modules/draft-js/dist/Draft.css";
import Comment from "./Comment";
import DealPageModel from "./DealPageModel";
import { ADD_NOTIFICATION_FAIL } from "../actions/types";
import { addNotification } from "../actions/notificationsActions";

const CommentsContainer = ({
  deal,
  id,
  comments,
  postDealComment,
  deleteDealComment,
  postDealReply,
  updateDealComment,
  updateDealReply,
  deleteDealReply,
}) => {
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const addComment = useRef();
  const [addCommentEditorState, setAddCommentEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [addCommentInstructions, setAddCommentInstructions] = useState(false);
  const handleCommentKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        postDealComment(
          addCommentEditorState.getCurrentContent().getPlainText(),
          id
        )
      );
      setAddCommentInstructions(false);
      setAddCommentEditorState(EditorState.createEmpty());
      if (auth.user._id !== deal.getdeal.owner) {
        dispatch(
          addNotification(
            {
              update:
                auth.user &&
                auth.user.pseudo +
                  " a commenté votre Deal (" +
                  deal.getdeal.titre.slice(0, 30) +
                  "..." +
                  ") " +
                  " ** " +
                  addCommentEditorState
                    .getCurrentContent()
                    .getPlainText()
                    .slice(0, 100) +
                  "..." +
                  " ** ",
              timestamp: Date.now(),
            },
            deal.getdeal.owner
          )
        );
      }

      return "handled";
    } else {
      if (command === "cancel") {
        setAddCommentEditorState(EditorState.createEmpty());
        setAddCommentInstructions(false);
        return "handled";
      }
    }
    return "not-handled";
  };
  const save = () => {
    dispatch(
      postDealComment(
        addCommentEditorState.getCurrentContent().getPlainText(),
        id
      )
    );
    if (auth.user._id !== deal.getdeal.owner) {
      dispatch(
        addNotification(
          {
            update:
              auth.user &&
              auth.user.pseudo +
                " a commenté votre Deal (" +
                deal.getdeal.titre.slice(0, 30) +
                "..." +
                ") " +
                " ** " +
                addCommentEditorState
                  .getCurrentContent()
                  .getPlainText()
                  .slice(0, 100) +
                "..." +
                " ** ",
            timestamp: Date.now(),
          },
          deal.getdeal.owner
        )
      );
    }
    setAddCommentInstructions(false);
    setAddCommentEditorState(EditorState.createEmpty());
    return "handled";
  };
  const commentKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  useEffect(() => {
    if (auth.isAuth && !addCommentInstructions) {
      addComment.current.blur();
    }
  }, [auth, addCommentInstructions]);

  const handleBlur = () => {
    if (!addCommentEditorState.getCurrentContent().getPlainText()) {
      setAddCommentInstructions(false);
    }
  };
  return (
    <div>
      {comments.map((el, i) => (
        <Comment
          deal={deal}
          key={i}
          commenterId={el.owner._id}
          commentId={el._id}
          avatarCommenter={el.owner.avatar}
          commenter={el.owner.pseudo}
          comment={el.text}
          commentTime={el.create__at}
          replies={el.replies}
          deleteDealComment={deleteDealComment}
          postDealReply={postDealReply}
          updateDealComment={updateDealComment}
          updateDealReply={updateDealReply}
          deleteDealReply={deleteDealReply}
        />
      ))}
      {auth.isAuth && (
        <div className="addComment">
          <div className="addComment__left">
            <Link to={"/user/" + auth.user._id}>
              <div>
                <Avatar className="addComment__avatar" src={auth.user.avatar} />
              </div>
            </Link>
          </div>
          <div className="addComment__right">
            <div className="addCommentContent__top">
              <Editor
                ref={addComment}
                onFocus={() => setAddCommentInstructions(true)}
                onBlur={handleBlur}
                className="addComment__body"
                editorState={addCommentEditorState}
                placeholder="Ecrire votre commentaire..."
                onChange={setAddCommentEditorState}
                handleKeyCommand={handleCommentKeyCommand}
                keyBindingFn={commentKeyBindingFn}
              />
            </div>
            {/* <div style={{ textAlign: "right", marginTop: "5px" }}>
              <Button
                className="bouton-publier"
                variant="contained"
                color="primary"
                style={{ fontSize: "10px", backgroundColor: "#36B7CD" }}
              >
                Publier
              </Button>
            </div> */}

            {addCommentInstructions && (
              <div className="addCommentContent__bottom">
                <div className="press-enter">
                  Press enter to send or esc to cancel
                </div>

                <div
                  className="bouton-publier"
                  style={{
                    textAlign: "right",
                    marginTop: "5px",
                  }}
                >
                  <Button
                    onClick={save}
                    variant="contained"
                    color="primary"
                    style={{
                      fontSize: "10px",
                      backgroundColor: "#36B7CD",
                    }}
                  >
                    Publier
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
