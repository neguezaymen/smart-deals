import React from "react";
import { useSelector } from "react-redux";

import "../styles/deal.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const Deal = ({ deal, selectedDate, chipData }) => {
  const auth = useSelector((state) => state.AuthReducer);

  return (
    <div style={{ position: "sticky", top: "71px" }} className="deal">
      <h1 style={{ paddingBottom: "20px" }}>Aperçu</h1>
      <div
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
              deal.url
                ? deal.url
                : "https://webdevpro.net/wp-content/uploads/2016/01/upload.png.jpe"
            }
            alt="deal-picture"
            style={{
              margin: "5px",
              alignItems: "center",
              padding: "10px",
              maxWidth: "140px",
              maxHeight: "170px",
            }}
          />
        </div>
        <div style={{ width: "67%" }}>
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
              {deal.titre ? deal.titre : ""}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <i class="fas fa-hourglass-end"></i>
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
                {"Expire le : " + selectedDate.toString().slice(4, 15)}
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
              {deal.prix || deal.prixHabituel ? deal.prix + " TND" : ""}
            </span>
            <span
              style={{
                color: "gray",
                fontWeight: "500",
                fontSize: "17px",
                textDecoration: "line-through",
                paddingRight: "10px",
              }}
            >
              {deal.prixHabituel + " TND"}
            </span>{" "}
            <span>
              {Number(deal.prix) < Number(deal.prixHabituel)
                ? "-" +
                  Math.trunc(
                    ((deal.prixHabituel - deal.prix) / deal.prixHabituel) * 100
                  ) +
                  "%"
                : ""}
            </span>
          </div>
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {deal.description}
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
                  src={auth.user && auth.user.avatar}
                  style={{ marginRight: "5px", marginLeft: "7px" }}
                />
                <div style={{ fontWeight: "600" }}>{auth.user.pseudo}</div>
              </div>

              <Button
                type="submit"
                style={{
                  backgroundColor: "#36B7CD",
                }}
                variant="contained"
                color="primary"
                href={deal.lien}
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

export default Deal;
