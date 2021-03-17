import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import logo from "../res/logo.png";
import LockIcon from "@material-ui/icons/Lock";
import TextField from "@material-ui/core/TextField";
import SignUp from "./Connexion";
import { Link } from "react-router-dom";
const ConnectionModal = () => {
  const [showConnection, setShowConnection] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <button
          type="button"
          className="cnx-btn"
          onClick={() => setShowConnection(true)}
        >
          <i class="fas fa-user person-cnx"></i>
          <Link to="/connexion">Connexion</Link>
        </button>
        {showConnection && (
          <div className={"connection-wrapper"}>
            <div
              className={"connection-backdrop"}
              onClick={() => setShowConnection(false)}
            />
            <div className={"connection-box"}>
              <div className="close-cnx-box">
                <i
                  class="fas fa-times"
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
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowConnection(false);
                    setShowRegister(true);
                  }}
                >
                  Créer un compte
                </Button>
              </div>
              <div className="cnx-modal-2 ">
                <LockIcon style={{ color: "#027387", fontSize: "60px" }} />
                <div className="rejoinez">Connexion</div>

                <TextField
                  required
                  label="Adresse Email"
                  variant="outlined"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
                <TextField
                  required
                  label="Mot De Passe"
                  id="outlined-margin-none"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />

                <Button className="btn-cnx" variant="secondary">
                  Connexion
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {showRegister && (
          <div className={"register-wrapper"}>
            <div
              className={"register-backdrop"}
              onClick={() => setShowRegister(false)}
            />
            <div className={"register-box"}>
              <div className="close-sign-up-box">
                <i
                  class="fas fa-times"
                  onClick={() => setShowRegister(false)}
                ></i>
              </div>
              <div>
                <SignUp />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionModal;
