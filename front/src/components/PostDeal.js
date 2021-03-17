import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/PostDeal.css";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import "draft-js/dist/Draft.css";
import Button from "@material-ui/core/Button";
import EuroIcon from "@material-ui/icons/Euro";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { postDeal } from "../actions/dealActions";
import Deal from "./Deal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));
const PostDeal = ({ history }) => {
  const dispatch = useDispatch();

  // setimageDeal(res.data.pictureName)

  const auth = useSelector((state) => state.AuthReducer);
  const deals = useSelector((state) => state.dealReducer);
  // useEffect(() => {
  //   if (window.performance.navigation.type == 1 && deals.postStatus) {
  //     history.push("/");
  //   }
  // }, [deals.postStatus]);

  const [chipData, setChipData] = useState([
    { key: 0, label: "Hight-Tech" },
    { key: 1, label: "Cosmétiques" },
    { key: 2, label: "Consoles" },
    { key: 3, label: "Voyages" },
  ]);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2021-01-01T21:11:54")
  );
  const handleClick = (chipToClick) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key == chipToClick.key));
  };
  const handleDelete = (chipToDelete) => () => {
    setChipData([
      { key: 0, label: "Hight-Tech" },
      { key: 1, label: "Cosmétiques" },
      { key: 2, label: "Consoles" },
      { key: 3, label: "Voyages" },
    ]);
  };
  const [deal, setDeal] = useState({
    lien: "",
    prix: "",
    prixHabituel: "",
    titre: "Donnez un titre",
    description: "Présentez le produit ou l'offre ...",
    user: auth.user,
    url: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  const postDealNow = (e) => {
    e.preventDefault();
    dispatch(
      postDeal(
        {
          lien: deal.lien,
          prix: deal.prix,
          prixHabituel: deal.prixHabituel,
          titre: deal.titre,
          description: deal.description,
          groupe: chipData[0].label,
          expireLe: selectedDate,
          owner: auth.user,
          url: deal.url,
          userAvatar: auth.user.avatar,
          userPseudo: auth.user.pseudo,
        },
        history
      )
    );
  };

  return (
    <div style={{ paddingTop: "70px" }}>
      <Container className="container-post">
        <Row className="deal-container">
          <Col xs={1}></Col>
          <Col className="post-form" xs={5} style={{ minWidth: "350px" }}>
            <div className="title-post">Poster un nouveau deal ‌</div>
            <form noValidate onSubmit={postDealNow}>
              <h1>Lien</h1>
              <TextField
                onChange={handleChange}
                required
                fullWidth={true}
                id="outlined-error-helper-text"
                variant="outlined"
                size="small"
                placeholder="https://www.exemple.com/deal"
                name="lien"
                error={
                  deals &&
                  deals.errors &&
                  deals.errors.errors[0].msg === "*un lien est requis"
                    ? true
                    : false
                }
                helperText={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*un lien est requis"
                    ? deals.errors.errors[0].msg
                    : ""
                }
              />
              <div style={{ paddingBottom: "20px", color: "#5a5d62" }}>
                Veuillez donner le lien de la page du Deal
              </div>
              <h1>Photo </h1>
              <TextField
                onChange={handleChange}
                required
                fullWidth={true}
                id="outlined-error-helper-text"
                variant="outlined"
                size="small"
                placeholder="https://www.exemple.com/deal.jpg"
                name="url"
                error={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*une photo est requise"
                    ? true
                    : false
                }
                helperText={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*une photo est requise"
                    ? deals.errors.errors[0].msg
                    : ""
                }
              />
              <div style={{ paddingBottom: "20px", color: "#5a5d62" }}>
                Veuillez donner le URL de la photo
              </div>
              <Divider />
              <h1 style={{ paddingTop: "10px" }}>Description</h1>

              <h2>PRIX</h2>
              <TextField
                // error
                // helperText="fefe"
                onChange={handleChange}
                text
                type="number"
                required
                name="prix"
                size="small"
                variant="outlined"
                min="1"
                id="input-with-icon-textfield"
                placeholder="0.00"
                error={
                  deals.errors && deals.errors.errors[0].msg === "*prix requis"
                    ? true
                    : false
                }
                helperText={
                  deals.errors && deals.errors.errors[0].msg === "*prix requis"
                    ? deals.errors.errors[0].msg
                    : ""
                }
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon style={{ color: " #36b7cd" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <h2>PRIX HABITUEL</h2>
              <TextField
                required
                onChange={handleChange}
                type="number"
                size="small"
                name="prixHabituel"
                variant="outlined"
                id="input-with-icon-textfield"
                placeholder="0.00"
                error={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*prix habituel requis"
                    ? true
                    : false
                }
                helperText={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*prix habituel requis"
                    ? deals.errors.errors[0].msg
                    : ""
                }
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="start">
                      <EuroIcon style={{ color: " #36b7cd" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <h2>TITRE</h2>

              <TextField
                // error
                // helperText="invalid titre"
                onChange={handleChange}
                fullWidth={true}
                required
                size="small"
                name="titre"
                variant="outlined"
                id="input-with-icon-textfield"
                placeholder="Veuillez donner un titre à votre Deal..."
                error={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*un titre est requis"
                    ? true
                    : false
                }
                helperText={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*un titre est requis"
                    ? deals.errors.errors[0].msg
                    : ""
                }
              />
              <h2>DESCRIPTION</h2>
              <TextField
                required
                onChange={handleChange}
                fullWidth={true}
                size="small"
                multiline="true"
                rows="7"
                name="description"
                variant="outlined"
                id="input-with-icon-textfield"
                placeholder="Présentez le produit ou l'offre en quelques mots..."
                error={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*une description est requise"
                    ? true
                    : false
                }
                helperText={
                  deals.errors &&
                  deals.errors.errors[0].msg === "*une description est requise"
                    ? deals.errors.errors[0].msg
                    : ""
                }
              />

              <h2>GROUPES</h2>
              <div style={{ paddingBottom: "20px", color: "#5a5d62" }}>
                Quelle est la catégorie principale de votre deal ?
              </div>
              <Paper component="ul" className={classes.root}>
                {chipData.map((data) => {
                  return (
                    <li style={{ color: "#36B7CD" }} key={data.key}>
                      <Chip
                        label={data.label}
                        onClick={handleClick(data)}
                        onDelete={handleDelete(data)}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                      />
                    </li>
                  );
                })}
              </Paper>
              <h2 style={{ paddingTop: "10px" }}>EXPIRE LE</h2>
              <div style={{ textAlign: "left" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      required
                      disableToolbar
                      expireLe="lien"
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>

              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    backgroundColor: "#36B7CD",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Valider
                </Button>
              </div>
            </form>
          </Col>

          <Col xs={5} className="deal-container">
            <Deal deal={deal} selectedDate={selectedDate} chipData={chipData} />
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostDeal;
