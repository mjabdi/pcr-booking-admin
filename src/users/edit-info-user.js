import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GlobalState from './../GlobalState';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import HttpsIcon from '@material-ui/icons/Https';

import {BrowserView, MobileView, isMobile, isBrowser} from 'react-device-detect';

import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { Divider, Grid } from '@material-ui/core';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import * as EmailValidator from 'email-validator';
import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import logoImage from './../images/logo.png';

import dateFormat from 'dateformat';
import {calculatePrice} from './../PriceCalculator';

import ValidateInfo from './Validation';
import BookService from '../services/BookService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
           <strong> Medical Express Clinic </strong> 
      </Link>{isMobile ? ' ' : ' All rights reserved.' }
   
       
 
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: 'center',
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

  bold: {
    fontWeight: "800",
    padding: "5px"
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px"
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
    
  },

  privacyButton: {
    marginBottom : "20px"
  },

  textContent : {
      color : "#222",
      fontSize : "1.1rem",
      textAlign: "justify",
      paddingLeft: "20px",
      paddingRight: "20px",
      lineHeight: "1.5em",
      fontWeight : "400"
  },

  textContentMobile : {
    color : "#222",
    fontSize : "1.1rem",
    textAlign: "justify",
    paddingLeft: "20px",
    paddingRight: "20px",
    lineHeight: "1.5em",
    fontWeight : "400"
},

  getStartedButton: {
      marginTop : "10px",
      marginBottom : "10px",
  },

  backButton: {
    marginBottom : "20px",
    textDecoration : "none !important",
    padding: "10px"  
  },

  editInfoButton: {
    
    marginTop : "20px",
    backgroundColor : "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration : "none !important",
    padding: "10px"  

  },

  cancelTimeButton: {

    marginTop : "20px",
    backgroundColor : "#d90015",
    "&:hover": {
      background: "#b80012",
      color: "#fff"
    },

    padding: "10px"
  },


  AirIcon : {
      marginRight : "10px",
      fontSize: "32px"
  },

  
  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0"
 },

 li: {
   marginBottom : "5px"
 },

 infoDetails:{
    textAlign: "left"
  },

  infoTitle:{
    fontWeight: "800",
    marginRight: "10px"
  },

  infoData:{
    fontWeight: "400",
  },

  Box:{
    backgroundColor : "#f1f1f1",
    padding: "10px",
    //maxWidth: "300px",
    borderRadius  : "10px",
    boxShadow: "2px 4px #ddd",
    marginTop: "5px",
    marginBottom : "15px",
    textAlign: "left"
    
  
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));




export default function EditInfoUser() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

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

    console.log(ValidateInfo(state,setState));
  
    if (ValidateInfo(state,setState))
    {
        setSaving(true);
        const person = {
            bookingId: state.userBooking._id,
            title: title,
            gender: gender,
            birthDate: dateFormat(birthDate, 'yyyy-mm-dd'),
            forename: firstname,
            surname: lastname,
            email: email,
            phone: phone,
            certificate: certificate,
            address: address,
            postCode: postCode,
            passportNumber: passportNumber,
            passportNumber2: passportNumber2,
            antiBodyTest: antiBodyCheck,
            bookingDate: state.userBooking.bookingDate,
            bookingTime: state.userBooking.bookingTime,
            bookingRef: state.userBooking.bookingRef,
            
            selfIsolate : selfIsolate,
            ethnicity: ethnicity,
            NHSNumber: NHSNumber,
            addressSI : addressSI,
            postCodeSI: postCodeSI,
            arrivalDate: arrivalDate,
            flightNumber: flightNumber,
            lastDepartedDate: lastDepartedDate,
            travellingFrom: travellingFrom,


        };

        BookService.updateBooking({bookingId: state.userBooking._id, person: person}).then( (res) => {

            setSaving(false);

            setState((state) => ({
                ...state,
                editInfoClicked: false,
                editInfoResult: true,
              }));


        }).catch( (err) =>
        {
            console.log(err);
            setSaving(false);
        })
    }
}


const backButtonClicked = (event) => {
    setState(state => ({...state, welcomeUser: false, editInfoClicked  : false}));
}


