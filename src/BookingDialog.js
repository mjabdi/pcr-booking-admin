import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import dateFormat from 'dateformat';
import { Button, Checkbox, FormControlLabel, Link, TextField, Tooltip } from '@material-ui/core';
import PDFService from './services/PDFService';

import {calculatePrice} from './PriceCalculator';

import FileSaver from 'file-saver';

import bookingService from './services/BookService';
import { CheckBox } from '@material-ui/icons';
import { parse } from 'date-fns';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide'  

import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import BookService from './services/BookService';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  lineThrough:{
    textDecoration : "line-through",
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

  AccordionDeleted:{
    backgroundColor : "#aaa",
    color: "#555"
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

  PositiveLabel:{
    backgroundColor: "red",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px",
    fontWeight: "800"
  },

  EditButton:
  {
    marginBottom : "20px",
    backgroundColor : "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration : "none !important",
    padding: "10px"   
  },

  RestoreButton:
  {
    marginBottom : "20px",
    backgroundColor : "#eee",
    color: "#333",
    "&:hover": {
      background: "#f1f1f1",
      color: "#111"
    },
    textDecoration : "none !important",
    padding: "10px"   
  },


  DeleteButton:
  {
    marginBottom : "20px",
    backgroundColor : "#d90015",
    "&:hover": {
      background: "#b80012",
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
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },






}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PaperComponent(props) {
  return (
    <Draggable handle="#alert-dialog-slide-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}



export default function BookingDialog(props) {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);

    const [expanded, setExpanded] = React.useState('panel0');

    const [editMode, setEditMode] = React.useState({edit : false, person : null});
    const [deleteMode, setDeleteMode] = React.useState({delete : false, person : null});
    const [restoreMode, setRestoreMode] = React.useState({restore : false, person : null});

    const [saving, setSaving] =  React.useState(false);
    const [deleting, setDeleting] =  React.useState(false);
    const [restoring, setRestoring] =  React.useState(false);

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

    const [refreshData, setRefreshData] = React.useState(false);

    const [booking, setBooking] = React.useState(null);

    const [recordChanged, setRecordChanged] = React.useState(false);

    const [fieldChanged, setFieldChanged] = React.useState(false);

    useEffect( () => {

      if (booking)
      {
        const isChanged = (             
           bookingDate !== booking.bookingDate 
        || bookingTime !== booking.bookingTime
        || gender !== booking.gender
        || forename !== booking.forenameCapital
        || surname !== booking.surnameCapital
        || title !== booking.title
        || email !== booking.email
        || dob !== booking.birthDate
        || tel !== booking.phone
        || postCode !== booking.postCode
        || address !== booking.address
        || passport !== booking.passportNumber
        || passport2 !== booking.passportNumber2
        || certificate !== booking.certificate
        || antiBodyTest !== booking.antiBodyTest
        );

        setRecordChanged(isChanged);

  

      }
    }, [fieldChanged]);

    useEffect( () => {
      if (!props.open)
      {
        setTimeout(() => {
          setEditMode({edit: false, person: null});
          setRecordChanged(false);
        }, 500);
       
      }
    }, [props.open])

    const bookingDateChanged = (event) =>
    {
      setBookingDate(event.target.value);
      setValidationError({...validationError, bookingDateError : false});
      setFieldChanged(!fieldChanged);
    }

    const bookingTimeChanged = (event) =>
    {
      setBookingTime(event.target.value);
      setValidationError({...validationError, bookingTimeError : false});
      setFieldChanged(!fieldChanged);
    }

    const genderChanged = (event) =>
    {
      setGender(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const titleChanged = (event) =>
    {
      setTitle(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const forenameChanged = (event) =>
    {
      setForename(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const surnameChanged = (event) =>
    {
      setSurnme(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const emailChanged = (event) =>
    {
      setEmail(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const dobChanged = (event) =>
    {
      setDOB(event.target.value);
      setValidationError({...validationError, dobError : false});
      setFieldChanged(!fieldChanged);
    }

    const telChanged = (event) =>
    {
      setTel(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const postCodeChanged = (event) =>
    {
      setPostCode(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const addressChanged = (event) =>
    {
      setAddress(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const notesChanged = (event) =>
    {
      setNotes(event.target.value);
    }

    const passportChanged = (event) =>
    {
      setPassport(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const passport2Changed = (event) =>
    {
      setPassport2(event.target.value);
      setFieldChanged(!fieldChanged);
    }

    const certificateChanged = (event) =>
    {
      setCertificate(event.target.checked);
      setFieldChanged(!fieldChanged);
    }

    const antiBodyTestChanged = (event) =>
    {
      setAntiBodyTest(event.target.checked);
      setFieldChanged(!fieldChanged);
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
          <span  className={classes.ReportCertSentLabel}> {`Report & Certificate Sent`} </span>
        );
      }
      else if (status === 'positive')
      {
        return (
          <span  className={classes.PositiveLabel}> {`POSITIVE`} </span>
        );
    
      }
      else{
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
         setRecordChanged(false);
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

       if (year < 1900)
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
        setRefreshData(!refreshData);
        

       }).catch ( (err) => {
         setSaving(false);
         setEditMode({edit: false, person: null});
         console.log(err);
       });
   }

   const deleteBooking = (id) =>
   {
       setDeleting(true);
       bookingService.deleteBooking(id).then( (res) => {
        setDeleting(false);
        setDeleteMode({delete: false, person: null});
        setRefreshData(!refreshData);

       }).catch ( (err) => {
          setDeleting(false);
          setDeleteMode({delete: false, person: null});
         console.log(err);
       });
   }

   const restoreBooking = (id) =>
   {
       setRestoring(true);
       bookingService.unDeleteBooking(id).then( (res) => {
        setRestoring(false);
        setRestoreMode({restore: false, person: null});
        setRefreshData(!refreshData);

       }).catch ( (err) => {
        setRestoring(false);
        setRestoreMode({restore: false, person: null});
         console.log(err);
       });
   }



   const handleDeleteModeChanged = (del, person) => {

    if (del)
    {
      setDeleteMode({delete: del, person: person});
    }
    else if (!del && !person)
    {
      setDeleteMode({delete: del, person: person});
    }
    else if (!del && person)
    {
        deleteBooking(person._id);
    }
  }

  const handleRestoreModeChanged = (restore, person) => {

    if (restore)
    {
      setRestoreMode({restore: restore, person: person});
    }
    else if (!restore && !person)
    {
      setRestoreMode({restore: restore, person: person});
    }
    else if (!restore && person)
    {
        restoreBooking(person._id);
    }
  }

  useEffect( () => 
  {
    if (props.booking)
    {
      BookService.getBookingById(props.booking._id).then( res => {
        setBooking(res.data);
      }).catch(err => {
        console.log(err);
      });

      setState(state => ({...state, bookingDialogDataChanged : !state.bookingDialogDataChanged ? true : false}));
    }

  } , [refreshData]);


  useEffect( () => {
    if (props.booking)
    {
      setBooking(props.booking);
    }

  }, [props.booking]);


  return (
    <React.Fragment>

      {booking && (

      <React.Fragment>
                <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.onClose}
                PaperComponent={PaperComponent}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                

                      <Grid
                      container
                      direction="row"
                      justify="center"
                      spacing = {2}
                      alignItems="center"
                      >
                            <Grid item>
                              <div style={booking.deleted ? {paddingBottom: "5px", textDecoration: "line-through"} : {} }>
                                   {`${booking.forenameCapital} ${booking.surnameCapital}`}
                              </div>
                                 
                              </Grid>

                              {booking.deleted && (
                              <Grid item>
                                <Tooltip  title="This record has been deleted.">
                                    <DeleteIcon  style={{padding: 0, margin: 0,  color: "#333", fontSize: 25 }}/>
                                </Tooltip>
                              </Grid>
                        )}

                      </Grid>

                      
                  
                </DialogTitle>
                <DialogContent>
                <div
                    style={{
                      minHeight: "600px",
                      maxHeight: "600px",
                      minWidth: "500px",
                      maxWidth: "800px",
                      paddingTop: "20px"
                    }}
                    
                    >


                  <Grid item xs={12} md={12} key={`panel0`}>
            

                    <div className={classes.infoDetails}>

                        <ul className={classes.ul}>

                        {/* Restore Functionality ******************************************* */}  
                        <li hidden={!(restoreMode.restore && restoreMode.person._id  === booking._id)}>
                              <div style={{fontWeight: "500", paddingBottom: "5px", paddingLeft: "5px", fontSize:"16px" , color:"#333"}}>
                                Are you sure you want to restore this record?
                              </div>
                            </li>

                            <li hidden={!booking.deleted || (restoreMode.restore && restoreMode.person._id === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick = {() => {handleRestoreModeChanged(true, booking)}}
                                    className={classes.RestoreButton}
                                 >
                                   Restore This Record
                                </Button>
                            </li>

                            <li hidden={!(restoreMode.restore && restoreMode.person._id  === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled = {restoring}
                                    onClick = {() => {handleRestoreModeChanged(false, booking)}}
                                    className={classes.SaveButton}
                                 >
                                    YES, Restore this!
                                </Button>
                            </li>

                            <li hidden={!(restoreMode.restore && restoreMode.person._id  === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    disabled = {restoring}
                                    onClick = {() => {handleRestoreModeChanged(false, null)}}
                                    className={classes.CancelButton}
                                 >
                                    Cancel
                                </Button>
                            </li>

                           {/*  ******************************************************************* */}

                              {/* Edit Functionality ******************************************* */}

                            <li hidden={booking.deleted || deleteMode.delete || (editMode.edit && editMode.person._id === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick = {() => {handleEditModeChanged(true, booking)}}
                                    className={classes.EditButton}
                                 >
                                    Edit Booking Info
                                </Button>
                            </li>

                            <li hidden={!(editMode.edit && editMode.person._id  === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled = {saving || !recordChanged}
                                    onClick = {() => {handleEditModeChanged(false, booking)}}
                                    className={classes.SaveButton}
                                 >
                                    Save Changes
                                </Button>
                            </li>

                            <li hidden={!(editMode.edit && editMode.person._id === booking._id)}>
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
                            
                            {/* ****************************************************************************************** */}


                            {/* Delete Functionality ******************************************* */}

                            <li hidden={!(deleteMode.delete && deleteMode.person._id  === booking._id)}>
                              <div style={{fontWeight: "600",  paddingBottom: "5px", paddingLeft: "5px", fontSize:"16px"}}>
                                Are you sure you want to delete this record?
                              </div>
                            </li>

                            <li hidden={props.deleteButtonDisabled || booking.deleted ||  editMode.edit || (deleteMode.delete && deleteMode.person._id === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick = {() => {handleDeleteModeChanged(true, booking)}}
                                    className={classes.DeleteButton}
                                 >
                                   Delete This Record
                                </Button>
                            </li>

                            <li hidden={!(deleteMode.delete && deleteMode.person._id  === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled = {deleting}
                                    onClick = {() => {handleDeleteModeChanged(false, booking)}}
                                    className={classes.SaveButton}
                                 >
                                    YES, Delete this!
                                </Button>
                            </li>

                            <li hidden={!(deleteMode.delete && deleteMode.person._id === booking._id)}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="default"
                                    disabled = {deleting}
                                    onClick = {() => {handleDeleteModeChanged(false, null)}}
                                    className={classes.CancelButton}
                                 >
                                    Cancel
                                </Button>
                            </li>
                                 
                            {/* ****************************************************************************************** */}

                            <li className={classes.li}>
                                <span className={classes.infoTitle}>BOOKED DATE</span> 
                            

                                <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.bookingDate }</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                          <TextField 
                                                      fullWidth
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
                                <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.bookingTime.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                          <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.gender?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                          <TextField 
                                                      fullWidth
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
                                       <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.title?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                          <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.forenameCapital}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.surnameCapital}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                       <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.email?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.birthDate }</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                 <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.phone?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.postCode?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.address?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                <span className={classes.infoTitle}>PASSPORT NO.</span>
                                <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.passportNumber?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                        <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.passportNumber2?.toUpperCase()}</span>  
                                        <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                        <TextField 
                                                      fullWidth
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
                                <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.certificate ? ( <CheckIcon className={classes.checkIcon}/> ) :  <CloseIcon className={classes.closeIcon}/> }</span>
                                <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                    <FormControlLabel className={classes.formControl} 
                                          control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
                                          label=''
                                        />
                                </span>    
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>REQUEST FOR ANTIBODY TEST</span>
                                <span hidden={(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>{booking.antiBodyTest ? <CheckIcon className={classes.checkIcon}/> :  <CloseIcon className={classes.closeIcon}/> }</span>  
                                <span hidden={!(editMode.edit && editMode.person._id  === booking._id)} className={classes.infoData}>
                                    <FormControlLabel className={classes.formControl} 
                                          control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={antiBodyTest} onChange={antiBodyTestChanged} />}
                                          label=''
                                        />
                                </span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>STATUS</span> {getStatusLabel(booking.status)} 
                            </li>
      
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>TOTAL CHARGES</span> <span className={calculatePrice(booking) <= 199 ? classes.infoDataCharges : classes.infoDataChargesHigher}>{`£${calculatePrice(booking)}`}</span>  
                            </li>

                            <li  hidden={booking.deleted} >
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadForm1(booking._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Registration Form
                                </Button>
                            </li>

                            <li  hidden={booking.deleted}>
                                  <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadForm2(booking._id)}}
                                    // onTouchTap = {() => {downloadForm2(person._id)}}
                                    className={classes.DownloadForm}
                                    >
                                    Download Lab Form
                                 </Button>
                            </li>

                            <li hidden={ booking.deleted || (booking.status !== 'report_sent' && booking.status !== 'report_cert_sent') }>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadLabResults(booking._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Lab Results
                                </Button>
                            </li>

                            <li hidden={booking.deleted || booking.status !== 'report_cert_sent'}>
                                 <Button
                                    type="button"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    onClick = {() => {downloadCertificate(booking._id)}}
                                    // onTouchTap = {() => {downloadForm1(person._id)}}
                                    className={classes.DownloadForm}
                                 >
                                    Download Certificate
                                </Button>
                            </li>

                        </ul>

                    </div>

            </Grid> 
           
                  </div>
                  <Backdrop className={classes.backdrop} open={saving || deleting || restoring}>
                        <CircularProgress color="inherit" />
                  </Backdrop>

                </DialogContent>
              </Dialog>

      
        </React.Fragment>
      )}

    </React.Fragment>
  );
}
