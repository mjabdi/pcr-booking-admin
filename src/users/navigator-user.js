import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import GlobalState from './../GlobalState';



import WelcomeUser from './welcome-user';

import BookService from './../services/BookService';
import ErrorUser from './error-user';
import CancelTimeUser from './cancel-time-user';
import EditInfoUser from './edit-info-user';
import ChangeTimeUser from './change-time-user';
import CanceledResultUser from './canceled-result-user';
import TimeChangedResult from './timechanged-result-user';
import EditInfoResult from './edit-info-result-user';


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

export default function NavigatorUser(props) {

    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    const [loaded, setLoaded] = React.useState(false);

    useEffect( () => {

        if (props.pathId && props.pathId.length === 22)
        {
            const bookingRef = props.pathId.substr(0,11);
            const birthDate = props.pathId.substr(12,10);

            BookService.findBookingByRefBirthDate(bookingRef,birthDate).then( res => {

                if (res.data.status === 'OK')
                {
                    setState(state => ({...state,  userBooking : res.data.booking}) );
                    setLoaded(true);
                }else if (res.data.status === 'FAILED')
                {
                    if (res.data.error === 'Not Found')
                    {
                        setState(state => ({...state, pathIdNotFound : true}));
                    }else if (res.data.error === 'Time Passed')
                    {
                        setState(state => ({...state, pathIdNotFound:false, timePassed : true}));
                    }
                  
                    setLoaded(true);
                }
            }).catch((err) => {
                console.log(err);
                setLoaded(true);
            });

        }else
        {
            setState(state => ({...state, pathIdNotFound : true}) );
            setLoaded(true);
        }
    }, [state.RefreshInfo])

    return (
        <React.Fragment>
            <CssBaseline />

                {loaded && !state.welcomeUser && !state.pathIdNotFound && !state.timePassed && (
                    <WelcomeUser/> 
                )}

                {loaded && !state.welcomeUser && state.pathIdNotFound && (
                    <ErrorUser/>
                )}

                {loaded && !state.welcomeUser && state.timePassed && (
                    <ErrorUser/>
                )}

                {loaded && state.welcomeUser && state.changeTimeClicked && (
                    <ChangeTimeUser/>
                )}

                {loaded && state.welcomeUser && state.editInfoClicked && (
                    <EditInfoUser/>
                )}

                {loaded && state.welcomeUser && state.cancelTimeClicked && (
                    <CancelTimeUser/>
                )}

                {loaded && state.welcomeUser && state.canceledResult && (
                    <CanceledResultUser/>
                )}

                {loaded && state.welcomeUser && state.timeChangedResult && (
                    <TimeChangedResult/>
                )}

                {loaded && state.welcomeUser && state.editInfoResult && (
                    <EditInfoResult/>
                )}



        
        </React.Fragment>
    );
}