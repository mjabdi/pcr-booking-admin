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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import SignIn from './SignIn';
import AdminConsole from './AdminConsole';

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

const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
        backgroundColor: "#333",
        color: "#fff",
        alignItems: 'center'
    
      },

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

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Navigator() {

    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);




    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                           PCR Booking Admin Console
                    </Typography>
                </Toolbar>
             </AppBar>

            <React.Fragment>
                {!state.signedIn && (
                    <SignIn/> 
                )}

                { state.signedIn && (
                   <AdminConsole/>
                )}

            </React.Fragment>        
        
        
        </React.Fragment>
    );
}