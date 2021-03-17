import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
// import Mailto from "react-mailto";
import "../styles/UserProfile.css";
import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import {
  getUserInfo,
  getUserProfileDeals,
  getUserProfileDiscussions,
} from "../actions/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { initState } from "../actions/initState";

const UserProfile = () => {
  const user = useSelector((state) => state.getUserReducer);
  const deals = useSelector((state) => state.getUserReducer.deals);
  const discussions = useSelector((state) => state.getUserReducer.discussions);

  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch(getUserInfo(id));
    dispatch(getUserProfileDeals(id));
    dispatch(getUserProfileDiscussions(id));
    return () => {
      dispatch(initState());
    };

    //
  }, [id]);
  function Mailto({ email, subject, body, ...props }) {
    return (
      <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
        {props.children}
      </a>
    );
  }
  return (
    <>
      {deals && (
        <div>
          <div className="user-profile-nav">
            <div className="user-profile-nav-left">
              <div style={{ marginRight: "10px" }}>
                <Avatar
                  alt="avatar"
                  src={user.userInfo && user.userInfo.avatar}
                  style={{
                    marginRight: "5px",
                    marginLeft: "7px",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>

              <div>
                <div style={{ fontSize: "25px" }}>
                  {user.userInfo && user.userInfo.pseudo}
                </div>
                <div style={{ fontSize: "15px", color: "gray" }}>
                  {user.userInfo && user.userInfo.email}
                </div>
                <div style={{ fontSize: "15px", color: "gray" }}>
                  {" Inscrit le : "}
                  {user.userInfo && user.userInfo.created_at.slice(0, 10)}
                </div>
              </div>
            </div>
            <div>
              <Mailto email={user.userInfo && user.userInfo.email}>
                <Button
                  //   type="submit"
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    backgroundColor: "#36B7CD",
                  }}
                  variant="contained"
                  color="primary"
                  // href={"mailto:" + user.userInfo && user.userInfo.email}
                >
                  <i
                    class="fas fa-envelope"
                    style={{ marginRight: "10px" }}
                  ></i>
                  Envoyer un MP
                </Button>
              </Mailto>
            </div>
          </div>
          <div style={{ paddingTop: "20px", minHeight: "60vh" }}>
            <div
              style={{
                display: "flex",
                justifyContent: " space-evenly",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ textAlign: "center", fontSize: "30px" }}>
                  Deals postés
                </div>
                {deals && deals.length !== 0 ? (
                  deals.map((el) => (
                    <Link to={"/bon-plans/" + el._id}>
                      <div className="posted-deal">
                        <div>
                          <img
                            src={el.url}
                            width="70px"
                            style={{ borderRadius: "7px", margin: "10px" }}
                          />
                        </div>

                        <div style={{ color: "black" }}>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "260px",
                            }}
                          >
                            {" "}
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Titre :
                            </span>{" "}
                            {el.titre}
                          </div>
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Groupe :
                            </span>{" "}
                            {el.groupe}
                          </div>
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Crée le :
                            </span>{" "}
                            {el.created_at.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>
                    <div style={{ paddingTop: "20px", textAlign: "center" }}>
                      <i
                        class="far fa-frown"
                        style={{
                          fontSize: "50px",
                          paddingBottom: "10px",
                        }}
                      ></i>
                    </div>
                    <div style={{ paddingBottom: "10px" }}>
                      {user &&
                        user.userInfo &&
                        user.userInfo.pseudo + " n'a encore rien posté…"}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div style={{ textAlign: "center", fontSize: "30px" }}>
                  Discussions postées
                </div>
                {discussions && discussions.length !== 0 ? (
                  discussions.map((el) => (
                    <Link to={"/discussions/" + el._id}>
                      <div className="posted-deal">
                        <div style={{ color: "black" }}>
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "260px",
                            }}
                          >
                            {" "}
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Titre :
                            </span>{" "}
                            {el.titre}
                          </div>
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Groupe :
                            </span>{" "}
                            {el.groupe}
                          </div>
                          <div>
                            <span
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              Crée le :
                            </span>{" "}
                            {el.created_at.slice(0, 10)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>
                    <div style={{ paddingTop: "20px", textAlign: "center" }}>
                      <i
                        class="far fa-frown"
                        style={{
                          fontSize: "50px",
                          paddingBottom: "10px",
                        }}
                      ></i>
                    </div>

                    <div style={{ paddingBottom: "10px", textAlign: "center" }}>
                      {user &&
                        user.userInfo &&
                        user.userInfo.pseudo + " n'a encore rien posté…"}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
