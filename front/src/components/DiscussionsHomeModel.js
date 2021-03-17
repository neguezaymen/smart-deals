import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../styles/deal.css";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const DiscussionsHomeModel = ({ discussion }) => {
  const auth = useSelector((state) => state.AuthReducer);
  // useEffect(() => {
  //   effect;
  // }, [input]);

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
            {discussion && discussion.titre ? discussion.titre : ""}
          </div>
        </div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {discussion && discussion.description}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="avatar"
                src={discussion && discussion.userAvatar}
                style={{ marginRight: "5px", marginLeft: "7px" }}
              />
              <div style={{ fontWeight: "600" }}>
                {discussion && discussion.userPseudo}
              </div>
            </div>

            {/* <div>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#36B7CD",
                }}
                variant="contained"
                color="primary"
                href={discussion.lien}
              >
                Voir la discussion
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionsHomeModel;
