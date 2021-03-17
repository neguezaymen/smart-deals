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
import Comment from "./CommentOld";
import { initState } from "../actions/initState";
import CommentsContainer from "./CommentsContainer";
import {
  getDealComment,
  postDealComment,
  deleteDealComment,
  postDealReply,
  updateDealComment,
  updateDealReply,
  deleteDealReply,
} from "../actions/dealCommentsActions";

const DealPageModel = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const DealCommentsReducer = useSelector((state) => state.DealCommentsReducer);
  let { id } = useParams();

  const deal = useSelector((state) => state.dealReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getDeal(id));
      dispatch(getDealComment(id));
    }

    return () => {
      dispatch(initState());
    };
    //
  }, [id]);
  return (
    <>
      {deal && deal.getStatus && deal.getdeal._id && (
        <div
          className="deal-page-container"
          style={{ paddingTop: "70px", backgroundColor: "#E9EAED" }}
        >
          <Row style={{ paddingTop: "20px" }}>
            <Col xs={2}></Col>
            <Col xs={8}>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <DealsHomeModel deal={deal && deal.getStatus && deal.getdeal} />
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
                  Crée le {deal.getdeal && deal.getdeal.created_at.slice(0, 10)}
                </div>

                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    paddingBottom: "10px",
                  }}
                >
                  {deal.getdeal && deal.getdeal.titre}
                </div>
                <div>{deal.getdeal && deal.getdeal.description}</div>
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
                {(auth.isAuth || DealCommentsReducer.comments.length !== 0) && (
                  <CommentsContainer
                    deal={deal}
                    id={id}
                    comments={DealCommentsReducer.comments}
                    postDealComment={postDealComment}
                    deleteDealComment={deleteDealComment}
                    postDealReply={postDealReply}
                    updateDealComment={updateDealComment}
                    updateDealReply={updateDealReply}
                    deleteDealReply={deleteDealReply}
                  />
                )}
              </div>
            </Col>
            <Col xs={2}></Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default DealPageModel;
