import React, { useEffect } from "react";
import "../styles/Home.css";

import { useSelector, useDispatch } from "react-redux";
import { getAllDeals } from "../actions/getDealsActions";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import DealsHome from "./DealsHome";

import cosmetiques from "../res/cosmetiques.png";
import consoles from "../res/consoles.png";
import technology from "../res/technology.png";
import travel from "../res/travel.png";
import { Link } from "react-router-dom";

const MyTek = () => {
  const auth = useSelector((state) => state.AuthReducer);
  const deals = useSelector((state) => state.getDealsReducer);
  // console.log(deals.allDeals[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDeals());
  }, [deals.dealsLoaded]);
  let homeDeals = deals.allDeals;
  return (
    <div style={{ paddingTop: "70px" }}>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <img
          src="data:image/png;base64,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"
          alt="jumia-logo"
          width="15%"
        />
      </div>

      <Row className="deals-container-home">
        <Col xs={2}></Col>
        <Col xs={8} style={{ padding: "0px" }}>
          <div style={{ fontSize: "25px", fontWeight: "500" }}>
            Les bons plans MyTek
          </div>
          {deals && deals.dealsLoaded ? (
            homeDeals
              .filter((el) => el.lien.includes("mytek"))
              .map((el) => <DealsHome className="deal-home" deal={el} />)
          ) : (
            <div></div>
          )}
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default MyTek;
