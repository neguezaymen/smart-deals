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

const TahaVoyages = () => {
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
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src="https://www.tahavoyages.com/file_manager/source/front/logo.png"
          alt="jumia-logo"
          width="20%"
        />
      </div>

      <Row className="deals-container-home">
        <Col xs={2}></Col>
        <Col xs={8} style={{ padding: "0px" }}>
          <div style={{ fontSize: "25px", fontWeight: "500" }}>
            Les bons plans Taha Voyages
          </div>
          {deals && deals.dealsLoaded ? (
            homeDeals
              .filter((el) => el.lien.includes("tahavoyages"))
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

export default TahaVoyages;
