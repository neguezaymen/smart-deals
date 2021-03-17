import React, { useEffect } from "react";
import "../styles/Home.css";
import BannerTop from "./BannerTop";
import Filter from "./Filter";
import { useSelector, useDispatch } from "react-redux";
import { getAllDeals } from "../actions/getDealsActions";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import DealsHome from "./DealsHome";
import { loadUser } from "../actions/authActions";

const Home = () => {
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
      <BannerTop />
      <Filter />
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

export default Home;
