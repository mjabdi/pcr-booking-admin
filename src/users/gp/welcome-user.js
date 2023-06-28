import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import GlobalState from "../../GlobalState";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import HttpsIcon from "@material-ui/icons/Https";

import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import { Divider, Grid } from "@material-ui/core";

import logoImage from "./../../images/logo.png";
import doctorImage from "./../../images/doctor.png";


import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { FormatDateFromStringWithSlash } from "../../DateFormatter";

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
    color: "#222",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "20px",
    paddingRight: "20px",
    lineHeight: "1.5em",
    fontWeight: "400",
  },

  textContentMobile: {
    color: "#222",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "20px",
    paddingRight: "20px",
    lineHeight: "1.5em",
    fontWeight: "400",
  },

  getStartedButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },

  changeTimeButton: {
    marginTop: "20px",
    textDecoration: "none !important",
    padding: "10px",
  },

  editInfoButton: {
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
  },

  cancelTimeButton: {
    marginBottom: "20px",
    backgroundColor: "#d90015",
    "&:hover": {
      background: "#b80012",
      color: "#fff",
    },

    padding: "10px",
  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px",
  },

  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },

  li: {
    marginBottom: "5px",
  },

  infoDetails: {
    textAlign: "left",
  },

  infoTitle: {
    fontWeight: "800",
    marginRight: "10px",
  },

  infoData: {
    fontWeight: "400",
  },

  pageTitle:{
    color : "#f68529",
    marginTop : "10px"
  },

  doctorImage: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },


}));

export default function WelcomeUser() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [disableChange, setDisableChange] = React.useState(false)


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }

      if (shouldDisableChange()){
        setDisableChange(true)
      }
    }
  }, [open]);

  const shouldDisableChange = () =>
  {
    const today = new Date()
    const bookdate = new Date(state.userBooking.bookingDate)

    let hour = parseInt(state.userBooking.bookingTime.substr(0,2))
    if (state.userBooking.bookingTime.indexOf("PM") > 0 && hour < 12)
    {
      hour += 12
    }

    bookdate.setHours(hour)

    let diff = (bookdate.getTime() - today.getTime()) / (1000 * 60 * 60)

    return diff < 24
  }


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeTimeClicked = (event) => {
    setState((state) => ({
      ...state,
      welcomeUser: true,
      changeTimeClicked: true,
    }));
  };

  const editInfoClicked = (event) => {
    setState((state) => ({
      ...state,
      welcomeUser: true,
      editInfoClicked: true,
    }));
  };

  const cancelTimeClicked = (event) => {
    setState((state) => ({
      ...state,
      welcomeUser: true,
      cancelTimeClicked: true,
    }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item xs={10}>
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
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ fontWeight: 700, marginBottom: "50px" }}
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

              <img
                className={classes.doctorImage}
                src={doctorImage}
                alt="doctor image"
              />
              
              <span className={classes.pageTitle}> 
                  Private GP in London 
              </span>
            </div>
          </Typography>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Welcome Back {state.userBooking.fullname},
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Do you want to change or cancel your appointment?
          </p>

          <Divider />

          {!state.userBooking.tr && (
            <div
              style={{
                textAlign: "left",
                paddingLeft: "20px",
                paddingTop: "10px",
              }}
            >
              <ul className={classes.ul}>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Booked Date</span>{" "}
                  <span className={classes.infoData}>
                    {FormatDateFromStringWithSlash(
                      state.userBooking.bookingDate
                    )}
                  </span>
                </li>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Booked Time</span>{" "}
                  <span className={classes.infoData}>
                    {state.userBooking.bookingTime}
                  </span>
                </li>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Fullname</span>{" "}
                  <span className={classes.infoData}>
                    {state.userBooking.fullname}
                  </span>
                </li>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Email</span>{" "}
                  <span className={classes.infoData}>
                    {state.userBooking.email}
                  </span>
                </li>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Telephone</span>{" "}
                  <span className={classes.infoData}>
                    {state.userBooking.phone}
                  </span>
                </li>
                <li className={classes.li}>
                  <span className={classes.infoTitle}>Notes</span>{" "}
                  <span className={classes.infoData}>
                    {state.userBooking.notes || "-"}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <Divider />

          <div
            style={
              isBrowser
                ? { paddingLeft: "50px", paddingRight: "50px" }
                : { paddingLeft: "10px", paddingRight: "10px" }
            }
          >
            <Grid
              container
              spacing={3}
              direction="column"
              justify="space-between"
              alignItems="stretch"
            >
              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.changeTimeButton}
                  color="primary"
                  onClick={changeTimeClicked}
                  onTouchTap={changeTimeClicked}
                  disabled={disableChange}

                >
                  Change My appointment Time
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.editInfoButton}
                  color="primary"
                  onClick={editInfoClicked}
                  onTouchTap={editInfoClicked}
                >
                  Edit My Info
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.cancelTimeButton}
                  color="primary"
                  onClick={cancelTimeClicked}
                  onTouchTap={cancelTimeClicked}
                  disabled={disableChange}

                >
                  Cancel my appointment
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>

        <Button
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
                clinic.{" "}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Copyright />
      </main>
    </React.Fragment>
  );
}
