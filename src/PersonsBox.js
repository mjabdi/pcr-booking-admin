import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dateFormat from 'dateformat';
import { Button, Checkbox, FormControlLabel, Link, TextField } from '@material-ui/core';
import PDFService from './services/PDFService';

import {calculatePrice} from './PriceCalculator';

import FileSaver from 'file-saver';

import bookingService from './services/BookService';
import { CheckBox } from '@material-ui/icons';
import { parse } from 'date-fns';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor : "#373737",
    color: "#fff",
    padding : "1px",
    borderRadius : "4px",
    textAlign: "justify",
    paddingRight: "40px"
  },

  boxRed: {
    backgroundColor : "#dc2626",
    color: "#fff",
    padding : "1px",
    borderRadius : "4px",
    textAlign: "justify",
    paddingRight: "40px"
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor : "#fafafa",
    color: "#333",
    padding : "1px",
    borderRadius : "4px",
    paddingRight: "40px",
    border: "1px solid #eee",
  },

  ul: {
     listStyle: "none",
     padding: "0",
     margin: "0"
  },

  li: {
    marginBottom : "15px"
  },


  icon: {
    marginRight : "8px"
  },

  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails:{
    textAlign: "left",
  },

  infoTitle:{
    fontWeight: "800",
    marginRight: "10px"
  },

  infoData:{
    fontWeight: "400",
  },

  title:
  {
    // textAlign : "center",
    // fontWeight : "500",
    // margin: "10px",
    // backgroundColor : "#eee",
    // padding : "10px",
    // borderRadius : "4px"
    textAlign: "center",
    fontWeight : "600",
    marginLeft: "10px",
    marginBottom: "5px"

  },

  Accordion:{
    backgroundColor : "#f5f5f5",
    color: "#222"
  },

  DownloadForm:{
      marginTop: "10px",
      marginBottom : "10px"
  },

  infoDataCharges:{
    fontSize : "18px",
    color: "green",
    fontWeight : "600"
  },

  infoDataChargesHigher:{
    fontSize : "18px",
    color: "red",
    fontWeight : "600"
  },
  BookedLabel:{
    backgroundColor: "#606060",
    color: "#fff",
    paddingRight: "10px",
    paddingLeft: "10px"
  },

  PatientAttendedLabel:{
    backgroundColor: "#0066aa",
    color: "#fff",
    paddingRight: "15px",
    paddingLeft: "10px"
  },

  SampleTakenLabel:{
    backgroundColor: "#0066cc",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "10px"
  },

  ReportSentLabel:{
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px"
  },

  ReportCertSentLabel:{
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "68px",
    paddingLeft: "10px"
  },

  EditButton:
  {
    marginBottom : "20px",
    backgroundColor : "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },

    padding: "10px"

    
  },

  SaveButton:
  {
    marginBottom : "10px",
    padding: "10px",

    backgroundColor : "#d1175e",
    "&:hover": {
      background: "#bd0d50",
      color: "#fff"
    },

  },

  CancelButton:
  {
    marginBottom : "20px",
    // padding: "10px"
  },

  TextBox: {
    
    padding : "0px"

  },

  checkIcon:{
    color: "green",   
  },

  closeIcon:{
    color: "red"
  },

  centeredLabel : {
    display: "flex",
    alignItems: "center"
  }






}));




