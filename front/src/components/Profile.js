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
  deleteUserDeals,
  deleteUserDiscussions,
  getUserDeals,
  getUserDiscussions,
  updateProfile,
  updateProfilePassword,
} from "../actions/ProfileActions";
import DeleteConfirmation from "./DeleteConfirmation";

const Profile = ({ history }) => {
  const auth = useSelector((state) => state.AuthReducer);
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
    actualPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  // Modifier Votre Mot de passe
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch(loadUser());
  //   }
  // }, [localStorage.getItem("token")]);

  const uploadPicture = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("avatar", picture.pictureSrc);
    axios
      .post("https://smart-deals-tunisie.herokuapp.com/profile", formData)
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
  const getUserDealsNow = () => {
    dispatch(getUserDeals());
  };
  const getUserDiscussionsNow = () => {
    dispatch(getUserDiscussions());
  };

  const deleteProfileNow = () => {
    dispatch(deleteUserDeals());
    dispatch(deleteUserDiscussions());
    dispatch(deleteProfile());
    dispatch(loadUser());

    alert("Votre Compte a été bien supprimé ! ");
    history.push("/");
  };
  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };
  const [showModal, setShowModal] = useState(false);
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
            <Link to="/profile/mes-discussions" onClick={getUserDiscussionsNow}>
              <div className="parametre-item">
                <i className="far fa-comment-dots dots"></i>Discussion postées
              </div>
            </Link>
          </Col>
          <Col className="right-profile-side">
            <h1>{auth.user && auth.user.pseudo}</h1>
            <div>
              <div class="d-flex justify-content-center h-100">
                <div class="image_outer_container">
                  <div class="green_icon"></div>
                  <div class="image_inner_container">
                    <img
                      src={
                        !picture.picturePreview
                          ? auth.user && auth.user.avatar
                            ? auth.user.avatar
                            : "https://img2.freepng.fr/20180329/bpq/kisspng-avatar-education-professor-user-profile-faculty-boss-5abcab3d64aff2.9884136415223140454124.jpg"
                          : picture.picturePreview
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={uploadPicture}
              method="post"
              enctype="multipart/form-data"
            >
              <input
                style={{ display: "none" }}
                type="file"
                name="avatar"
                onChange={selectPicture}
                accept="image/*"
                className
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="default"
                  startIcon={<CloudUploadIcon />}
                >
                  Remplacer
                </Button>
              </div>
            </form>
            <div className="edit-info">
              <div>
                <EdiText
                  value={auth.isAuth && auth.user.pseudo}
                  type="text"
                  onSave={handleSavePseudo}
                  editing={editing}
                  editButtonContent="  Modifier Votre Pseudo"
                  editButtonClassName="btn btn-info btn-rounded"
                  viewContainerClassName="view"
                  buttonsAlign="before"
                  submitOnEnter="true"
                  cancelOnEscape="true"
                  validation={pseudoValidation}
                  validationMessage="Votre pseudo ne doit pas dépasser 20 caractères"
                />
              </div>
              <div>
                <EdiText
                  value={auth.isAuth && auth.user.email}
                  type="text"
                  onSave={handleSaveEmail}
                  editing={editing}
                  editButtonContent="  Modifier Votre Email"
                  editButtonClassName="btn btn-info btn-rounded"
                  buttonsAlign="before"
                  viewContainerClassName="view"
                  submitOnEnter="true"
                  cancelOnEscape="true"
                  validation={emailValidation}
                  validationMessage="Veuillez entrer une adresse email valide"
                />
              </div>

              <div>
                <div style={{ textAlign: "left" }}>
                  <button
                    type="button"
                    class="btn btn-info btn-rounded"
                    onClick={handleShow}
                  >
                    Modifier Votre Mot De Passe
                  </button>
                  <div
                    style={
                      show
                        ? {
                            maxWidth: "300px",
                            textAlign: "center",
                            paddingTop: "20px",
                            // display: "none",
                          }
                        : { display: "none" }
                    }
                  >
                    <TextField
                      text
                      onChange={handleChange}
                      type="password"
                      required
                      name="actualPassword"
                      value={newPassword.actualPassword}
                      size="small"
                      variant="outlined"
                      min="6"
                      id="input-with-icon-textfield"
                      placeholder="Ancien mot de passe"
                    />
                    <TextField
                      onChange={handleChange}
                      text
                      type="password"
                      required
                      name="newPassword"
                      size="small"
                      variant="outlined"
                      min="6"
                      id="input-with-icon-textfield"
                      placeholder="Nouveau mot de passe"
                      value={newPassword.newPassword}
                    />
                    <TextField
                      onChange={handleChange}
                      value={newPassword.confirmPassword}
                      text
                      type="password"
                      required
                      name="confirmPassword"
                      size="small"
                      variant="outlined"
                      min="6"
                      id="input-with-icon-textfield"
                      placeholder="Confirmez le  mot de passe"
                    />
                    <button
                      style={{ width: "40px" }}
                      type="button"
                      className="btn btn-info btn-rounded"
                      onClick={() => {
                        dispatch(
                          updateProfilePassword(
                            newPassword.actualPassword,
                            newPassword.newPassword,
                            newPassword.confirmPassword
                          )
                        );
                        setNewPassword({
                          actualPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        handleShow();
                        alert("Votre mot de passe est changé");
                      }}
                    >
                      Valider
                    </button>
                  </div>
                </div>
                <div style={{ paddingTop: "25px", textAlign: "left" }}>
                  <button
                    type="button"
                    class="btn btn-danger btn-rounded"
                    onClick={() => setShowModal(true)}
                  >
                    Supprimer Votre Compte
                  </button>
                  <DeleteConfirmation
                    showModal={showModal}
                    hideModal={() => setShowModal(false)}
                    confirmModal={deleteProfileNow}
                    message="
                    êtes-vous sûr de vouloir supprimer votre compte"
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
