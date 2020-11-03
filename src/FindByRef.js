import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GlobalState from './GlobalState';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { FormControl, Grid, Input, InputLabel } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Medical Express Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
        // placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };



const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },  

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    Find: {
        width: "80px"
    },

    title:{
        marginTop : "20px"
    },

    TextBox:{
        marginTop: "30px",
        "& > *" :
        {
            textAlign: "center"
        },
  
    },

    TextField:{

    }
}));

export default function FindByRef() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

    const handleChange = (event) =>
    {
        console.log(event.target.value);
    }

    const findRecords = () =>
    {
        
    }

  return (
    <React.Fragment>
        <CssBaseline />
        <div className={classes.title}>
            <Typography component="h6" variant="h6" align="center">
                Find Booking Appoinments
            </Typography>  
        </div> 

        <Grid container direction="column" spacing={1} justify="flex-start"  alignItems="center">

        <Grid item xs={12} md={12}>
            <FormControl className={classes.TextBox}>
                <TextField
                    autoFocus 
                    className = {classes.TextField}
                    width = "50px"
                    onChange={handleChange}
                    label="Reference No."
                    helperText="Enter Your 9-digits Reference No."
                    name="refNo"
                    id="refNo"
                    variant="outlined"
                    
                    size="normal"
                    margin="normal"
                    fullWidth = {true}
                    InputProps={{
                        inputComponent: TextMaskCustom,
                        style: { textAlign: 'center', fontSize:"24px", width: "210px", paddingLeft: "20px" }
                    }}
                />         
            </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
        <Button
            type="button"
                    
            variant="contained"
            color="primary"
            onClick = {findRecords}
            onTouchTap = {findRecords}
            className={classes.Find}
          >
            Find 
          </Button>  
        </Grid>






        </Grid>


        
    </React.Fragment>
   
  );
}