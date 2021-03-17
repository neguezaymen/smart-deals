import React, { useEffect } from "react";
import {
  getFooterInfoDeals,
  getFooterInfoDealsComments,
  getFooterInfoDiscussions,
  getFooterInfoDiscussionsComments,
  getFooterInfoReplies,
  getFooterInfoUsers,
} from "../actions/footerActions";
import { useSelector, useDispatch } from "react-redux";
import logonav from "../res/logo-nav.png";

const Footer = () => {
  const dispatch = useDispatch();
  const footerInfo = useSelector((state) => state.footerInfoReducer);

  useEffect(() => {
    dispatch(getFooterInfoDeals());
    dispatch(getFooterInfoDiscussions());
    dispatch(getFooterInfoDiscussionsComments());
    dispatch(getFooterInfoDealsComments());
    dispatch(getFooterInfoUsers());
    dispatch(getFooterInfoReplies());
  }, []);
  var today = new Date();
  return (
    <div
      style={{
        backgroundColor: "#35373B",
        color: "white",
        paddingBottom: "20px",
        paddingTop: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            textAlign: "center",
            paddingRight: "20px",
          }}
        >
          SmartDeals – La première communauté de partage de bons plans de
          Tunisie
        </div>
        <div>
          <div>
            <div
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              <i
                class="fas fa-user-friends"
                style={{ paddingRight: "10px" }}
              ></i>
              <span
                style={{
                  paddingRight: "10px",
                  fontSize: "20px",
                  color: "#03a5c1",
                  fontFamily: "Helvetica Neue",
                }}
              >
                {footerInfo.users && footerInfo.users.length}
              </span>
              Inscriptions
            </div>
          </div>
          <div>
            <div
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              <i
                className="fas fa-bolt bolt"
                style={{ paddingRight: "10px", paddingLeft: "5px" }}
              ></i>
              <span
                style={{
                  paddingRight: "10px",
                  fontSize: "20px",
                  color: "#03a5c1",
                  fontFamily: "Helvetica Neue",
                }}
              >
                {footerInfo.deals && footerInfo.deals.length}
              </span>
              Deals
            </div>
          </div>
          <div>
            <div
            // style={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            >
              <i
                className="fas fa-comments"
                style={{ paddingRight: "10px" }}
              ></i>
              <span
                style={{
                  paddingRight: "10px",
                  fontSize: "20px",
                  color: "#03a5c1",
                  fontFamily: "Helvetica Neue",
                }}
              >
                {footerInfo.discussionsComments &&
                  footerInfo.dealsComments &&
                  footerInfo.replies &&
                  footerInfo.dealsComments.length +
                    footerInfo.discussionsComments.length +
                    footerInfo.replies.length}
              </span>
              Commentaires
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          paddingTop: "10px",
          textAlign: "center",
          color: "#B1B1B3",
          fontFamily: "Helvetica Neue",
        }}
      >
        {"© 2020-" +
          today.getFullYear() +
          " Neguez Aymen ® - Tous droits réservés"}
      </div>
    </div>
  );
};

export default Footer;
