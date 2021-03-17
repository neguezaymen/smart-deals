import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  ContentState,
  Editor,
  EditorState,
  getDefaultKeyBinding,
} from "draft-js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Moment from "react-moment";
import Reply from "./Reply";
import "../styles/commentContainer.css";
import "../../node_modules/draft-js/dist/Draft.css";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../actions/notificationsActions";

const Comment = ({
  deal,
  commenterId,
  commentId,
  avatarCommenter,
  commenter,
  comment,
  commentTime,
  replies,
  deleteDealComment,
  postDealReply,
  updateDealComment,
  updateDealReply,
  deleteDealReply,
}) => {
  const auth = useSelector((state) => state.AuthReducer);
  const addReply = useRef();

  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(comment))
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(comment))
    );
  }, [comment]);

  const [addReplyEditorState, setAddReplyEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [showAddReply, setShowAddReply] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const commentOptions = ["Modifier", "Supprimer"];

  const [chosenOption, setChosenOption] = useState(null);

  const handleOnclickOption = (e) => {
    setChosenOption(e);
    if (e === "Modifier") {
      setEditorState(
        EditorState.moveFocusToEnd(
          EditorState.createWithContent(ContentState.createFromText(comment))
        )
      );
    } else {
      if (e === "Supprimer") {
        dispatch(deleteDealComment(commentId));
        // console.log(commentId);
      }
    }
  };

  const myKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        updateDealComment(
          editorState.getCurrentContent().getPlainText(),
          commentId
        )
      );
      setChosenOption(null);
      return "handled";
    } else {
      if (command === "cancel") {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromText(comment))
        );
        setChosenOption(null);
        return "handled";
      }
    }
    return "not-handled";
  };

  const replyKeyBindingFn = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return "save";
    } else {
      if (e.keyCode === 27) {
        return "cancel";
      }
    }
    return getDefaultKeyBinding(e);
  };

  const handleReplyKeyCommand = (command) => {
    if (command === "save") {
      dispatch(
        postDealReply(
          addReplyEditorState.getCurrentContent().getPlainText(),
          commentId
        )
      );
      setShowAddReply(false);
      setAddReplyEditorState(EditorState.createEmpty());
      if (auth.user._id !== deal.getdeal.owner) {
        dispatch(
          addNotification(
            {
              update:
                auth.user &&
                auth.user.pseudo +
                  " a répondu dans " +
                  deal.getdeal.titre.slice(0, 30) +
                  "... " +
                  " ** " +
                  addReplyEditorState
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
        setAddReplyEditorState(EditorState.createEmpty());
        setShowAddReply(false);
        return "handled";
      }
    }
    return "not-handled";
  };

  const handleBlur = () => {
    if (!addReplyEditorState.getCurrentContent().getPlainText()) {
      setShowAddReply(false);
    }
  };
  const save = () => {
    dispatch(
      postDealReply(
        addReplyEditorState.getCurrentContent().getPlainText(),
        commentId
      )
    );
    setShowAddReply(false);
    setAddReplyEditorState(EditorState.createEmpty());
    if (auth.user._id !== deal.getdeal.owner) {
      dispatch(
        addNotification(
          {
            update:
              auth.user &&
              auth.user.pseudo +
                " a répondu dans " +
                deal.getdeal.titre.slice(0, 30) +
                "... " +
                " ** " +
                addReplyEditorState
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
  };
  const editSave = () => {
    dispatch(
      updateDealComment(
        editorState.getCurrentContent().getPlainText(),
        commentId
      )
    );
    setChosenOption(null);
    return "handled";
  };
  return (
    <div className="commentContainer">
      <div className="comment">
        <div className="comment__left">
          <Link to={"/user/" + commenterId}>
            <Avatar className="comment__avatar" src={avatarCommenter} />
          </Link>
        </div>
        <div className="comment__right">
          <div className="commentContent__top">
            <div className="commentContent">
              <h4 className="comment__name">{commenter}</h4>
              <Editor
                readOnly={chosenOption === "Modifier" ? false : true}
                className="comment__body"
                editorState={editorState}
                placeholder="Write a comment..."
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={myKeyBindingFn}
              />
            </div>
            {chosenOption !== "Edit" && (
              <div className="commentOption">
                {auth.isAuth && auth.user._id === commenterId && (
                  <IconButton onClick={handleOptionClick}>
                    <MoreHorizIcon />
                  </IconButton>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleOptionClose}
                >
                  {commentOptions.map((option) => (
                    <MenuItem
                      key={option}
                      onClick={() => {
                        handleOptionClose();
                        handleOnclickOption(option);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )}
          </div>
          {chosenOption === "Modifier" && (
            <div className="onEditComment">
              <div className="press-enter">
                Press enter to send or esc to cancel
              </div>
              <div
                className="bouton-publier"
                style={{
                  textAlign: "right",
                  marginTop: "5px",
                  marginRight: "11%",
                }}
              >
                <Button
                  onClick={editSave}
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
          {chosenOption !== "Modifier" && (
            <div className="commentContent__bottom">
              {auth.isAuth && (
                <h6
                  onClick={() => {
                    setShowAddReply(true);
                    setAddReplyEditorState(
                      EditorState.moveFocusToEnd(EditorState.createEmpty())
                    );
                  }}
                >
                  Répondre
                </h6>
              )}
              <Moment className="commentTime" fromNow>
                {commentTime}
              </Moment>
            </div>
          )}
        </div>
      </div>

      {replies &&
        replies.map((el, i) => (
          <Reply
            addReplyEditorState={addReplyEditorState}
            key={i}
            commentId={commentId}
            replyId={el._id}
            replierId={el.owner._id}
            avatarReplier={el.owner.avatar}
            replier={el.owner.pseudo}
            reply={el.text}
            replyTime={el.create__at}
            setShowAddReply={setShowAddReply}
            setAddReplyEditorState={setAddReplyEditorState}
            updateDealReply={updateDealReply}
            deleteDealReply={deleteDealReply}
          />
        ))}
      {showAddReply && (
        <div className="addReply">
          <div className="addReply__left">
            <Link to={"/user/" + auth.user._id}>
              <Avatar className="addReply__avatar" src={auth.user.avatar} />
            </Link>
          </div>
          <div className="addReply__right">
            <div className="addReplyContent__top">
              <Editor
                className="addReply__body"
                onBlur={handleBlur}
                editorState={addReplyEditorState}
                placeholder="Ecrire votre réponse..."
                onChange={setAddReplyEditorState}
                handleKeyCommand={handleReplyKeyCommand}
                keyBindingFn={replyKeyBindingFn}
              />
            </div>

            <div className="addReplyContent__bottom">
              <div className="press-enter">
                Press enter to send or esc to cancel
              </div>
              <div
                className="bouton-publier"
                style={{
                  textAlign: "right",
                  marginTop: "5px",
                  marginRight: "11%",
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
