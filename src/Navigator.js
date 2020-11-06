import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import GlobalState from './GlobalState';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import SignIn from './SignIn';
import AdminConsole from './AdminConsole';
import {BrowserView, MobileView} from 'react-device-detect';
import Dashboard from './Dashboard';


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
        position: 'static',
        backgroundColor: "#333",
        color: "#fff",
        //alignItems: 'center'
    
      },

      signOutButton:{
        color: "#fff",
        marginRight : "20px",
        fontWeight: "500"
      },

      title: {
        flexGrow : 1
      }


}));

export default function Navigator() {

    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);

    const handleSignOut = () =>
    {
      setState(state => ({...state, signedIn: false}));
    }

    return (
        <React.Fragment>
            <CssBaseline />

                {!state.signedIn && (
                    <SignIn/> 
                )}

                { state.signedIn && (
                   <Dashboard/>
                )}      
        
        </React.Fragment>
    );
}