const [birthDate, handleBirthDateChange] = React.useState(state.userBooking.birthDate ?? null);
const [firstname, setFirstname] = React.useState(state.userBooking.forename ?? '');
const [lastname, setLastname] = React.useState(state.userBooking.surname ?? '');
const [email, setEmail] = React.useState(state.userBooking.email ?? '');
const [retypeEmail, setRetypeEmail] = React.useState(state.userBooking.email ?? '');

const [NHSNumber, setNHSNumber] = React.useState(state.userBooking.NHSNumber ?? '');
const [ethnicity, setEthnicity] = React.useState(state.userBooking.ethnicity ?? '');

const [selfIsolate, setSelfIsolate] = React.useState(state.userBooking.selfIsolate ?? false);

const [arrivalDate, setArrivalDate] = React.useState(state.userBooking.arrivalDate ?? '');
const [flightNumber, setFlightNumber] = React.useState(state.userBooking.flightNumber ?? '');
const [lastDepartedDate, setLastDepartedDate] = React.useState(state.userBooking.lastDepartedDate ?? '');
const [travellingFrom, setTravellingFrom] = React.useState(state.userBooking.travellingFrom ?? '');

const [postCodeSI, setPostCodeSI] = React.useState(state.userBooking.postCodeSI ?? '');
const [addressSI, setAddressSI] = React.useState(state.userBooking.addressSI ?? '');

const [gender, setGender] = React.useState(state.userBooking.gender ?? '');
const [title, setTitle] = React.useState(state.userBooking.title ?? '');



const [phone, setPhone] = React.useState(state.userBooking.phone ?? '');
const [postCode, setPostCode] = React.useState(state.userBooking.postCode ?? '');
const [address, setAddress] = React.useState(state.userBooking.address ?? '');

const [passportNumber, setPassportNumber] = React.useState(state.userBooking.passportNumber);
const [passportNumber2, setPassportNumber2] = React.useState(state.userBooking.passportNumber2);

const [changed, setChanged] = React.useState(false);
const [saving, setSaving] = React.useState(false);

const [fieldChanged, setFieldChanged] = React.useState(false);

useEffect( () => {
    setState(state => ({...state, emailConfirmed: false}));
    setState(state => ({...state, title: state.userBooking.title }));
    setState(state => ({...state, gender: state.userBooking.gender}));
    setState(state => ({...state, birthDate: state.userBooking.birthDate }));
    setState(state => ({...state, firstname : state.userBooking.forename}));
    setState(state => ({...state, lastname : state.userBooking.surname}));
    setState(state => ({...state, email : state.userBooking.email }));
    setState(state => ({...state, retypeEmail :  state.userBooking.email }));
    setState(state => ({...state, phone : state.userBooking.phone }));
    setState(state => ({...state, certificate: state.userBooking.certificate}));
    setState(state => ({...state, postCode : state.userBooking.postCode }));
    setState(state => ({...state, address : state.userBooking.address }));
    setState(state => ({...state, passportNumber : state.userBooking.passportNumber }));
    setState(state => ({...state, passportNumber2 : state.userBooking.passportNumber2}));
    setState(state => ({...state, antiBodyTest : state.userBooking.antiBodyTest}));

    setState(state => ({...state, NHSNumber : state.userBooking.NHSNumber}));
    setState(state => ({...state, ethnicity : state.userBooking.ethnicity}));

    setState(state => ({...state, addressSI : state.userBooking.addressSI}));
    setState(state => ({...state, postCodeSI : state.userBooking.postCodeSI}));
    setState(state => ({...state, selfIsolate : state.userBooking.selfIsolate ?? false}));
    setState(state => ({...state, arrivalDate : state.userBooking.arrivalDate}));
    setState(state => ({...state, flightNumber : state.userBooking.flightNumber}));
    setState(state => ({...state, lastDepartedDate : state.userBooking.lastDepartedDate}));
    setState(state => ({...state, travellingFrom : state.userBooking.travellingFrom}));





}, []);


