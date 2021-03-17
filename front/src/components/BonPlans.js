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
const BonPlans = () => {
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
      <div className="groupes-discussions">
        <Link to="/groupes/Hight-Tech">
          <div>
            <img src={technology} alt="technology" width="80px" />
          </div>
        </Link>
        <Link to="/groupes/Cosmétiques">
          <div>
            <img src={cosmetiques} alt="cosmetiques" width="80px" />
          </div>
        </Link>
        <Link to="/groupes/Consoles">
          <div>
            <img src={consoles} alt="consoles" width="80px" />
          </div>
        </Link>
        <Link to="/groupes/Voyages">
          <div>
            <img src={travel} alt="travel" width="80px" />
          </div>
        </Link>
      </div>
      <Row className="deals-container-home">
        <Col xs={2}></Col>
        <Col xs={8} style={{ padding: "0px" }}>
          {deals && deals.dealsLoaded ? (
            homeDeals.map((el) => <DealsHome className="deal-home" deal={el} />)
          ) : (
            <div></div>
          )}
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default BonPlans;
