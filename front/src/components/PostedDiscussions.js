import React, { useState, useRef, useEffect } from "react";
import "../styles/Profile.css";
import { loadUser, updateUser } from "../actions/authActions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import EdiText from "react-editext";
import {
  deleteProfile,
  deleteUserDeal,
  deleteUserDiscussion,
  getUserDeals,
  getUserDiscussions,
  updateProfile,
} from "../actions/ProfileActions";

const Profile = ({ history }) => {
  const auth = useSelector((state) => state.AuthReducer);
  const getUserProfileDiscussions = useSelector(
    (state) => state.profileReducer
  );
  const [src, setSrc] = useState();
  const [picture, setPicture] = useState({
    pictureSrc: null,
    picturePreview: null,
  });
  const sendPicture = useRef();
  const [pseudo, setPseudo] = useState("");
  console.log(pseudo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  // Modifier Votre Mot de passe
  // useEffect(() => {
  //   if (auth.isAuth) {
  //     dispatch(loadUser());
  //   }
  // }, [auth.isAuth]);
  useEffect(() => {
    if (getUserProfileDiscussions) {
      dispatch(getUserDiscussions());
    }
  }, [getUserDeals]);
  const uploadPicture = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("avatar", picture.pictureSrc);
    axios
      .post("/profile", formData)
      .then((res) => dispatch(updateUser(res.data.pictureName)));
  };

  const selectPicture = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPicture({
        pictureSrc: e.target.files[0],
        picturePreview: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSavePseudo = (pseudo) => {
    setPseudo(pseudo);
    dispatch(updateProfile({ pseudo: pseudo }));
    dispatch(loadUser());
  };
  const handleSaveEmail = (email) => {
    setEmail(email);
    dispatch(updateProfile({ email: email }));
    dispatch(loadUser());
  };
  const handleSavePassword = (password) => {
    setPassword(password);
    dispatch(updateProfile({ pseudo: pseudo, email: email }));
  };
  const pseudoValidation = (value) => {
    return value.length < 20;
  };
  const emailValidation = (value) => {
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return value.match(pattern);
  };
  const deleteProfileNow = () => {
    dispatch(deleteProfile());
    dispatch(loadUser());
    alert("Votre Compte a été bien supprimé ! ");
  };
  const handleShow = () => {
    setShow(!show);
  };
  const getUserDealsNow = () => {
    dispatch(getUserDeals());
  };
  const getUserDiscussionsNow = () => {
    dispatch(getUserDiscussions());
  };
  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ paddingTop: "70px" }}>
      <Container>
        <Row>
          <Col className="left-profile-side" xs={4}>
            <div className="parametre">Paramètres</div>
            <Link to="/profile">
              <div className="parametre-item">
                <i class="fas fa-user-alt"></i>Profil
              </div>
            </Link>
            <Link to="/profile/mes-deals">
              <div className="parametre-item">
                <i className="fas fa-bolt bolt"></i>Deals postés
              </div>
            </Link>
            <Link to="/profile/mes-discussions">
              <div className="parametre-item">
                <i className="far fa-comment-dots dots"></i>Discussion postées
              </div>
            </Link>
          </Col>
          <Col className="right-profile-side">
            <h1>Mes Discussions </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {getUserProfileDiscussions.userDiscussions &&
              getUserProfileDiscussions.userDiscussions.length !== 0 ? (
                getUserProfileDiscussions.userDiscussions.map((el) => (
                  <div className="posted-deal">
                    <Link to={"/discussions/" + el._id}>
                      <div>
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "260px",
                          }}
                        >
                          {" "}
                          <span style={{ fontSize: "18px", fontWeight: "600" }}>
                            Titre :
                          </span>{" "}
                          {el.titre}
                        </div>
                        <div>
                          <span style={{ fontSize: "18px", fontWeight: "600" }}>
                            Groupe :
                          </span>{" "}
                          {el.groupe}
                        </div>
                        <div>
                          <span style={{ fontSize: "18px", fontWeight: "600" }}>
                            Crée le :
                          </span>{" "}
                          {el.created_at.slice(0, 10)}
                        </div>
                      </div>
                    </Link>

                    <div style={{ position: "absolute", left: "90%" }}>
                      <i
                        class="fas fa-trash-alt"
                        onClick={() => {
                          dispatch(deleteUserDiscussion(el._id, history));
                          dispatch(getUserDiscussions());
                        }}
                        style={{ color: "red" }}
                      ></i>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <i
                    class="far fa-frown"
                    style={{ fontSize: "50px", paddingBottom: "10px" }}
                  ></i>
                  <div style={{ paddingBottom: "10px" }}>
                    On dirait que vous n'avez encore rien posté…
                  </div>
                  <Link to="/post-discussion">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "#36B7CD",
                      }}
                      variant="contained"
                      color="primary"
                    >
                      <i className="fas fa-plus plus"></i>
                      Poster...
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
