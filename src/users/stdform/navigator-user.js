import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';

import GlobalState from './../../GlobalState';



import WelcomeUser from './welcome-user';

import STDBookService from './../../services/STDBookService';
import ErrorUser from './error-user';
import dateformat from 'dateformat'
import SubmitFormDataResult from './edit-info-result-user';


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
    bookingDate = new Date(
      new Date(bookingDate).getTime() + 60 * 60 * 24 * 1000
    );
    return (bookingDate < todayStr); 
}

export default function NavigatorUser(props) {

    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    const [loaded, setLoaded] = React.useState(false);

    useEffect(() => {
        document.title = "Private STD Registration Form"
     }, []);

    useEffect( () => {

if (props.pathId && props.pathId.length === 24)
        {
            STDBookService.getBookingById(props.pathId).then( res => {
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

                {loaded && state.welcomeUser && state.submitFormData && (
                    <SubmitFormDataResult/>
                )}
        
        </React.Fragment>
    );
}