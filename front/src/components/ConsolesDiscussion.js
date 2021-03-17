import cosmetiques from "../res/cosmetiques.png";
import consoles from "../res/consoles.png";
import technology from "../res/technology.png";
import travel from "../res/travel.png";
import React, { useEffect } from "react";

import "../styles/discussions.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import Discussion from "./Discussion";
import { getAllDiscussions } from "../actions/getDiscussionsActions";
import DiscussionPage from "./DiscussionPage";
import { Link } from "react-router-dom";

const ConsolesDiscussion = ({ history }) => {
  const discussions = useSelector((state) => state.getDiscussionsReducer);
  useEffect(() => {
    dispatch(getAllDiscussions());
  }, [discussions.discussionsLoaded]);
  const dispatch = useDispatch();
  let homeDiscussions = discussions.allDiscussions;
  return (
    <div style={{ paddingTop: "70px" }}>
      <div className="groupes-discussions">
        <Link to="/groupes-discussions/Hight-Tech/">
          <div>
            <img src={technology} alt="technology" width="80px" />
          </div>
        </Link>
        <Link to="/groupes-discussions/Cosmétiques/">
          <div>
            <img src={cosmetiques} alt="cosmetiques" width="80px" />
          </div>
        </Link>
        <Link to="/groupes-discussions/Consoles/">
          <div>
            <img src={consoles} alt="consoles" width="80px" />
          </div>
        </Link>
        <Link to="/groupes-discussions/Voyages/">
          <div>
            <img src={travel} alt="travel" width="80px" />
          </div>
        </Link>
      </div>
      <Container className="container-discussions">
        <Row
          style={{
            backgroundColor: "#E9EAED",
            paddingTop: "30px",
            minHeight: "90vh",
          }}
        >
          <Col xs={2}></Col>
          <Col xs={8}>
            {discussions && discussions.discussionsLoaded ? (
              homeDiscussions
                .filter((el) => el.groupe === "Consoles")
                .map((el) => (
                  <DiscussionPage className="deal-home" discussion={el} />
                ))
            ) : (
              <div></div>
            )}
          </Col>
          <Col xs={2}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConsolesDiscussion;
