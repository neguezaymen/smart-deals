import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  ContentState,
  Editor,
  EditorState,
  getDefaultKeyBinding,
} from "draft-js";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Moment from "react-moment";
import "../styles/Reply.css";
import "../../node_modules/draft-js/dist/Draft.css";
import { useDispatch, useSelector } from "react-redux";
import { postDealReply } from "../actions/dealCommentsActions";
import { Link } from "react-router-dom";

const Reply = ({
  replyId,
  commentId,
  replierId,
  avatarReplier,
  replier,
  reply,
  replyTime,
  setShowAddReply,
  setAddReplyEditorState,
  updateDealReply,
  deleteDealReply,
  addReplyEditorState,
}) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(reply))
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(reply))
    );
  }, [reply]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleOptionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const replyOptions = ["Modifier", "Supprimer"];

  const [chosenOption, setChosenOption] = useState(null);

  const handleOnclickOption = (e) => {
    setChosenOption(e);
    if (e === "Modifier") {
      setEditorState(
        EditorState.moveFocusToEnd(
          EditorState.createWithContent(ContentState.createFromText(reply))
        )
      );
    } else {
      if (e === "Supprimer") {
        dispatch(deleteDealReply(replyId, commentId));
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
        updateDealReply(editorState.getCurrentContent().getPlainText(), replyId)
      );
      setChosenOption(null);
      return "handled";
    } else {
      if (command === "cancel") {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromText(reply))
        );
        setChosenOption(null);
        return "handled";
      }
    }
    return "not-handled";
  };
  const save = () => {
    dispatch(
      updateDealReply(editorState.getCurrentContent().getPlainText(), replyId)
    );
    setChosenOption(null);
    return "handled";
  };
  return (
    <div className="replyContainer">
      <div className="reply">
        <div className="reply__left">
          <Link to={"/user/" + replierId}>
            <Avatar className="reply__avatar" src={avatarReplier} />
          </Link>
        </div>
        <div className="reply__right">
          <div className="replyContent__top">
            <div className="replyContent">
              <h4 className="reply__name">{replier}</h4>
              <Editor
                readOnly={chosenOption === "Modifier" ? false : true}
                className="reply__body"
                editorState={editorState}
                placeholder="Ecrire votre réponse..."
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={myKeyBindingFn}
              />
            </div>
            {chosenOption !== "Modifier" && (
              <div className="replyOption">
                {auth.isAuth && auth.user._id === replierId && (
                  <IconButton onClick={handleOptionClick}>
                    <MoreHorizIcon />
                  </IconButton>
                )}

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleOptionClose}
                >
                  {replyOptions.map((option) => (
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
            <div className="onEditReply">
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
          {chosenOption !== "Modifier" && (
            <div className="replyContent__bottom">
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
              <Moment className="replyTime" fromNow>
                {replyTime}
              </Moment>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
