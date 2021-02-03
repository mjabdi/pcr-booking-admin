import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import GlobalState from './../../GlobalState';



import WelcomeUser from './welcome-user';

import GynaeBookService from './../../services/GynaeBookService';
import ErrorUser from './error-user';
import CancelTimeUser from './cancel-time-user';
import EditInfoUser from './edit-info-user';
import ChangeTimeUser from './change-time-user';
import CanceledResultUser from './canceled-result-user';
import TimeChangedResult from './timechanged-result-user';
import EditInfoResult from './edit-info-result-user';
import dateformat from 'dateformat'


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

function timePassed (bookingDate)
{
    const today= new Date();
    const todayStr = dateformat(today , 'yyyy-mm-dd');
    return (bookingDate < todayStr); 
}

export default function NavigatorUser(props) {

    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        document.title = "Edit Booking Info"
     }, []);

    useEffect( () => {

if (props.pathId && props.pathId.length === 24)
        {
            GynaeBookService.getBookingById(props.pathId).then( res => {
                const result = res.data
                if (result)
                {
                    if ((result.status && result.status.length > 0) && (result.status !== 'booked' || timePassed(result.bookingDate)))
                   {
                     setState(state => ({...state, pathIdNotFound:false, timePassed : true}));
                     setLoaded(true);
       
                   }else if (result.status === 'booked' && !timePassed(result.bookingDate) && !result.deleted)
                   {
                        setState(state => ({...state,  userBooking : result}) );
                        setLoaded(true);
                   }
                   else
                   {
                        setState(state => ({...state, pathIdNotFound : true}));
                        setLoaded(true);
                   }
                }
                else
                {
                    setState(state => ({...state, pathIdNotFound : true}));
                    setLoaded(true);
                }

            }).catch((err) => {
                console.log(err);
                setState(state => ({...state, pathIdNotFound : true}));
                setLoaded(true);
            });
        }
        else
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