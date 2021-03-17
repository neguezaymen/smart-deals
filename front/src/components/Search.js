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
import { getSearch } from "../actions/getSearchActions";
import { useHistory } from "react-router-dom";
import DiscussionsHomeModel from "./DiscussionsHomeModel";
import { getAllDiscussions } from "../actions/getDiscussionsActions";
const Search = () => {
  const search = useSelector((state) => state.searchReducer);
  var searchInput = search.search;
  const auth = useSelector((state) => state.AuthReducer);
  const deals = useSelector((state) => state.getDealsReducer);
  const discussions = useSelector((state) => state.getDiscussionsReducer);
  // console.log(deals.allDeals[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDeals());
  }, [deals.dealsLoaded]);
  useEffect(() => {
    dispatch(getAllDiscussions());
  }, [discussions.discussionsLoaded]);
  let homeDeals = deals.allDeals;
  let homeDiscussions = discussions.allDiscussions;

  return (
    <div style={{ paddingTop: "70px" }}>
      <Row className="deals-container-home">
        <Col xs={2}></Col>
        <Col xs={8} style={{ padding: "0px" }}>
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                paddingBottom: "20px",
              }}
            >
              <i
                class="fas fa-binoculars"
                style={{ marginRight: "20px", fontSize: "30px" }}
              ></i>
              Résultats pour{" "}
              <span style={{ color: "red" }}> {search.search}</span> dans Deals
            </div>
            {search.searchLoaded &&
            deals &&
            deals.dealsLoaded &&
            search.search !== "" ? (
              homeDeals
                .filter((el) => el.titre.toLowerCase().includes(search.search))
                .map((el) => <DealsHome className="deal-home" deal={el} />)
            ) : (
              <div></div>
            )}
          </div>
          <div>
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                paddingBottom: "20px",
              }}
            >
              <i
                class="fas fa-binoculars"
                style={{ marginRight: "20px", fontSize: "30px" }}
              ></i>
              Résultats pour{" "}
              <span style={{ color: "red" }}> {search.search}</span> dans
              Discussions
            </div>
            <div style={{ minHeight: "20vh" }}>
              {search.searchLoaded &&
              homeDiscussions &&
              search.search !== "" ? (
                homeDiscussions
                  .filter((el) =>
                    el.titre.toLowerCase().includes(search.search)
                  )
                  .map((el) => (
                    <DiscussionsHomeModel
                      className="deal-home"
                      discussion={el}
                    />
                  ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default Search;
