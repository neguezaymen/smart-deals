import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";

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

export default function GroupList() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Hight-Tech" },
    { key: 1, label: "Cosmétiques" },
    { key: 2, label: "Consoles" },
    { key: 3, label: "Voyages" },
  ]);

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

  return (
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
  );
}
