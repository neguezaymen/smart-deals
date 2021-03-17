import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const images = [
  {
    key: "1",
    url:
      "https://www.7x24.services/wp-content/uploads/2016/08/tablet_smart_phone_hi_tech_icons_hand_96123_3840x2400.jpg",
    title: "Hight-Tech",
    width: "22%",
  },
  {
    url:
      "data:image/jpeg;base64,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",
    title: "Cosmétiques",
    width: "22%",
  },

  {
    url:
      "https://blogue.bestbuy.ca/wp-content/uploads/sites/3/2019/11/ConsoleBuyGuideBig3.jpg",
    title: "Consoles",
    width: "22%",
  },
  {
    url:
      "https://www.voyagesmazagan.ca/wp-content/uploads/2018/09/voyages-mazagan-travel-agency-montreal-canada-voyages-petits-groupes-voyage-en-famille-assurances-voyages-voyages-sur-mesure-3.jpg",
    title: "Voyages",
    width: "22%",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "80%",
  },
  image: {
    position: "relative",
    height: 70,
    margin: "10px 10px",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        // border: "2px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
    borderRadius: "7px",
  },
  imageTitle: {
    position: "relative",
    padding: "5px",
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

export default function ButtonBases() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
              borderRadius: "7px",
            }}
          />

          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              <Link
                to={`groupes/${image.title}`}
                style={{ color: "white" }}
                className="Link-img"
              >
                {image.title}
              </Link>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}
