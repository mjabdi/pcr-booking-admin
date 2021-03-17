import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    DatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import GlobalState from '../../GlobalState';
import {BrowserView, MobileView} from 'react-device-detect';

import TimeService from '../../services/BloodTimeService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import dateformat from 'dateformat';

import { format, addMinutes } from 'date-fns';

import { enGB, } from 'date-fns/locale'

import { isWeekend, getDay } from 'date-fns';




class UTCUtils extends DateFnsUtils {
 
  locale = enGB;
  // format(date, formatString) {
  //   return format(new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 ), formatString,enGB);
  // }

  // getCalendarHeaderText(date){
  //   return dateformat(date, 'mmmm yyyy');
  // }

  // getDayText(date)
  // {
  //   return dateformat(date, 'd');
  // }

}


const useStyles = makeStyles((theme) => ({

  loadingBox: {
    
  }

}));




export default function DateForm() {
   const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingDate, handleDateChange] = React.useState(state.userBooking.bookingDate ?? new Date());

    const [firstAvailableDay, setFirstAvailableDay] = React.useState(new Date());
    const [fullyBookedDays, setFullyBookedDays] = React.useState(null);

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    const LoadData = () => {

      const promise1 = TimeService.getFirstAvailableDate();
      const promise2 = TimeService.getFullyBookedDates();

      Promise.all([promise1, promise2]).then( (values) => {

        let firstday = new Date((values[0].data).date);
        firstday.setHours(0,0,0,0);
        let dec21 = new Date(2021,0,2,0,0,0,0);
        if (firstday < dec21 && state.userBooking.tr)
          firstday = dec21;
        
        firstday = new Date(firstday.getTime() - firstday.getTimezoneOffset() * 60 * 1000);

        setFirstAvailableDay(firstday);
        setFullyBookedDays(values[1].data);

        setDataLoaded(true);

      }).catch( (err) =>
      {
        console.log(err);
      });
}



    useEffect(() => {

      setState(state => ({...state, bookingDate : state.userBooking.bookingDate}));
      setState(state => ({...state, bookingTime : state.userBooking.bookingTime}));
      
      LoadData();



    },[]);

    

    const dateChanged = (date) =>
    {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);
        // const offset = parseInt(date.getTimezoneOffset());
        // console.log(offset);

        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
        handleDateChange(date);
        setState(state => ({...state, bookingDate : date}));
        if (dateformat(date,'yyyy-mm-dd') === state.userBooking.bookingDate)
        {
          setState(state => ({...state, bookingTime : state.userBooking.bookingTime}));
        }
        else
        {
          setState(state => ({...state, bookingTime : null}));
        }
       
    }

    const checkFullyBooked = (date) =>
  {
    var result = false;

    // if (isWeekend(date))
    // return true

    // if (getDay(date) === 1 || getDay(date) === 2 || getDay(date) === 3 ||  getDay(date) === 6 ||  getDay(date) === 0)
    // return true  

    if (dateformat(date,'yyyy-mm-dd') < dateformat(firstAvailableDay,'yyyy-mm-dd'))
    {
       return true;
    }

    else if (fullyBookedDays && fullyBookedDays.length > 0)
    {
      for (var i=0 ; i < fullyBookedDays.length ; i++ )
      {
        if (dateformat(new Date(fullyBookedDays[i]), 'yyyy-mm-dd') === dateformat(date,'yyyy-mm-dd'))
        {
          result = true;
        }
      }

      return result;
    }
    else
    {
      return false;
    }
}

  return (

    <React.Fragment>
               
                <Typography variant="h6" gutterBottom>
                    Pick a Date
                </Typography>

        {dataLoaded ?  (
            
                <React.Fragment>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >

                        <BrowserView>
                            <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                                    <DatePicker autoOk 
                                                disablePast="true" 
                                                openTo="date"
                                                orientation="landscape" 
                                                variant="static" 
                                                fullWidth
                                                value={bookingDate} 
                                                onChange={dateChanged} 
                                                shouldDisableDate={checkFullyBooked}
                                                />
                            </MuiPickersUtilsProvider>
                        </BrowserView>

                        <MobileView>
                            <MuiPickersUtilsProvider utils={UTCUtils} locale={enGB}>
                                        <DatePicker autoOk 
                                                    disablePast="true" 
                                                    openTo="date"
                                                    variant="static" 
                                                    fullWidth
                                                    value={bookingDate} 
                                                    onChange={dateChanged} 
                                                    shouldDisableDate={checkFullyBooked}
                                                    />
                                </MuiPickersUtilsProvider>
                        </MobileView>
                </Grid>

              </React.Fragment>
              )
            : 
            (
            <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >

                      <Skeleton variant="text" width={'80%'} />
                      <Skeleton variant="text" width={'80%'}  />
                      <Skeleton variant="rect" width={'80%'}  height={220} />

                  </Grid>
            </React.Fragment>
            )
          }
    </React.Fragment>
  );
}





function EquallDates(date1, date2)
{
   return (
           date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
   );      
}