useEffect( () => {

  if (!state.userBooking.tr)
  {
    setChanged(
      title !== state.userBooking.title 
   || gender !== state.userBooking.gender 
   || dateFormat(birthDate,'yyyy-mm-dd') !== state.userBooking.birthDate 
   || firstname !== state.userBooking.forename 
   || lastname !== state.userBooking.surname 
   || email !== state.userBooking.email 
   || phone !== state.userBooking.phone 
   || certificate !== state.userBooking.certificate 
   || postCode !== state.userBooking.postCode 
   || address !== state.userBooking.address 
   || passportNumber !== state.userBooking.passportNumber 
   || passportNumber2 !== state.userBooking.passportNumber2 
   || antiBodyCheck !== state.userBooking.antiBodyTest 
    );
  }else
  {
    setChanged(
      title !== state.userBooking.title 
   || gender !== state.userBooking.gender 
   || dateFormat(birthDate,'yyyy-mm-dd') !== state.userBooking.birthDate 
   || firstname !== state.userBooking.forename 
   || lastname !== state.userBooking.surname 
   || email !== state.userBooking.email 
   || phone !== state.userBooking.phone 
   || postCode !== state.userBooking.postCode 
   || address !== state.userBooking.address 
   || passportNumber !== state.userBooking.passportNumber 
   || NHSNumber !== state.userBooking.NHSNumber
   || ethnicity !== state.userBooking.ethnicity
   || selfIsolate !==  (state.userBooking.selfIsolate ?? false)
   || (selfIsolate && postCodeSI !==  state.userBooking.postCodeSI)
   || (selfIsolate && addressSI !==  state.userBooking.addressSI)
   || arrivalDate !==  state.userBooking.arrivalDate
   || flightNumber !==  state.userBooking.flightNumber
   || lastDepartedDate !==  state.userBooking.lastDepartedDate
   || travellingFrom !==  state.userBooking.travellingFrom
 

    );
  }
   
}, [fieldChanged])



const titleChanged = (event) => {
        setTitle(event.target.value);
        setState(state => ({...state, title: event.target.value}));
        setState(state => ({...state, titleError : false}));

        setFieldChanged(!fieldChanged);
    };

const genderChanged = (event) => {
        setGender(event.target.value);
        setState(state => ({...state, gender: event.target.value}));
        setState(state => ({...state, genderError : false}));

        setFieldChanged(!fieldChanged);
    };

const birthDateChanged = (date) =>
{
    handleBirthDateChange(date);
    setState(state => ({...state, birthDate: date}));
    setState(state => ({...state, birthDateError : false}));

    setFieldChanged(!fieldChanged);
}  

