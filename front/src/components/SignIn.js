import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { loadUser, registerUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/home">
        Smart Deals
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (auth.isAuth) {
      history.push("/");
      dispatch(loadUser());
    }
  }, [auth.isAuth]);
  const [showRegister, setShowRegister] = useState(true);
  const [info, setInfo] = useState({
    pseudo: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const signInNow = (e) => {
    e.preventDefault();
    dispatch(registerUser(info));
  };

  return (
    <div>
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
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className="sign-up">
                    <Avatar
                      style={{ backgroundColor: "white", fontSize: "25px" }}
                    >
                      <i
                        class="fas fa-user-plus"
                        style={{
                          color: "#03a5c1",
                          backgroundColor: "white",
                          fontSize: "27px",
                        }}
                      ></i>
                    </Avatar>
                    <Typography
                      style={{ paddingBottom: "10px" }}
                      component="h1"
                      variant="h5"
                    >
                      S'enregistrer avec une adresse e-mail
                    </Typography>
                    <form noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            autoComplete="pseudo"
                            name="pseudo"
                            variant="outlined"
                            required
                            fullWidth
                            id="pseudo"
                            label="Pseudo"
                            autoFocus
                            onChange={handleChange}
                            inputProps={{ maxLength: 20 }}
                            error={
                              !auth.isAuth &&
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "Veuillez choisir un pseudo" ||
                                auth.errors.errors[0].msg ===
                                  "*un pseudo est requis" ||
                                auth.errors.errors[0].msg ===
                                  "Utilisateur existe déja")
                                ? true
                                : false
                            }
                            helperText={
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "Veuillez choisir un pseudo" ||
                                auth.errors.errors[0].msg ===
                                  "*un pseudo est requis" ||
                                auth.errors.errors[0].msg ===
                                  "Utilisateur existe déja")
                                ? auth.errors.errors[0].msg
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Email "
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            error={
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "Veuillez choisir une adresse email valide" ||
                                auth.errors.errors[0].msg ===
                                  "*une adresse email est requise")
                                ? true
                                : false
                            }
                            helperText={
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "Veuillez choisir une adresse email valide" ||
                                auth.errors.errors[0].msg ===
                                  "*une adresse email est requise")
                                ? auth.errors.errors[0].msg
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            error={
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "le mot de passe doit avoir au moins 6 caractères" ||
                                auth.errors.errors[0].msg ===
                                  "*un mot de passe  est requis")
                                ? true
                                : false
                            }
                            helperText={
                              auth.errors &&
                              (auth.errors.errors[0].msg ===
                                "le mot de passe doit avoir au moins 6 caractères" ||
                                auth.errors.errors[0].msg ===
                                  "*un mot de passe  est requis")
                                ? auth.errors.errors[0].msg
                                : ""
                            }
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControlLabel
                            style={{ paddingBottom: "10px" }}
                            control={
                              <Checkbox
                                value="allowExtraEmails"
                                color="primary"
                              />
                            }
                            label="
                J'ai lu et j'accepte les Conditions Générales d'Utilisation ainsi que la Politique de confidentialité"
                          />
                        </Grid>
                      </Grid>
                      <div
                        className="submit-register-btn"
                        style={{ textAlign: "center" }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="default"
                          style={{
                            paddingBottom: "10px",
                            color: "white",
                            backgroundColor: "#5A6268",
                          }}
                          onClick={signInNow}
                        >
                          <Link style={{ color: "white" }}>
                            Créer un compte
                          </Link>
                        </Button>
                      </div>

                      <Grid container justify="flex-end">
                        <Grid item style={{ paddingTop: "10px" }}>
                          <Link to="/connexion" variant="body2">
                            Vous avez déja un compte ?
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </Container>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
