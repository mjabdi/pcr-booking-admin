import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import GlobalState from '../../GlobalState';
import { makeStyles , useTheme} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import TimeService from '../../services/BloodTimeService';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import {BrowserView, MobileView} from 'react-device-detect';

import dateformat from 'dateformat';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button'
// import { Mouse, Satellite } from '@material-ui/icons';
// import { BrowserView } from 'react-device-detect';


const useStyles = makeStyles((theme) => ({
    
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        // width: 500,
        // height: 450,
      },

      box: {
        //backgroundColor: "red",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#555",
        cursor: "pointer",
        "&:hover": {
            background: "green",
            color: "#fff"
          },
      },

      boxMobile: {
        //backgroundColor: "red",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#555",
        cursor: "pointer"
      },

      boxSelected: {
        backgroundColor: "green",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#fff",
        cursor: "pointer",
      },

      boxDisable: {
        backgroundColor: "#999",
        border: "1px solid #ddd",
        margin: "5px",
        padding: "5px",
        color: "#fff"
        
      },

  }));


  function isWeekend(date)
  {
      return (date.getDay() === 0 || date.getDay() === 6) /// Weekend
  }

export default function TimeForm() {
    const classes = useStyles();
    // const theme = useTheme();

    const [state, setState] = React.useContext(GlobalState);
    // const [bookingTime, setTime] = React.useState(state.userBooking.bookingTime ?? '');

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    const emptyTimeSlots = [];
    for (var i=0; i<28; i++)
    {
      emptyTimeSlots.push(i);
    }

    const [timeSlots, setTimeSlots] = React.useState(emptyTimeSlots);

    const LoadData = (dateStr) => {

      const date = new Date(dateStr);

      const promise1 = TimeService.getTimeSlots(date);
      setDataLoaded(false);
  
      Promise.all([promise1]).then( (values) => {
  
        const timeSlotsTmp = values[0].data;
        
        if (dateformat(date,'yyyy-mm-dd') < '2021-02-01')
        {
          timeSlotsTmp.forEach(time =>
            {
              time.available = false;
            });
        }


        setTimeSlots(timeSlotsTmp);
        setDataLoaded(true);
  
      }).catch( (err) =>
      {
        console.log(err);
      }
      );
    }

    useEffect(() => {
      if (state.bookingDate && state.bookingDate !== 'undefined')
         LoadData(state.bookingDate);
    }, [state.bookingDate]);


    const boxClicked = (key) =>
    {
        if (key)
        {
            // setTime(key);
            setState({...state, bookingTime : key});
        }

    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick a Time
      </Typography>

      {dataLoaded ?  (
            
          

            <React.Fragment>

              {checkFullyBooked(timeSlots) &&  (

              <React.Fragment>
                <div style={{fontSize:"1.2rem", paddingTop:"10px", paddingBottom:"10px", color:"#db0000" , fontWeight: "500", background:"#fff5f5"}}>
                      Sorry this day is already fully booked! 
                  <br/>Please choose an alternative day.
                </div>
                
              </React.Fragment>

              )}

              <BrowserView>
                  <div className={classes.root}>
                            <GridList cellHeight={60} className={classes.gridList} cols={4}>
                              {timeSlots.map((timeSlot) => (
                                <GridListTile key={timeSlot.time} cols={1}>
                                  <div 
                                      onClick= {() => {timeSlot.available || state.userBooking.bookingTime === timeSlot.time? boxClicked(timeSlot.time) : boxClicked(null)}}
                                      className={(timeSlot.available || state.userBooking.bookingTime === timeSlot.time) ? ((state.bookingTime === timeSlot.time)? classes.boxSelected : classes.box ): classes.boxDisable}>
                                      {timeSlot.time}
                                  </div>
                                </GridListTile>
                              ))}
                            </GridList>
                  </div>
              
              </BrowserView>

              <MobileView>

              <div className={classes.root}>
                            <GridList cellHeight={60} className={classes.gridList} cols={4}>
                              {timeSlots.map((timeSlot) => (
                                <GridListTile key={timeSlot.time} cols={1}>
                                  <div 
                                      onClick = {() => {timeSlot.available? boxClicked(timeSlot.time) : boxClicked(null)}}
                                      className={(timeSlot.available) ? ((state.bookingTime === timeSlot.time)? classes.boxSelected : classes.boxMobile ): classes.boxDisable}>
                                      {timeSlot.time}
                                  </div>
                                </GridListTile>
                              ))}
                            </GridList>
                  </div>

              </MobileView>

            </React.Fragment>
      ) : (
        <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >
                      <GridList cellHeight={60} className={classes.gridList} cols={4}>
                          {emptyTimeSlots.map((timeSlot) => (
                            <GridListTile key={timeSlot} cols={1}>
                                 <Skeleton variant="rect" width={120}  height={35} />
                            </GridListTile>
                          ))}
                        </GridList>
                  </Grid>

    </React.Fragment>

      ) }



    </React.Fragment>
  );
}

const checkFullyBooked = (timeSlots) =>
{
    let available = false;
    timeSlots.forEach(time => {
      if (time.available)
      {
        available = true;
      }
    });

    return !available;
}
