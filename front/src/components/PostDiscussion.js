import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/PostDeal.css";

import TextField from "@material-ui/core/TextField";

import "draft-js/dist/Draft.css";
import Button from "@material-ui/core/Button";

import "date-fns";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";

import { postDiscussion } from "../actions/discussionActions";
import Discussion from "./Discussion";

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
const PostDiscussion = ({ history }) => {
  const dispatch = useDispatch();

  // setimageDeal(res.data.pictureName)

  const auth = useSelector((state) => state.AuthReducer);

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
  const [discussion, setDiscussion] = useState({
    titre: "Donnez un titre à votre discussion",
    description: "Présentez la discussion ...",
    user: auth.user,
    url: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setDiscussion({ ...discussion, [e.target.name]: e.target.value });
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const classes = useStyles();

  const postDiscussionNow = (e) => {
    e.preventDefault();
    dispatch(
      postDiscussion(
        {
          titre: discussion.titre,
          description: discussion.description,
          groupe: chipData[0].label,
          owner: auth.user,
          userAvatar: auth.user.avatar,
          userPseudo: auth.user.pseudo,
        },
        history
      )
    );
    history.push("/");
  };
  return (
    <div style={{ paddingTop: "70px" }}>
      <Container className="container-post" style={{ height: "90vh" }}>
        <Row className="deal-container">
          <Col xs={1}></Col>
          <Col className="post-form" xs={5} style={{ minWidth: "350px" }}>
            <div className="title-post">Poster une discussion ‌</div>
            <form noValidate autoComplete="off" onSubmit={postDiscussionNow}>
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
                placeholder="Donner un titre à votre discussion..."
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
                placeholder="Présentez la discussion  en quelques mots..."
              />

              <h2>GROUPES</h2>
              <div style={{ paddingBottom: "20px", color: "#5a5d62" }}>
                Quelle est la catégorie principale de votre discussion ?
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

          <Col
            xs={5}
            className="deal-container"
            style={{ backgroundColor: "#e9eaed" }}
          >
            <Discussion discussion={discussion} chipData={chipData} />
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostDiscussion;