export default function PersonsBox() {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);

    const [expanded, setExpanded] = React.useState(false);

    const [editMode, setEditMode] = React.useState({edit : false, person : null});

    const [saving, setSaving] =  React.useState(false);

    const [validationError, setValidationError] = React.useState({});


    const [bookingDate, setBookingDate] = React.useState('');
    const [bookingTime, setBookingTime] = React.useState('');

    const [gender, setGender] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [forename, setForename] = React.useState('');
    const [surname, setSurnme] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [dob, setDOB] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [postCode, setPostCode] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [passport, setPassport] = React.useState('');
    const [passport2, setPassport2] = React.useState('');
    const [certificate, setCertificate] = React.useState(false);
    const [antiBodyTest, setAntiBodyTest] = React.useState(false);


    const bookingDateChanged = (event) =>
    {
      setBookingDate(event.target.value);
      setValidationError({...validationError, bookingDateError : false});
    }

    const bookingTimeChanged = (event) =>
    {
      setBookingTime(event.target.value);
      setValidationError({...validationError, bookingTimeError : false});
    }

    const genderChanged = (event) =>
    {
      setGender(event.target.value);
    }

    const titleChanged = (event) =>
    {
      setTitle(event.target.value);
    }

    const forenameChanged = (event) =>
    {
      setForename(event.target.value);
    }

    const surnameChanged = (event) =>
    {
      setSurnme(event.target.value);
    }

    const emailChanged = (event) =>
    {
      setEmail(event.target.value);
    }

    const dobChanged = (event) =>
    {
      setDOB(event.target.value);
      setValidationError({...validationError, dobError : false});
    }

    const telChanged = (event) =>
    {
      setTel(event.target.value);
    }

    const postCodeChanged = (event) =>
    {
      setPostCode(event.target.value);
    }

    const addressChanged = (event) =>
    {
      setAddress(event.target.value);
    }

    const notesChanged = (event) =>
    {
      setNotes(event.target.value);
    }

    const passportChanged = (event) =>
    {
      setPassport(event.target.value);
    }

    const passport2Changed = (event) =>
    {
      setPassport2(event.target.value);
    }

    const certificateChanged = (event) =>
    {
      setCertificate(event.target.checked);
    }

    const antiBodyTestChanged = (event) =>
    {
      setAntiBodyTest(event.target.checked);
    }


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const getStatusLabel = (status) => {
      if (status === 'booked')
      {
        return (
          <span className={classes.BookedLabel}> Booking Made </span>
        );
    
      }else if (status === 'patient_attended')
      {
        return (
          <span  className={classes.PatientAttendedLabel}> Patient Attended </span>
        );
    
      }else if (status === 'sample_taken')
      {
        return (
          <span  className={classes.SampleTakenLabel}> Sample Taken </span>
        );
    
      }else if (status === 'report_sent')
      {
        return (
          <span  className={classes.ReportSentLabel}> Report Sent </span>
        );
    
      }else if (status === 'report_cert_sent')
      {
        return (
          <span  className={classes.ReportCertSentLabel}> {`Rpt & Cert Sent`} </span>
        );
    
      }else{
        return 'Unknown';
      }
    }

   const downloadForm1 = (id) =>
   {
       PDFService.downloadCovidForm1(id).then( (res) => 
       {
            FileSaver.saveAs(
            new Blob([res.data], { type: 'application/pdf' }),
              `pcr-reg-form-${id}.pdf`
          );

       }).catch( (err) =>
       {
           console.log(err);
       });
   }

   const downloadForm2 = (id) =>
   {
        PDFService.downloadCovidForm2(id).then( (res) => 
        {
            FileSaver.saveAs(
            new Blob([res.data], { type: 'application/pdf' }),
            `pcr-clinic-form-${id}.pdf`
        );

        }).catch( (err) =>
        {
            console.log(err);
        });
   }

   const downloadLabResults = (id) =>
   {
        PDFService.downloadPdfResult(id).then( (res) => 
        {
            FileSaver.saveAs(
            new Blob([res.data], { type: 'application/pdf' }),
            `lab-result-${id}.pdf`
        );

        }).catch( (err) =>
        {
            console.log(err);
        });
   }

   const downloadCertificate = (id) =>
   {
        PDFService.downloadPdfCert(id).then( (res) => 
        {
            FileSaver.saveAs(
            new Blob([res.data], { type: 'application/pdf' }),
            `certificate-${id}.pdf`
        );

        }).catch( (err) =>
        {
            console.log(err);
        });
   }

   const handleEditModeChanged = (edit, person) => {

       if (edit)
       {
         setForename(person.forenameCapital);
         setSurnme(person.surnameCapital);
         setBookingDate(person.bookingDate);
         setBookingTime(person.bookingTime.toUpperCase());
         setGender(person.gender.toUpperCase());
         setTitle(person.title.toUpperCase());
         setEmail(person.email.toUpperCase());
         setDOB(person.birthDate);
         setTel(person.phone.toUpperCase());
         setPostCode(person.postCode.toUpperCase());
         setAddress(person.address.toUpperCase());
         if (person.notes)
         {
          setNotes(person.notes.toUpperCase());
         }
        
         if (person.passportNumber)
         {
           setPassport(person.passportNumber.toUpperCase());
         }
        
         if (person.passportNumber2)
         {
           setPassport2(person.passportNumber2.toUpperCase());
         }
        
         setCertificate(person.certificate);
         setAntiBodyTest(person.antiBodyTest);

         setEditMode({edit: edit, person: person});

       }
       else if (!edit && !person)
       {
         setEditMode({edit: edit, person: person});
       }
       else if (!edit && person)
       {
          const booking = {};
          const bookingId = person._id;
          booking.certificate = certificate;
          booking.antiBodyTest = antiBodyTest;
          booking.gender = gender;
          booking.title = title;
          booking.birthDate = dob;
          booking.email = email;
          booking.phone = tel;
          booking.postCode = postCode;
          booking.address = address;
          booking.passportNumber = passport;
          booking.passportNumber2 = passport2;
          booking.forename = forename;
          booking.surname = surname;
          booking.notes = notes;
          booking.bookingDate = bookingDate;
          booking.bookingTime = bookingTime;
          booking.bookingRef = person.bookingRef;

          if  (validateBooking(booking))
          {
            updateBooking({bookingId: bookingId, person: booking});
          }
       }
   }

   const validateDate = (str) =>
   {
     var error = false;
     if (!str || str.length !== 10)
     {
       error = true;
     }

     if (str.charAt(4) !== '-'  || str.charAt(7) !== '-')
     {
       error = true;
     }

     try
     {
       
       const result = /^\d{4}-\d{2}-\d{2}$/.test(str);
       if (!result)
       {
          error = true;
       }

       const year = parseInt(str.substr(0,4));
       const month = parseInt(str.substr(5,2));
       const day = parseInt(str.substr(8,2));

       if (year < 2020)
       {
          error = true;
       }

       if (month < 1 || month > 12)
       {
         error = true;
       }        

       if (day > 31)
       {
         error = true;
       }

     }catch(err)
     {
       error = true;
     }



     return !error;
   }

   const validateTime =(str) =>
   {
     var error = false;

     const result = /^\d{2}:\d{2} AM$|^\d{2}:\d{2} PM$/.test(str);
     if (!result)
     {
        error = true;
     }

     try{
       const hour = parseInt(str.substr(0,2));
       const minute = parseInt(str.substr(3,2));

       if (hour < 0 || hour > 12)
       {
         error = true;
       }

       if (minute < 0 || minute > 59)
       {
         error = true;
       }

     }catch(err)
     {
       error = true;
     }

     return !error;
   }

   const validateBooking = (booking) =>
   {
      var error = false;

      if (!validateDate(booking.bookingDate))
      {
        error = true;
        setValidationError({...validationError, bookingDateError : true});
      }

      if (!validateDate(booking.birthDate))
      {
        error = true;
        setValidationError({...validationError, dobError : true});
      }

      if (!validateTime(booking.bookingTime))
      {
        error = true;
        setValidationError({...validationError, bookingTimeError : true});
      }
     

      return !error;
   }

   const updateBooking = (payload) =>
   {
       setSaving(true);
       bookingService.updateBooking(payload).then( (res) => {
        setSaving(false);
        setEditMode({edit: false, person: null});
        setState(state => ({...state, RefreshPersonInfo : !state.RefreshPersonInfo}));

       }).catch ( (err) => {
         setSaving(false);
         setEditMode({edit: false, person: null});
         console.log(err);
       });
   }

  return (
    <React.Fragment>
          
      <Grid container direction="column" spacing={1} justify="flex-start"  alignItems="stretch">
          <div className={classes.title}> Following Records Found :</div>

          {state.foundRecords.map((person,index) => (
   
                <Grid item xs={12} md={12} key={`panel${index}`}>
                <div className={classes.root}>
                    <Accordion className={classes.Accordion} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id={`panel${index}bh-header`}
                    >
                        <Typography className={classes.heading}> {`#${index+1}`} </Typography>
                        <Typography className={classes.secondaryHeading}>
                        {`${person.forenameCapital} ${person.surnameCapital}`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.infoDetails}>
                        
                        <ul className={classes.ul}>

                            <li hidden={(editMode.edit && editMode.person._id === person._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick = {() => {handleEditModeChanged(true, person)}}
                                    className={classes.EditButton}
                                 >
                                    Edit Booking Info
                                </Button>
                            </li>

                            <li hidden={!(editMode.edit && editMode.person._id  === person._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled = {saving}
                                    onClick = {() => {handleEditModeChanged(false, person)}}
                                    className={classes.SaveButton}
                                 >
                                    Save Changes
                                </Button>
                            </li>

                            <li hidden={!(editMode.edit && editMode.person._id === person._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    disabled = {saving}
                                    onClick = {() => {handleEditModeChanged(false, null)}}
                                    className={classes.CancelButton}
                                 >
                                    Cancel
                                </Button>
                            </li>


                            <li className={classes.li}>
                                <span className={classes.infoTitle}>BOOKED DATE</span> 
                            

                                <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{dateFormat(new Date(person.bookingDate),'dd mmm yyyy').toUpperCase() }</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                          <TextField 
                                                      error={validationError.bookingDateError}
                                                      className={classes.TextBox} 
                                                      value={bookingDate}
                                                      onChange = {bookingDateChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span> 


                            </li>

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>BOOKED TIME</span> 
                                <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.bookingTime.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                          <TextField 
                                                       error={validationError.bookingTimeError}
                                                      className={classes.TextBox} 
                                                      value={bookingTime}
                                                      onChange = {bookingTimeChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span> 


                            </li>

                            <li className={classes.li}>
                            <span className={classes.infoTitle}>GENDER</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.gender?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                          <TextField 
                                                      className={classes.TextBox} 
                                                      value={gender}
                                                      onChange = {genderChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span> 
                            </li>
                            <li className={classes.li}>
                            <span className={classes.infoTitle}>TITLE</span> 
                                       <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.title?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                          <TextField 
                                                      className={classes.TextBox} 
                                                      value={title}
                                                      onChange = {titleChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span> 
                             
                            </li>
                            <li className={classes.li}>
                            <span className={classes.infoTitle}>FORENAME</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.forenameCapital}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={forename}
                                                      onChange = {forenameChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span> 
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>SURNAME</span>
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.surnameCapital}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={surname}
                                                      onChange = {surnameChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>EMAIL</span> 
                                       <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.email?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={email}
                                                      onChange = {emailChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>D.O.B</span>
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{dateFormat(new Date(person.birthDate),'dd mmm yyyy').toUpperCase() }</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      error={validationError.dobError} 
                                                      className={classes.TextBox} 
                                                      value={dob}
                                                      onChange = {dobChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>TEL</span>
                                 <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.phone?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={tel}
                                                      onChange = {telChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>POST CODE</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.postCode?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={postCode}
                                                      onChange = {postCodeChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>ADDRESS</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.address?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={address}
                                                      onChange = {addressChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>NOTES</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.notes?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={notes}
                                                      onChange = {notesChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>PASSPORT NO.</span>
                                <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.passportNumber?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={passport}
                                                      onChange = {passportChanged}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>  
                            </li>

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>SECOND PASSPORT NO.</span> 
                                        <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.passportNumber2?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                        <TextField 
                                                      className={classes.TextBox} 
                                                      value={passport2}
                                                      onChange = {passport2Changed}
                                                      inputProps= {{
                                                          style:{
                                                            padding: 0
                                                          }
                                                        }
                                                      }
                                                      > 
                                          </TextField> 
                                        </span>   
                            </li>

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>REQUEST FOR CERTIFICATE</span> 
                                <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.certificate ? ( <CheckIcon className={classes.checkIcon}/> ) :  <CloseIcon className={classes.closeIcon}/> }</span>
                                <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                    <FormControlLabel className={classes.formControl} 
                                          control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
                                          label=''
                                        />
                                </span>    
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>REQUEST FOR ANTIBODY TEST</span>
                                <span hidden={(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>{person.antiBodyTest ? <CheckIcon className={classes.checkIcon}/> :  <CloseIcon className={classes.closeIcon}/> }</span>  
                                <span hidden={!(editMode.edit && editMode.person._id  === person._id)} className={classes.infoData}>
                                    <FormControlLabel className={classes.formControl} 
                                          control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={antiBodyTest} onChange={antiBodyTestChanged} />}
                                          label=''
                                        />
                                </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>STATUS</span> {getStatusLabel(person.status)} 
                            </li>
      
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>TOTAL CHARGES</span> <span className={calculatePrice(person) <= 199 ? classes.infoDataCharges : classes.infoDataChargesHigher}>{`£${calculatePrice(person)}`}</span>  
                            </li>

                            <li >
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadForm1(person._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Registration Form
                                </Button>
                            </li>

                            <li>
                                  <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadForm2(person._id)}}
                                    // onTouchTap = {() => {downloadForm2(person._id)}}
                                    className={classes.DownloadForm}
                                    >
                                    Download Lab Form
                                 </Button>
                            </li>

                            <li hidden={person.status !== 'report_sent' && person.status !== 'report_cert_sent' }>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadLabResults(person._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Lab Results
                                </Button>
                            </li>

                            <li hidden={person.status !== 'report_cert_sent'}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadCertificate(person._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Certificate
                                </Button>
                            </li>

                        </ul>

                    </AccordionDetails>
                    </Accordion>
                </div>
            </Grid> 
          ))}
    </Grid>
    </React.Fragment>
  );
}
