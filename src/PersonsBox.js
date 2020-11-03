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
import { Button, Link } from '@material-ui/core';
import PDFService from './services/PDFService';

import FileSaver from 'file-saver';

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
    marginBottom : "5px"
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
  }

}));


export default function PersonsBox() {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

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

  return (
    <React.Fragment>
    
      

      <Grid container direction="column" spacing={1} justify="flex-start"  alignItems="stretch">
          <div className={classes.title}> Following Records Found :</div>

          {state.foundRecords.map((person,index) => (
   
                <Grid item xs={12} md={12}>
                <div className={classes.root}>
                    <Accordion className={classes.Accordion} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id={`panel${index}bh-header`}
                    >
                        <Typography className={classes.heading}> {`#${index+1}`} </Typography>
                        <Typography className={classes.secondaryHeading}>
                        {`${person.forename} ${person.surname}`}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.infoDetails}>
                        
                        <ul className={classes.ul}>
                            <li className={classes.li}>
                            <span className={classes.infoTitle}>Gender</span> <span className={classes.infoData}>{person.gender}</span>   
                            </li>
                            <li className={classes.li}>
                            <span className={classes.infoTitle}>Title</span>  <span className={classes.infoData}>{person.title}</span>   
                            </li>
                            <li className={classes.li}>
                            <span className={classes.infoTitle}>Forename</span> <span className={classes.infoData}>{person.forename}</span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Surname</span> <span className={classes.infoData}>{person.surname}</span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Email</span> <span className={classes.infoData}>{person.email}</span>   
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>D.O.B</span> <span className={classes.infoData}>{dateFormat(new Date(person.birthDate),'dd mmm yyyy') }</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Telephone</span> <span className={classes.infoData}>{person.phone}</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Post Code</span> <span className={classes.infoData}>{person.postCode}</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Address</span> <span className={classes.infoData}>{person.address}</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Notes</span> <span className={classes.infoData}>{person.notes ?? 'N/A'}</span>  
                            </li>
                            <li className={classes.li}>
                                <span className={classes.infoTitle}>Passport No.</span> <span className={classes.infoData}>{person.passportNumber ?? 'N/A'}</span>  
                            </li>

                            <li>
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
                                    Download Clinic Form
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
