import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/dealpage.css";
import { useSelector, useDispatch } from "react-redux";

import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DealsHomeModel from "./DealsHomeModel";

import { getDeal } from "../actions/dealActions";

import { Avatar } from "@material-ui/core";
import Comment from "./Comment";
import DiscussionsHomeModel from "./DiscussionsHomeModel";
import { getDiscussion } from "../actions/discussionActions";
import { initState } from "../actions/initState";
import {
  getDiscussionComment,
  postDiscussionComment,
  deleteDiscussionComment,
  postDiscussionReply,
  updateDiscussionComment,
  updateDiscussionReply,
  deleteDiscussionReply,
} from "../actions/discussionCommentsActions";
import CommentsContainer from "./CommentsContainer";

const DiscussionPageModel = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const DiscussionCommentsReducer = useSelector(
    (state) => state.DiscussionCommentsReducer
  );

  let { id } = useParams();
  const [comment, setComment] = useState("");

  const discussion = useSelector((state) => state.discussionReducer);
  const comments = useSelector((state) => state.commentReducer);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    if (id) {
      dispatch(getDiscussion(id));
      dispatch(getDiscussionComment(id));
    }

    return () => {
      dispatch(initState());
    };
    //
  }, [id]);
  return (
    <div
      className="deal-page-container"
      style={{ paddingTop: "70px", backgroundColor: "#E9EAED" }}
    >
      {/* <div className="deal-page">
        <Link to="/groupes/Hight-Tech">
          <li>Hight-Tech</li>
        </Link>
        <Link to="/groupes/Cosmétiques">
          <li>Cosmétiques</li>
        </Link>
        <Link to="/groupes/Consoles">
          <li>Consoles</li>
        </Link>
        <Link to="groupes/Voyages">
          <li>Voyages</li>
        </Link>
      </div> */}
      <Row style={{ paddingTop: "20px" }}>
        <Col xs={2}></Col>
        <Col xs={8}>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <DiscussionsHomeModel
              discussion={
                discussion && discussion.getStatus && discussion.getdiscussion
              }
            />
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <div className="deal-info">
            <div
              style={{
                paddingBottom: "20px",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              <i class="far fa-clock" style={{ paddingRight: "10px" }}></i>
              Crée le{" "}
              {discussion.getdiscussion &&
                discussion.getdiscussion.created_at.slice(0, 10)}
            </div>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              {discussion.getdiscussion && discussion.getdiscussion.titre}
            </div>
            <div>
              {discussion.getdiscussion && discussion.getdiscussion.description}
            </div>
            <div
              // hidden={false}
              style={{
                paddingTop: "20px",

                fontSize: "25px",
                color: "#36B7CD",
              }}
            >
              <i
                class="fas fa-comment"
                style={{ paddingRight: "10px", color: "#36B7CD" }}
              ></i>
              Écrire un commentaire
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              backgroundColor: "white",
              paddingRight: "20px",
              paddingBottom: "10px",
            }}
          ></div>
          <div
            style={{
              textAlign: "left",
              backgroundColor: "white",
              paddingTop: "20px",
              paddingBottom: "20px",
              borderRadius: "7px",
              marginBottom: "40px",
            }}
          >
            {(auth.isAuth ||
              DiscussionCommentsReducer.comments.length !== 0) && (
              <CommentsContainer
                id={id}
                comments={DiscussionCommentsReducer.comments}
                postDealComment={postDiscussionComment}
                deleteDealComment={deleteDiscussionComment}
                postDealReply={postDiscussionReply}
                updateDealComment={updateDiscussionComment}
                updateDealReply={updateDiscussionReply}
                deleteDealReply={deleteDiscussionReply}
              />
            )}
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default DiscussionPageModel;
