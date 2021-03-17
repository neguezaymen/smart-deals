import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <i className="far fa-comment-dots dots"></i>
        FeedBack
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ color: "#03A5C1" }}>
          {"Donner Votre Avis !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Votre avis nous intéresse !</DialogContentText>
          <TextField
            size="small"
            id="outlined-basic"
            label="Message"
            variant="outlined"
            fullWidth={true}
            rows="7"
            multiline="true"
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            style={{ color: "#03A5C1", outline: "none" }}
          >
            Fermer
          </Button>
          <Button
            onClick={handleClose}
            style={{ color: "#03A5C1", outline: "none" }}
            autoFocus
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