const firstnameChanged = (event) =>
{
    setFirstname(event.target.value);
    setState(state => ({...state, firstname : event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0)
    {
      setState(state => ({...state, firstnameError : false}));
    }

    setFieldChanged(!fieldChanged);
}

const lastnameChanged = (event) =>
{
    setLastname(event.target.value);
    setState(state => ({...state, lastname : event.target.value }));
    if (event.target.value && event.target.value.trim().length > 0)
    {
      setState(state => ({...state, lastnameError : false}));
    }

    setFieldChanged(!fieldChanged);
}

const emailChanged = (event) =>
{
    setEmail(event.target.value);
    setState(state => ({...state, email : event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value))
    {
      setState(state => ({...state, emailError : false}));
    }

    setFieldChanged(!fieldChanged);
}


const retypeEmailChanged = (event) =>
{
    setRetypeEmail(event.target.value);
    setState(state => ({...state, retypeEmail : event.target.value }));
    if (event.target.value && EmailValidator.validate(event.target.value))
    {
      setState(state => ({...state, retypeEmailError : false}));
    }

    setFieldChanged(!fieldChanged);
}

const NHSNumberChanged = (event) =>
{
    setNHSNumber(event.target.value);
    setState(state => ({...state, NHSNumber : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 0)
    {
      setState(state => ({...state, NHSNumberError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const ethnicityChanged = (event) =>
{
    setEthnicity(event.target.value);
    setState(state => ({...state, ethnicity : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 0)
    {
      setState(state => ({...state, ethnicityError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const selfIsolateChanged = (event) =>
{
  setSelfIsolate(event.target.checked);
  setState(state => ({...state, selfIsolate : event.target.checked}));
  setFieldChanged(!fieldChanged);

  if (!event.target.checked)
  {
    setAddressSI('');
    setState(state => ({...state, addressSI : '' }));
    setPostCodeSI('');
    setState(state => ({...state, postCodeSI :''}));
  }
}

const postCodeSIChanged = (event) =>
{
    setPostCodeSI(event.target.value);
    setState(state => ({...state, postCodeSI : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 5)
    {
      setState(state => ({...state, postCodeSIError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const addressSIChanged = (event) =>
{
    setAddressSI(event.target.value);
    setState(state => ({...state, addressSI : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 10)
    {
      setState(state => ({...state, addressSIError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const arrivalDateChanged = (event) =>
{
    setArrivalDate(event.target.value);
    setState(state => ({...state, arrivalDate : event.target.value }));
    if (event.target.value && event.target.value.trim().length === 10)
    {
      setState(state => ({...state, arrivalDateError : false}));
    }
    setFieldChanged(!fieldChanged);
}
const flightNumberChanged = (event) =>
{
    setFlightNumber(event.target.value);
    setState(state => ({...state, flightNumber : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 1)
    {
      setState(state => ({...state, flightNumberError : false}));
    }
    setFieldChanged(!fieldChanged);
}
const lastDepartedDateChanged = (event) =>
{
    setLastDepartedDate(event.target.value);
    setState(state => ({...state, lastDepartedDate : event.target.value }));
    if (event.target.value && event.target.value.trim().length === 10)
    {
      setState(state => ({...state, lastDepartedDateError : false}));
    }
    setFieldChanged(!fieldChanged);
}
const travellingFromChanged = (event) =>
{
    setTravellingFrom(event.target.value);
    setState(state => ({...state, travellingFrom : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 1)
    {
      setState(state => ({...state, travellingFromError : false}));
    }
    setFieldChanged(!fieldChanged);
}






const [certificate, setCertificate] = React.useState(state.userBooking.certificate ?? false);

const certificateChanged = (event) => {
    setCertificate(event.target.checked);
    setState(state => ({...state, certificate: event.target.checked}));

    setFieldChanged(!fieldChanged);
};



const phoneChanged = (event) =>
{
    setPhone(event.target.value);
    setState(state => ({...state, phone : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6)
    {
    setState(state => ({...state, phoneError : false}));
    } 

    setFieldChanged(!fieldChanged);
}

const postCodeChanged = (event) =>
{
    setPostCode(event.target.value);
    setState(state => ({...state, postCode : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 5)
    {
    setState(state => ({...state, postCodeError : false}));
    }

    setFieldChanged(!fieldChanged);
}

const addressChanged = (event) =>
{
    setAddress(event.target.value);
    setState(state => ({...state, address : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 10)
    {
    setState(state => ({...state, addressError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const passportNumberChanged = (event) =>
{
    setPassportNumber(event.target.value);
    setState(state => ({...state, passportNumber : event.target.value }));
    if (event.target.value && event.target.value.trim().length >= 6)
    {
    setState(state => ({...state, passportNumberError : false}));
    }
    setFieldChanged(!fieldChanged);
}

const passportNumberChanged2 = (event) =>
{
    setPassportNumber2(event.target.value);
    setState(state => ({...state, passportNumber2 : event.target.value}));
    setFieldChanged(!fieldChanged);
}


const [antiBodyCheck, setAntiBodyCheck] = React.useState(state.userBooking.antiBodyTest ?? false);

const antiBodyCheckChanged = (event) =>
{
  setAntiBodyCheck(event.target.checked);
  setState(state => ({...state, antiBodyTest : event.target.checked}));
  setFieldChanged(!fieldChanged);
}


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>

        <Grid
            container
            direction="row"
            spacing= {1}
            justify="center"
            alignItems="center"
        >


            <Grid item xs={10}>
                  <Typography  style={{fontWeight: "400"}} variant="h6" color="inherit" noWrap>
                    Medical Express Clinic
                  </Typography>
            </Grid>

            <Grid item xs={2}>
                    <img className={classes.logoImage} src={logoImage} alt="logo image"/> 
            </Grid>

        
        </Grid>  
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>

       
          <Typography style={{fontWeight : 700, marginBottom: "50px"}} component="h1" variant="h6" align="center">

                    <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
              
              {!state.userBooking.tr ? (
                  <React.Fragment>
                          <AirplanemodeActiveIcon className={classes.AirIcon} color="primary" />  
                              RT-PCR Fit to Fly Test
                  </React.Fragment>

              ) : (
                  <React.Fragment>
                        <AccessibilityNewIcon className={classes.AirIcon} color="primary" />  
                            RT-PCR Test to Release
                 </React.Fragment>
                
              )}

                    </div>
          </Typography>

          {!state.userBooking.tr && (
                  <div className={classes.Box}>

                  <div className= {classes.Label}>
                      Add to your Appointment...
                  </div>

                  <div className= {classes.CheckBox}>
                  <FormControlLabel className={classes.formControl} 
                          control={<Checkbox className={classes.formControl}  color="secondary" name="emailConfirmCheckBox" checked={antiBodyCheck} onChange={antiBodyCheckChanged} />}
                          label={<span style={{ fontSize: '0.7rem' }}>{`COVID-19 Antibody Test (IgM & IgG)`} 
                          <span  style={{ fontSize: '0.8rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}> £99.00 </span> </span> } />
                  </div>
                </div>

          )}

       

          <Grid container spacing={3} alignItems="baseline" style={{paddingTop:"20px", paddingBottom:"20px"}}>

                        <Grid item xs={12} md={6}>
                            <FormControl className={classes.formControl} fullWidth required>
                                <InputLabel id="gender-label-id">Gender</InputLabel>
                                <Select
                                    error={state.genderError ? true : false}
                                    fullWidth
                                    labelId="gender-label-id"
                                    id="gender-id"
                                    value={gender}
                                    onChange={genderChanged}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
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
                                    value={title}
                                    onChange={titleChanged}
                                >
                                    <MenuItem value={'Mr'}>Mr</MenuItem>
                                    <MenuItem value={'Mrs'}>Mrs</MenuItem>
                                    <MenuItem value={'Miss'}>Miss</MenuItem>
                                    <MenuItem value={'Ms'}>Ms</MenuItem>
                                    <MenuItem value={'Dr'}>Dr</MenuItem>
                                </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                    error={state.firstnameError ? true : false}
                                    required id="firstName" label="First Name" 
                                    fullWidth autoComplete="given-name" 
                                    value = {firstname}
                                    onChange = {firstnameChanged} 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField 
                                    error={state.lastnameError ? true : false}
                                    required id="lastName" label="Last Name" 
                                    fullWidth autoComplete="family-name" 
                                    value = {lastname}
                                    onChange = {lastnameChanged} 
                        />  
                        </Grid>
                        <Grid item xs={12} md={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker  
                                        error={state.birthDateError ? true : false}
                                        autoOk
                                        fullWidth
                                        variant="inline"
                                        label="Birthdate"
                                        format="dd/MM/yyyy"
                                        disableFuture
                                        InputAdornmentProps={{ position: "start" }}
                                        helperText="dd/MM/yyyy"
                                        value={birthDate}
                                        onChange={birthDateChanged}
                                        />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                        error={state.emailError ? true : false}
                                        required id="email" label="Email Address" 
                                        fullWidth autoComplete="email"  type="email"
                                        value = {email}
                                        onChange = {emailChanged} 
                                        helperText = 'This email address is where you will receive your results.'
                            />  
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                        error={state.retypeEmailError ? true : false}
                                        required id="retypeEmail" label="Retype Email Address" 
                                        fullWidth autoComplete="none"  type="email"
                                        value = {retypeEmail}
                                        onChange = {retypeEmailChanged} 
                                        // helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
                            />  
                        </Grid>

                        {state.userBooking.tr && (
                              <React.Fragment>
                                  <Grid item xs={12} md={6}>
                                      <TextField 
                                                  error={state.phoneError ? true : false}
                                          
                                                  required id="phone" label="Telephone Number" 
                                                  fullWidth autoComplete="tel" 
                                                  value = {phone}
                                                  onChange = {phoneChanged} 
                                      />  
                                  </Grid>

                                  <Grid item  xs={12} md={6}>
                                              
                                              <TextField 
                                                        error={state.passportNumberError ? true : false}
                                                        required id="passport" label="Passport Number" 
                                                        fullWidth autoComplete="none" 
                                                        value = {passportNumber}
                                                        onChange = {passportNumberChanged} 
                                              />  
        
                                              </Grid>
                              </React.Fragment>
                            )}


                        {state.userBooking.tr && (
                              <React.Fragment>
                                  <Grid item  xs={12} md={6}>
                                        <TextField 
                                                  error={state.NHSNumberError ? true : false}
                                                  id="NHSNumber" label="NHS Number (optional)" 
                                                  helperText="(if known and applicable)" 
                                                  fullWidth autoComplete="none"  
                                                  value = {NHSNumber}
                                                  onChange = {NHSNumberChanged} 
                                        />        
                                  </Grid>

                                  <Grid item  xs={12} md={6}>
                                    
                                        <TextField 
                                                  error={state.ethnicityError ? true : false}
                                                  required id="ethnicity" label="Ethnicity" 
                                                  fullWidth autoComplete="none"  
                                                  value = {ethnicity}
                                                  onChange = {ethnicityChanged} 
                                        />        
                                  </Grid>
                              </React.Fragment>

                            )}


                        </Grid>

        <Divider/>

            <Grid container spacing={3} alignItems="baseline" style={{paddingTop:"20px", paddingBottom:"20px"}}>

                          {!state.userBooking.tr && (
                                  <Grid item xs={12} md={6}>
                                      <TextField 
                                                  error={state.phoneError ? true : false}
                                          
                                                  required id="phone" label="Telephone Number" 
                                                  fullWidth autoComplete="tel" 
                                                  value = {phone}
                                                  onChange = {phoneChanged} 
                                      />  
                                  </Grid>
                          )}

                           
                            <Grid item xs={12} md={state.userBooking.tr ? 12 : 6}>
                                <TextField 
                                            error={state.postCodeError ? true : false}
                                    
                                            required id="postCode" label="Postal Code" 
                                            fullWidth autoComplete="postal-code"
                                            value = {postCode}
                                            onChange = {postCodeChanged} 
                                />  
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                            error={state.addressError ? true : false}
                                            required id="address" label="Address" 
                  
                                            multiline rowsMax={2} 
                                            fullWidth autoComplete="street-address" 
                                            value = {address}
                                            onChange = {addressChanged} 
                                />  
                            </Grid>

                            {state.userBooking.tr && (
                              <React.Fragment>
                                   <Grid item xs={12} className={classes.formControl} >
                                    <FormControlLabel className={classes.formControl} 
                                      control={<Checkbox className={classes.formControl} color="secondary" name="emailConfirmCheckBox" checked={selfIsolate} onChange={selfIsolateChanged} />}
                                      label={<span style={{ fontSize: '1rem' }}>{`I intend to self-isolate at a different address`} </span>}
                                    />
                                  </Grid>

                                  { selfIsolate && (
                                           <React.Fragment>
                                                <Grid item xs={12}>
                                                <TextField 
                                                            error={state.postCodeSIError ? true : false}
                                                  
                                                            required id="postCodeSI" label="Self-Isolate Post Code" 
                                                            fullWidth autoComplete="postal-code"
                                                            value = {postCodeSI}
                                                            onChange = {postCodeSIChanged} 
                                                />  
                                                </Grid>
                                                <Grid item xs={12}>
                                                <TextField 
                                                            error={state.addressSIError ? true : false}
                                                            required id="addressSI" label="Self-Isolate Address" 
                                                           
                                                            multiline rowsMax={2} 
                                                            fullWidth autoComplete="street-address" 
                                                            value = {addressSI}
                                                            onChange = {addressSIChanged} 
                                                />  
                                                </Grid>

                                          </React.Fragment>

                                  )}

                                  <Grid item xs={12} md={6}>
                                      <TextField 
                                                  error={state.arrivalDateError ? true : false}
                                                
                                                  required id="arrivalDate" label="Arrival Date" 
                                                  helperText = "Date of your arrival in the UK (dd/MM/YYYY)"
                                                  fullWidth autoComplete="none"
                                                  value = {arrivalDate}
                                                  onChange = {arrivalDateChanged} 
                                      />  
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                      <TextField 
                                                  error={state.flightNumberError ? true : false}
                                                 
                                                  required id="flightNumber" label="Flight Number" 
                                                  helperText = "Your coach number, flight number or vessel name (as appropriate)"
                                                  fullWidth  autoComplete="none"
                                                  value = {flightNumber}
                                                  onChange = {flightNumberChanged} 
                                      />  
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <TextField 
                                                error={state.lastDepartedDateError ? true : false}
                                             
                                                required id="lastDepartedDate" label="Last Departed Date" 
                                                helperText = "The date on which you last departed from or transited through a non-exempt country or territory, or a non-exempt region of a country or territory ‒ a destination not on the travel corridors list"
                                                fullWidth autoComplete="none"
                                                value = {lastDepartedDate}
                                                onChange = {lastDepartedDateChanged} 
                                    />  
                                  </Grid>

            
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                                error={state.travellingFromError ? true : false}
                                               
                                                required id="travellingFrom" label="Travelling from" 
                                                helperText = "The country or territory you were travelling from when you arrived in the UK, and any country or territory you transited through as part of that journey"
                                                fullWidth  autoComplete="none"
                                                value = {travellingFrom}
                                                onChange = {travellingFromChanged} 
                                    />  
                                </Grid>


                          </React.Fragment>
                          )}




                            {!state.userBooking.tr && (
                              <React.Fragment>

                                    <Grid item xs={12} className={classes.formControl} >
                                      <FormControlLabel className={classes.formControl} 
                                          control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
                                          label={<span style={{ fontSize: '0.8rem' }}>{`I also require a medical certificate signed by a doctor declaring me 'fit-to-fly'.`} 
                                          
                                          <span  style={{ fontSize: '1rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}>  + £50.00 </span> 
                                          </span>}
                                      />
                                      </Grid>
                                      <Grid item xs={12} hidden={!certificate} >
                                          <TextField 
                                                      error={state.passportNumberError ? true : false}
                                                      required id="passport" label="Passport Number" 
                                                      helperText="your passport number will be noted on your certificate" 
                                                      fullWidth autoComplete="" 
                                                      value = {passportNumber}
                                                      onChange = {passportNumberChanged} 
                                          />  
                                      </Grid>
                                      <Grid item xs={12} hidden={!certificate} >
                                          <TextField 
                                                      // error={state.passportNumberError ? true : false}
                                                      id="passport2" label="Second Passport Number (optional)" 
                                                      helperText="your passport number will be noted on your certificate" 
                                                      fullWidth autoComplete="" 
                                                      value = {passportNumber2}
                                                      onChange = {passportNumberChanged2} 
                                          />  
                                      </Grid>

                              </React.Fragment>

                            )}

                     
             </Grid>


             <Divider/>
        
           

          <div style={isBrowser ? {paddingLeft: "50px", paddingRight: "50px"} :  {paddingLeft: "10px", paddingRight: "10px"}}>

                <Grid
                        container
                        spacing = {3}
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                        >
                    
                                <Grid item xs>
                                        <Button 
                                            disabled = {saving || !changed}
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
                                                disabled = {saving}
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
                  startIcon={<HttpsIcon/>}
                  onClick={handleClickOpen('paper')}
                  onTouchTap={handleClickOpen('paper')} 
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
                        <DialogTitle id="scroll-dialog-title">Application Disclaimer</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                          <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                          >
                            <div style={{textAlign:"justify", padding:"10px"}}>
                              Medical Express Clinic will not contact you for any other reason than to share your test results, and certificate if selected, via the email address provided. The information provided to us via this registration form is never shared with any other organisations, except when this is required by law. 

                                Information provided will never be used for marketing purposes, you cannot opt in.

                                In the case of a positive swab result, our doctor will call on the telephone number provided to inform you of your result and provide additional advice or guidance.
                          </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Close
                          </Button>
                      
                        </DialogActions>
      </Dialog>


      <Backdrop className={classes.backdrop} open={saving} >
        <CircularProgress color="inherit" />
      </Backdrop>

        <Copyright />
      </main>
    </React.Fragment>
  );
}