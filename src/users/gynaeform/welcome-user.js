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

import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";

import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

import logoImage from "./../../images/logo.png";

import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { FormatDateFromStringWithSlash } from "../../DateFormatter";

import gynaeImage from "./../../images/gynae-clinic.png";
import DateField from "../gynae/DateField";
import GynaeBookService from "../../services/GynaeBookService";

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
    fontSize: "0.95rem",
    textAlign: "justify",
    paddingLeft: "20px",
    paddingRight: "20px",
    lineHeight: "1.5em",
    fontWeight: "400",
  },

  textContentMobile: {
    color: "#222",
    fontSize: "0.95rem",
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
    backgroundColor: "#f280c4",
    "&:hover": {
      background: "#ff9cd7",
      color: "#fff",
    },
    textDecoration: "none !important",
    padding: "10px",
    marginBottom: "20px",
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

  formTitle: {
    width: "100%",
    fontSize: "1.5rem",
    fontWeight: "500",
    textAlign: "center",
    // marginTop: "-5px",
    color: "#f280c4",
    marginBottom: "30px",
  },

  gynaeLogo: {
    width: "100px",
    height: "40px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function WelcomeUser() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();

  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const [submitting, setSubmitting] = React.useState(false);

  const [hasErrors, setHasErrors] = React.useState(false);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    try {
      if (state.userBooking && state.userBooking.formData) {
        const {
          gender,
          title,
          forename,
          surname,
          birthDate,
          postCode,
          address,
          phone,
          mobile,
          attendReason,
          medication,
          allergy,
          medicationDetail,
          checkedVisitedCountry,
          countryVisitedDetail,
          tarvelledOutsideEU,
          haveGPUK,
        } = JSON.parse(state.userBooking.formData);

        console.log(JSON.parse(state.userBooking.formData));

        setState((state) => ({
          ...state,
          gender: gender,
          title: title,
          forename: forename,
          surname: surname,
          birthDate: birthDate,
          postCode: postCode,
          address: address,
          phone: phone,
          mobile: mobile,
          attendReason: attendReason,
          medication: medication,
          allergy: allergy,
          medicationDetail: medicationDetail,
          checkedVisitedCountry: checkedVisitedCountry,
          countryVisitedDetail: countryVisitedDetail,
          tarvelledOutsideEU: tarvelledOutsideEU,
          haveGPUK: haveGPUK,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const genderChanged = (event) => {
    setState((state) => ({ ...state, gender: event.target.value }));
    setState((state) => ({ ...state, genderError: false }));
  };

  const titleChanged = (event) => {
    setState((state) => ({ ...state, title: event.target.value }));
    setState((state) => ({ ...state, titleError: false }));
  };

  const forenameChanged = (event) => {
    setState((state) => ({ ...state, forename: event.target.value }));
    setState((state) => ({ ...state, forenameError: false }));
  };

  const surnameChanged = (event) => {
    setState((state) => ({ ...state, surname: event.target.value }));
    setState((state) => ({ ...state, surnameError: false }));
  };

  const birthDateChanged = (date) => {
    setState((state) => ({ ...state, birthDate: date }));
    setState((state) => ({ ...state, birthDateError: false }));
  };

  const postCodeChanged = (event) => {
    setState((state) => ({ ...state, postCode: event.target.value }));
    setState((state) => ({ ...state, postCodeError: false }));
  };

  const addressChanged = (event) => {
    setState((state) => ({ ...state, address: event.target.value }));
    setState((state) => ({ ...state, addressError: false }));
  };

  const phoneChanged = (event) => {
    setState((state) => ({ ...state, phone: event.target.value }));
    setState((state) => ({ ...state, phoneError: false }));
  };

  const mobileChanged = (event) => {
    setState((state) => ({ ...state, mobile: event.target.value }));
    setState((state) => ({ ...state, mobileError: false }));
  };

  const attendReasonChanged = (event) => {
    setState((state) => ({ ...state, attendReason: event.target.value }));
    setState((state) => ({ ...state, attendReasonError: false }));
  };

  const medicationChanged = (event) => {
    setState((state) => ({ ...state, medication: event.target.value }));
    setState((state) => ({ ...state, medicationError: false }));
  };

  const allergyChanged = (event) => {
    setState((state) => ({ ...state, allergy: event.target.value }));
    setState((state) => ({ ...state, allergyError: false }));
  };

  const medicationDetailChanged = (event) => {
    setState((state) => ({ ...state, medicationDetail: event.target.value }));
    setState((state) => ({ ...state, medicationDetailError: false }));
  };

  const visitedCountryYESChanged = (event) => {
    setState((state) => ({
      ...state,
      checkedVisitedCountry: event.target.checked,
    }));
    setState((state) => ({ ...state, checkedVisitedCountryError: false }));
  };

  const visitedCountryNOChanged = (event) => {
    setState((state) => ({
      ...state,
      checkedVisitedCountry: !event.target.checked,
    }));
    setState((state) => ({ ...state, checkedVisitedCountryError: false }));
  };

  const countryVisitedDetailChanged = (event) => {
    setState((state) => ({
      ...state,
      countryVisitedDetail: event.target.value,
    }));
    setState((state) => ({ ...state, countryVisitedDetailError: false }));
  };

  const tarvelledOutsideEUYESChanged = (event) => {
    setState((state) => ({
      ...state,
      tarvelledOutsideEU: event.target.checked,
    }));
    setState((state) => ({ ...state, tarvelledOutsideEUError: false }));
  };

  const tarvelledOutsideEUNOChanged = (event) => {
    setState((state) => ({
      ...state,
      tarvelledOutsideEU: !event.target.checked,
    }));
    setState((state) => ({ ...state, tarvelledOutsideEUError: false }));
  };

  const haveGPUKYESChanged = (event) => {
    setState((state) => ({ ...state, haveGPUK: event.target.checked }));
    setState((state) => ({ ...state, haveGPUKError: false }));
  };

  const haveGPUKNOChanged = (event) => {
    setState((state) => ({ ...state, haveGPUK: !event.target.checked }));
    setState((state) => ({ ...state, haveGPUKError: false }));
  };

  const ValidateFormData = (formData) => {
    let error = false;
    if (!formData.gender) {
      error = true;
      setState((state) => ({ ...state, genderError: true }));
    }

    if (!formData.title) {
      error = true;
      setState((state) => ({ ...state, titleError: true }));
    }

    if (!formData.forename || formData.forename.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, forenameError: true }));
    }

    if (!formData.surname || formData.surname.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, surnameError: true }));
    }

    if (!formData.birthDate || formData.birthDate.trim().length < 10) {
      error = true;
      setState((state) => ({ ...state, birthDateError: true }));
    }

    if (!formData.phone || formData.phone.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, phoneError: true }));
    }

    if (!formData.mobile || formData.mobile.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, mobileError: true }));
    }

    if (!formData.postCode || formData.postCode.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, postCodeError: true }));
    }

    if (!formData.address || formData.address.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, addressError: true }));
    }

    if (!formData.attendReason || formData.attendReason.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, attendReasonError: true }));
    }

    if (!formData.medication || formData.medication.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, medicationError: true }));
    }

    if (!formData.allergy || formData.allergy.trim().length < 1) {
      error = true;
      setState((state) => ({ ...state, allergyError: true }));
    }

    if (formData.allergy === "YES" || formData.medication === "YES") {
      if (
        !formData.medicationDetail ||
        formData.medicationDetail.trim().length < 1
      ) {
        error = true;
        setState((state) => ({ ...state, medicationDetailError: true }));
      }
    }

    if (formData.checkedVisitedCountry === undefined) {
      error = true;
      setState((state) => ({ ...state, checkedVisitedCountryError: true }));
    }

    if (formData.checkedVisitedCountry) {
      if (
        !formData.countryVisitedDetail ||
        formData.countryVisitedDetail.trim().length < 1
      ) {
        error = true;
        setState((state) => ({ ...state, countryVisitedDetailError: true }));
      }
    }

    if (formData.tarvelledOutsideEU === undefined) {
      error = true;
      setState((state) => ({ ...state, tarvelledOutsideEUError: true }));
    }

    if (formData.haveGPUK === undefined) {
      error = true;
      setState((state) => ({ ...state, haveGPUKError: true }));
    }

    return !error;
  };

  const submitForm = () => {
    const {
      gender,
      title,
      forename,
      surname,
      birthDate,
      postCode,
      address,
      phone,
      mobile,
      attendReason,
      medication,
      allergy,
      medicationDetail,
      checkedVisitedCountry,
      countryVisitedDetail,
      tarvelledOutsideEU,
      haveGPUK,
    } = state;

    const formData = {
      gender,
      title,
      forename,
      surname,
      birthDate,
      postCode,
      address,
      phone,
      mobile,
      attendReason,
      medication,
      allergy,
      medicationDetail,
      checkedVisitedCountry,
      countryVisitedDetail,
      tarvelledOutsideEU,
      haveGPUK,
    };

    setHasErrors(false);
    if (ValidateFormData(formData)) {
      setSubmitting(true);
      GynaeBookService.submitFormData(state.userBooking._id, formData)
        .then((res) => {
          setSubmitting(false);
          if (res && res.data && res.data.status === "OK") {
            setState((state) => ({
              ...state,
              welcomeUser: true,
              submitFormData: true,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
          setSubmitting(false);
        });
    } else {
      setHasErrors(true);
    }
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flext-start",
            }}
          >
            <img
              className={classes.gynaeLogo}
              src={gynaeImage}
              alt="logo image"
            />
          </div>

          <div className={classes.formTitle}>Registration Form</div>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            <span style={{ color: "#777" }}>Welcome Back </span>{" "}
            <i> {state.userBooking.fullname}, </i>
          </p>

          <p
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Please Complete the <i>Registration Form</i> below:
          </p>

          <Grid
            container
            spacing={3}
            alignItems="baseline"
            style={{
              padding: "10px",
              paddingBottom: "50px",
              paddingTop: "20px",
            }}
          >
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="gender-label-id">Gender</InputLabel>
                <Select
                  error={state.genderError ? true : false}
                  fullWidth
                  labelId="gender-label-id"
                  id="gender-id"
                  value={state.gender || ""}
                  onChange={genderChanged}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="title-label-id">Title</InputLabel>
                <Select
                  error={state.titleError ? true : false}
                  fullWidth
                  labelId="title-label-id"
                  id="title-id"
                  value={state.title || ""}
                  onChange={titleChanged}
                >
                  <MenuItem value={"Mr"}>Mr</MenuItem>
                  <MenuItem value={"Mrs"}>Mrs</MenuItem>
                  <MenuItem value={"Miss"}>Miss</MenuItem>
                  <MenuItem value={"Ms"}>Ms</MenuItem>
                  <MenuItem value={"Dr"}>Dr</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.forenameError ? true : false}
                required
                id="forename"
                label="Forename"
                fullWidth
                autoComplete="given-name"
                value={state.forename}
                onChange={forenameChanged}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.surnameError ? true : false}
                required
                id="surname"
                label="Surname"
                fullWidth
                autoComplete="family-name"
                value={state.surname}
                onChange={surnameChanged}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <DateField
                error={state.birthDateError}
                title="Date of Birth"
                value={state.birthDate}
                dateChanged={birthDateChanged}
              ></DateField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.phoneError ? true : false}
                required
                id="phone"
                label="Telephone"
                fullWidth
                autoComplete="tel"
                value={state.phone}
                onChange={phoneChanged}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                error={state.mobileError ? true : false}
                required
                id="mobile"
                label="Mobile"
                fullWidth
                autoComplete="tel"
                value={state.mobile}
                onChange={mobileChanged}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                error={state.postCodeError ? true : false}
                required
                id="postCode"
                label="Post Code"
                fullWidth
                autoComplete="postal-code"
                value={state.postCode}
                onChange={postCodeChanged}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={state.addressError ? true : false}
                required
                id="address"
                label="Address"
                multiline
                rowsMax={2}
                fullWidth
                autoComplete="street-address"
                value={state.address}
                onChange={addressChanged}
              />
            </Grid>
          </Grid>

          <div style={{ width: "100%", borderTop: "2px dashed #eee" }}></div>

          <Grid
            container
            spacing={5}
            alignItems="baseline"
            style={{
              padding: "0px",
              paddingBottom: "50px",
              paddingTop: "30px",
            }}
          >
            <Grid item xs={12}>
              <TextField
                error={state.attendReasonError ? true : false}
                required
                id="attendReason"
                label="Why are you attending the clinic today?"
                placeholder="Please describe here..."
                multiline
                rowsMax={2}
                fullWidth
                autoComplete="none"
                value={state.attendReason}
                onChange={attendReasonChanged}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="medication-label-id">
                  Are you currently taking any medication?
                </InputLabel>
                <Select
                  error={state.medicationError ? true : false}
                  fullWidth
                  labelId="medication-label-id"
                  id="medication-id"
                  value={state.medication || ""}
                  onChange={medicationChanged}
                >
                  <MenuItem value={"YES"}>YES</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="allergy-label-id">
                  Do you have any current allergies?
                </InputLabel>
                <Select
                  error={state.allergyError ? true : false}
                  fullWidth
                  labelId="allergy-label-id"
                  id="allergy-id"
                  value={state.allergy || ""}
                  onChange={allergyChanged}
                >
                  <MenuItem value={"YES"}>YES</MenuItem>
                  <MenuItem value={"NO"}>NO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              hidden={state.medication === "NO" && state.allergy === "NO"}
            >
              <TextField
                error={state.medicationDetailError ? true : false}
                required
                id="medicationDetail"
                label="if yes to either of the above, please detail"
                placeholder="Please describe here..."
                multiline
                rowsMax={2}
                fullWidth
                autoComplete="none"
                value={state.medicationDetail}
                onChange={medicationDetailChanged}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={8}
                style={
                  state.checkedVisitedCountryError
                    ? {
                        padding: "5px",
                        paddingTop: "20px",
                        border: "2px solid red",
                      }
                    : { padding: "5px", paddingTop: "20px" }
                }
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    marginBottom: "5px",
                  }}
                >
                  {" "}
                  Have you visited any of the following countries in the past 21
                  days?{" "}
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    color: "#f280c4",
                  }}
                >
                  {" "}
                  Guinea, Liberia, Sierra Leone{" "}
                </div>

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.checkedVisitedCountry === true}
                        onChange={visitedCountryYESChanged}
                        name="checkedCountryYES"
                      />
                    }
                    label="YES"
                  />

                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    control={
                      <Checkbox
                        checked={state.checkedVisitedCountry === false}
                        onChange={visitedCountryNOChanged}
                        name="checkedCountryNO"
                      />
                    }
                    label="NO"
                  />
                </div>

                {state.checkedVisitedCountry === true && (
                  <div style={{ padding: "5px", marginBottom: "30px" }}>
                    <TextField
                      error={state.countryVisitedDetailError ? true : false}
                      required
                      id="countryVisitedDetail"
                      label="Details"
                      placeholder="Please state details..."
                      multiline
                      rowsMax={2}
                      fullWidth
                      autoComplete="none"
                      value={state.countryVisitedDetail}
                      onChange={countryVisitedDetailChanged}
                    />
                  </div>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={8}
                style={
                  state.tarvelledOutsideEUError
                    ? {
                        padding: "5px",
                        paddingTop: "20px",
                        border: "2px solid red",
                      }
                    : { padding: "5px", paddingTop: "20px" }
                }
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    marginBottom: "5px",
                  }}
                >
                  Have you travelled outside the EU in the last past year?
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.tarvelledOutsideEU === true}
                        onChange={tarvelledOutsideEUYESChanged}
                        name="tarvelledOutsideEUYES"
                      />
                    }
                    label="YES"
                  />

                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    control={
                      <Checkbox
                        checked={state.tarvelledOutsideEU === false}
                        onChange={tarvelledOutsideEUNOChanged}
                        name="tarvelledOutsideEUNO"
                      />
                    }
                    label="NO"
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={8}
                style={
                  state.haveGPUKError
                    ? {
                        padding: "5px",
                        paddingTop: "20px",
                        border: "2px solid red",
                      }
                    : { padding: "5px", paddingTop: "20px" }
                }
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    marginBottom: "5px",
                  }}
                >
                  Do you have a GP in UK?
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.haveGPUK === true}
                        onChange={haveGPUKYESChanged}
                        name="haveGPUKYES"
                      />
                    }
                    label="YES"
                  />

                  <FormControlLabel
                    style={{ marginLeft: "20px" }}
                    control={
                      <Checkbox
                        checked={state.haveGPUK === false}
                        onChange={haveGPUKNOChanged}
                        name="haveGPUKNO"
                      />
                    }
                    label="NO"
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>

          <div
            style={{
              color: "red",
              fontWeight: "500",
              width: "100%",
              textAlign: "left",
            }}
            hidden={!hasErrors}
          >
            <p>
              * Please check the form again, some fields are not filled
              correctly
            </p>
            <p>* Incorrect fields are shown in RED color</p>
          </div>

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
                  className={classes.editInfoButton}
                  color="primary"
                  onClick={submitForm}
                  // onTouchTap={editInfoClicked}
                >
                  Submit Form
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

        <Backdrop className={classes.backdrop} open={submitting}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Copyright />
      </main>
    </React.Fragment>
  );
}
