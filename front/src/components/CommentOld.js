import { Avatar } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/fr";
const Comment = ({ comment }) => {
  return (
    <div
      style={{
        backgroundColor: "#E9EAED",
        borderRadius: "7px",
        margin: "10px",
        padding: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="avatar"
          src={comment.owner && comment.owner.avatar}
          style={{ marginRight: "5px", marginLeft: "7px" }}
        />
        <div style={{ fontWeight: "600" }}>
          {comment.owner && comment.owner.pseudo}
        </div>
        <Moment
          style={{
            marginLeft: "7px",
            fontSize: "12px",
            color: "gray",
            fontWeight: "500",
          }}
          fromNow
        >
          {comment.created_at}
        </Moment>
        {/* <div
          style={{
            marginLeft: "7px",
            fontSize: "12px",
            color: "gray",
            fontWeight: "500",
          }}
        >
          Crée le {comment.created_at.slice(0, 10)}
        </div> */}
      </div>
      <div style={{ wordBreak: "break-all" }}>{comment.comment}</div>
    </div>
  );
};

export default Comment;
