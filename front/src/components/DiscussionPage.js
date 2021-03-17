import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/deal.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { getDiscussion } from "../actions/discussionActions";

const DiscussionPage = ({ discussion }) => {
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "white",
        borderRadius: "7px",
        alignItems: "center",
        minHeight: "180px",
        minWidth: "350px",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      <div style={{ width: "90%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="titre"
            style={{
              fontSize: "25px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              // overflow: "hidden",
            }}
          >
            {discussion.titre ? discussion.titre : ""}
          </div>
        </div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {discussion.description}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Link to={"/user/" + discussion.owner}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="avatar"
                  src={discussion.userAvatar}
                  style={{ marginRight: "5px", marginLeft: "7px" }}
                />
                <div style={{ fontWeight: "600" }}>{discussion.userPseudo}</div>
              </div>
            </Link>

            <div>
              <Link to={"/discussions/" + discussion._id}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#36B7CD",
                  }}
                  variant="contained"
                  color="primary"
                  href={discussion.lien}
                  // onClick={() => dispatch(getDiscussion(discussion._id))}
                >
                  Voir la discussion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
