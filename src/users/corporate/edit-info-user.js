import React, { useEffect } from "react";
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
import { Checkbox, FormControlLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import * as EmailValidator from "email-validator";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import logoImage from "./../../images/logo.png";

import ValidateInfo from "./Validation";
import BookService from "../../services/CorporateBookService";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import DateField from "./DateField";

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

  backButton: {
    marginBottom: "20px",
    textDecoration: "none !important",
    padding: "10px",
  },

  editInfoButton: {
    marginTop: "20px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
  },

  cancelTimeButton: {
    marginTop: "20px",
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

  Box: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    //maxWidth: "300px",
    borderRadius: "10px",
    boxShadow: "2px 4px #ddd",
    marginTop: "5px",
    marginBottom: "15px",
    textAlign: "left",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Packages = [
  {packageName: 'Consultation with Consultant Gynaecologist'},
  {packageName: `Coil Fitting/Coil Removal`},
  {packageName: `Well Woman Check`},
  {packageName: `Sexual Health Screening`},
  {packageName: `Pre-pregnancy/Fertility check`},
  {packageName: `Gynaecological Ultrasound`},
  {packageName: `HPV Vaccination`},
  {packageName: `Cervical / Pap Smear`},
  {packageName: `HPV Treatment / Wart Cryo-Therapy`},
  {packageName: `Consultation` },
];

export default function EditInfoUser() {
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

  const saveClicked = (event) => {
    // console.log(ValidateInfo(state,setState));

    if (ValidateInfo(state, setState)) {
      setSaving(true);
      const person = {
        bookingId: state.userBooking._id,
        fullname: firstname,
        email: email,
        phone: phone,
        service: service,
        notes: notes,
        bookingDate: state.userBooking.bookingDate,
        bookingTime: state.userBooking.bookingTime,
        bookingRef: state.userBooking.bookingRef,
      };

      BookService.updateBooking({
        bookingId: state.userBooking._id,
        person: person,
      })
        .then((res) => {
          setSaving(false);

          setState((state) => ({
            ...state,
            editInfoClicked: false,
            editInfoResult: true,
          }));
        })
        .catch((err) => {
          console.log(err);
          setSaving(false);
        });
    }
  };

  const backButtonClicked = (event) => {
    setState((state) => ({
      ...state,
      welcomeUser: false,
      editInfoClicked: false,
    }));
  };

  const [firstname, setFirstname] = React.useState(
    state.userBooking.fullname ?? ""
  );
  const [email, setEmail] = React.useState(state.userBooking.email ?? "");
  const [retypeEmail, setRetypeEmail] = React.useState(
    state.userBooking.email ?? ""
  );
  const [phone, setPhone] = React.useState(state.userBooking.phone ?? "");

  const [service, setService] = React.useState(state.userBooking.service ?? "");
  const [notes, setNotes] = React.useState(state.userBooking.notes ?? "");

  const [changed, setChanged] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  const [fieldChanged, setFieldChanged] = React.useState(false);

  useEffect(() => {
    setState((state) => ({ ...state, firstname: state.userBooking.fullname }));
    setState((state) => ({ ...state, email: state.userBooking.email }));
    setState((state) => ({ ...state, retypeEmail: state.userBooking.email }));
    setState((state) => ({ ...state, phone: state.userBooking.phone }));
    setState((state) => ({ ...state, service: state.userBooking.service }));
    setState((state) => ({ ...state, notes: state.userBooking.notes }));
  }, []);

  useEffect(() => {
    setChanged(
      firstname !== state.userBooking.fullname ||
        email !== state.userBooking.email ||
        phone !== state.userBooking.phone ||
        service !== state.userBooking.service ||
        notes !== (state.userBooking.notes || "")
    );
  }, [fieldChanged]);

  const firstnameChanged = (event) => {
    setFirstname(event.target.value);
    setState((state) => ({ ...state, firstname: event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0) {
      setState((state) => ({ ...state, firstnameError: false }));
    }

    setFieldChanged(!fieldChanged);
  };

  const emailChanged = (event) => {
    setEmail(event.target.value);
    setState((state) => ({ ...state, email: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, emailError: false }));
      setState((state) => ({ ...state, retypeEmailError: false }));
    }

    setFieldChanged(!fieldChanged);
  };

  const retypeEmailChanged = (event) => {
    setRetypeEmail(event.target.value);
    setState((state) => ({ ...state, retypeEmail: event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value)) {
      setState((state) => ({ ...state, retypeEmailError: false }));
    }

    setFieldChanged(!fieldChanged);
  };

  const phoneChanged = (event) => {
    setPhone(event.target.value);
    setState((state) => ({ ...state, phone: event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6) {
      setState((state) => ({ ...state, phoneError: false }));
    }

    setFieldChanged(!fieldChanged);
  };

  const serviceChanged = (event) => {
    setService(event.target.value);
    setState((state) => ({ ...state, service: event.target.value }));
    setFieldChanged(!fieldChanged);
  };

  const notesChanged = (event) => {
    setNotes(event.target.value);
    setState((state) => ({ ...state, notes: event.target.value }));
    setFieldChanged(!fieldChanged);
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

          </Typography>

          <Grid
            container
            spacing={3}
            alignItems="baseline"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <Grid item xs={12} md={6}>
              <TextField
                error={state.firstnameError ? true : false}
                required
                id="firstName"
                label="Full Name"
                fullWidth
                autoComplete="name"
                value={firstname}
                onChange={firstnameChanged}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.phoneError ? true : false}
                required
                id="phone"
                label="Telephone Number"
                fullWidth
                autoComplete="tel"
                value={phone}
                onChange={phoneChanged}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={state.emailError ? true : false}
                required
                id="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                type="email"
                value={email}
                onChange={emailChanged}
                // helperText = 'This email address is where you will receive your results.'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.retypeEmailError ? true : false}
                required
                id="retypeEmail"
                label="Retype Email Address"
                fullWidth
                autoComplete="none"
                type="email"
                value={retypeEmail}
                onChange={retypeEmailChanged}
                // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
              />
            </Grid>
          </Grid>

          {/* <Divider/> */}

          <Grid
            container
            spacing={3}
            alignItems="baseline"
            style={{ paddingTop: "0px", paddingBottom: "20px" }}
          >

            <Grid item xs={12} md={12}>
              <TextField
                id="firstName"
                label="Notes"
                multiline
                fullWidth
                autoComplete="none"
                value={notes}
                onChange={notesChanged}
              />
            </Grid>
          </Grid>

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
                  disabled={saving || !changed}
                  fullWidth
                  variant="contained"
                  className={classes.editInfoButton}
                  color="primary"
                  onClick={saveClicked}
                  onTouchTap={saveClicked}
                >
                  Save Changes
                </Button>
              </Grid>

              <Grid item xs>
                <Button
                  disabled={saving}
                  fullWidth
                  variant="contained"
                  className={classes.backButton}
                  color="default"
                  onClick={backButtonClicked}
                  onTouchTap={backButtonClicked}
                >
                  Back
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

        <Backdrop className={classes.backdrop} open={saving}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Copyright />
      </main>
    </React.Fragment>
  );
}
