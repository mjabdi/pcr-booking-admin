import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GlobalState from "./../../GlobalState";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import HttpsIcon from "@material-ui/icons/Https";

import doneImage from "./../../images/ok.png";

import { BrowserView, MobileView, isMobile } from "react-device-detect";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import { Grid } from "@material-ui/core";

import logoImage from "./../../images/logo.png";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

import gynaeImage from "./../../images/gynae-clinic.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link color="inherit" href="#">
        <strong> Medical Express Clinic </strong>
      </Link>
      {isMobile ? " " : " All rights reserved."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: "center",
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px",
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px",
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
  },

  privacyButton: {
    marginBottom: "20px",
  },

  textContent: {
    color: "#666f77",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400",
  },

  textContentMobile: {
    color: "#666f77",
    fontSize: "0.9rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400",
  },

  getStartedButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px",
  },

  errorImage: {
    width: "200px",
    height: "190px",
    marginBottom: "30px",
  },
}));

export default function CanceledResultUser() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStartedClicked = (event) => {
    window.location.href = "https://travelpcrtest.com/";
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item item xs={10}>
              <Typography
                style={{ fontWeight: "400" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                Medical Express Clinic
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <img
                className={classes.logoImage}
                src={logoImage}
                alt="logo image"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar> */}
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ fontWeight: 700, marginBottom: "20px" }}
            component="h1"
            variant="h6"
            align="center"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <img
                className={classes.gynaeLogo}
                src={gynaeImage}
                alt="logo image"
              /> */}
            </div>
          </Typography>

          <React.Fragment>
            <img
              className={classes.doneImage}
              src={doneImage}
              alt="Error image"
            />

            <Typography variant="h6" gutterBottom>
              Thank you for letting us know.
              <br />
              Your appointment was successfully cancelled.
              <br />
              <strong>Your refund will be processed in 3 working days.</strong>
              <br/>
              <br />
              You can book a new appointment if needed later on.
            </Typography>
            <br />

            {/* <Button 
                  variant="contained" 
                  className={classes.getStartedButton} 
                  color="primary"
                  onClick={getStartedClicked}
                  onTouchTap={getStartedClicked} 
                  >
            Book New appointment
         </Button> */}
          </React.Fragment>
        </Paper>

        {/* <Button
          variant="contained"
          className={classes.privacyButton}
          color="secondary"
          startIcon={<HttpsIcon />}
          onClick={handleClickOpen("paper")}
          onTouchTap={handleClickOpen("paper")}
        >
          Privacy
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            Application Disclaimer
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "10px" }}>
              Medical Express Clinic will not contact you for any other reason
                than to share your test results, and certificate if selected,
                via the email address provided. The information provided to us
                via this registration form is never shared with any other
                organisations, except when this is required by law. Information
                provided will never be used for marketing purposes, you cannot
                opt in. In the case of a notable health result, our doctor will
                call on the telephone number provided to inform you of your
                result and provide additional advice or guidance. If we cannot
                get hold of you, we will email you asking you to contact the
                clinic.
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Copyright /> */}
      </main>
    </React.Fragment>
  );
}
