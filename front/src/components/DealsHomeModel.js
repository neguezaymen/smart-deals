import React, { useState } from "react";

import "../styles/deal.css";
import Moment from "react-moment";
import "moment-timezone";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const DealsHomeModel = ({ deal }) => {
  return (
    <div>
      <div
        className="deals-home-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "white",
          borderRadius: "7px",
          alignItems: "center",
          minHeight: "180px",
          minWidth: "350px",
        }}
      >
        <div className="deal-image">
          <img
            src={
              deal && deal.url
                ? deal.url
                : "https://webdevpro.net/wp-content/uploads/2016/01/upload.png.jpe"
            }
            alt="deal-picture"
            style={{
              margin: "5px",
              alignItems: "center",
              padding: "27px",
              maxWidth: "140px",
              maxHeight: "170px",
            }}
          />
        </div>
        <div className="deals-home" style={{ width: "75%" }}>
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
              }}
            >
              {deal && deal.titre ? deal.titre : ""}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {deal.expireLe.slice(0, 10) !== "2021-01-01" ? (
                <i class="fas fa-hourglass-end"></i>
              ) : (
                ""
              )}
              <div
                className="expire-le"
                style={{
                  fontSize: "13px",
                  paddingLeft: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {deal.expireLe.slice(0, 10) !== "2021-01-01"
                  ? "Expire le : " + deal.expireLe.slice(0, 10)
                  : ""}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "red",
                fontWeight: "600",
                fontSize: "20px",
                paddingRight: "10px",
              }}
            >
              {(deal && deal.prix) || (deal && deal.prixHabituel)
                ? deal.prix + " TND"
                : ""}
            </span>
            <span
              style={{
                color: "gray",
                fontWeight: "500",
                fontSize: "17px",
                textDecoration: "line-through",
                paddingRight: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {deal && deal.prixHabituel + " TND"}
            </span>{" "}
            <span>
              {Number(deal && deal.prix) < Number(deal && deal.prixHabituel)
                ? "-" +
                  Math.trunc(
                    ((deal.prixHabituel - deal.prix) / deal.prixHabituel) * 100
                  ) +
                  "%"
                : ""}
            </span>
          </div>
          <div
            className="description-deal"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {deal && deal.description}
          </div>
          <div
          // style={{
          //   display: "flex",
          //   justifyContent: "space-between",
          //   alignItems: "center",
          // }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Link to={"/user/" + deal.owner}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="avatar"
                    src={deal && deal.userAvatar}
                    style={{ marginRight: "5px", marginLeft: "7px" }}
                  />
                  <div style={{ fontWeight: "600" }}>
                    {deal && deal.userPseudo}
                  </div>
                </div>
              </Link>
              {/* <Moment fromNow>{deal && deal.created_at}</Moment> */}
              <Button
                type="submit"
                style={{
                  backgroundColor: "#36B7CD",
                }}
                variant="contained"
                color="primary"
                href={deal && deal.lien}
                target="_blank"
              >
                Voir le Deal
              </Button>
            </div>
          </div>
        </div>
        <div></div>
        <div className="deal-content"></div>
      </div>
    </div>
  );
};

export default DealsHomeModel;
