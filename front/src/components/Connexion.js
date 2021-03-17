import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import logo from "../res/logo.png";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { loadUser, loginUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const Connexion = ({ history }) => {
  const [showConnection, setShowConnection] = useState(true);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (auth.isAuth) {
      history.push("/");
      dispatch(loadUser());
    }
  }, [auth.isAuth]);
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(info));
  };
  return (
    <div>
      <div>
        {showConnection && (
          <div className={"connection-wrapper"}>
            <div
              className={"connection-backdrop"}
              onClick={() => setShowConnection(false)}
            />
            <div className={"connection-box"}>
              <div className="close-cnx-box">
                <i
                  className="fas fa-times"
                  onClick={() => setShowConnection(false)}
                ></i>
              </div>
              <div className="cnx-modal">
                <div className="titre-modal">Bienvenue Sur Smart Deals</div>
                <img src={logo} alt="logo" width="200px" />
                <div className="logo-title2">
                  <span className="span-d">S</span>mart{" "}
                  <span className="span-d">D</span>eals
                </div>
                <div className="rejoinez">Rejoignez la communauté !</div>
                <div className="des-com">
                  Sur Smart Deals, vous trouverez les meilleurs deals de vos
                  marques et marchands préférés, partagés par notre communauté
                </div>
              </div>
              <div className="cnx-modal-2 ">
                <LockIcon style={{ color: "#027387", fontSize: "60px" }} />
                <div className="rejoinez">Connexion</div>

                <TextField
                  required
                  label="Adresse Email"
                  variant="outlined"
                  size="small"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  error={
                    auth.errors &&
                    (auth.errors.errors[0].msg ===
                      "Veuillez entrez votre adresse email" ||
                      auth.errors.errors[0].msg ===
                        "Veuillez Entrez une adresse email valide" ||
                      auth.errors.errors[0].msg ===
                        "Veuillez créer un compte avant")
                      ? true
                      : false
                  }
                  helperText={
                    auth.errors &&
                    (auth.errors.errors[0].msg ===
                      "Veuillez entrez votre adresse email" ||
                      auth.errors.errors[0].msg ===
                        "Veuillez Entrez une adresse email valide" ||
                      auth.errors.errors[0].msg ===
                        "Veuillez créer un compte avant")
                      ? auth.errors.errors[0].msg
                      : ""
                  }
                />
                <TextField
                  required
                  label="Mot De Passe"
                  id="outlined-margin-none"
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  size="small"
                  error={
                    auth.errors &&
                    (auth.errors.errors[0].msg ===
                      "Veuillez Entrez votre mot de passe" ||
                      auth.errors.errors[0].msg === "Mot de passe incorrect")
                      ? true
                      : false
                  }
                  helperText={
                    auth.errors &&
                    (auth.errors.errors[0].msg ===
                      "Veuillez Entrez votre mot de passe" ||
                      auth.errors.errors[0].msg === "Mot de passe incorrect")
                      ? auth.errors.errors[0].msg
                      : ""
                  }
                />

                <Button className="btn-cnx" variant="secondary" onClick={login}>
                  Connexion
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Connexion;
