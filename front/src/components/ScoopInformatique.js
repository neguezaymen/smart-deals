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

const ScoopInformatique = () => {
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
            Les bons plans Scoop Informatique
          </div>
          {deals && deals.dealsLoaded ? (
            homeDeals
              .filter((el) => el.lien.includes("scoop"))
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

export default ScoopInformatique;
