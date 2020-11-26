import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import BookService from '../services/BookService';

import CircularProgress from '@material-ui/core/CircularProgress';
import PersonIcon from '@material-ui/icons/Person';
import { Badge } from '@material-ui/core';
import GlobalState from '../GlobalState';

const useStyles = makeStyles((theme) => ({

    Container: {
        width: "100%",
        paddingTop: "40%",
        position: "relative",
        backgroundColor: "#fff"
    },

    ContainerPast: {
        width: "100%",
        paddingTop: "40%",
        position: "relative",
        backgroundColor: "#fafafa"
    },
    
    DayLabel: {
        position: "absolute",
        top: "5px",
        right: "5px",
        color: "#555",
        fontSize: "1rem"
    },

    DayLabelDisabled: {
        position: "absolute",
        top: "5px",
        right: "5px",
        color: "#ddd",
        fontSize: "1rem"
    },

    BookingCountLabel: {
        position: "absolute",
        top: "25%",
        left: "38%",
        color: "#3f51b5",
        backgroundColor: "#ebedf7",
        fontSize: "14px",
        fontWeight: "600",
        padding: "5px",
        borderRadius: "50%",
        minWidth: "30px"
    },

    BookingCountLabelBusy: {
        position: "absolute",
        top: "25%",
        left: "38%",
        color: "#b00000",
        backgroundColor: "#fce6e6",
        fontSize: "14px",
        fontWeight: "600",
        padding: "5px",
        borderRadius: "50%",
        minWidth: "30px"
    },

    LoadingProgress: {
        position: "absolute",
        top: "40%",
        left: "40%",
      },

      BookingCountGauge: {
        position: "absolute",
        bottom: "5%",
        left: "8%",
        width : "85%",
        height: "8%"
    },

  }));

const MAX_BOOKING_COUNT = 5;  

const WeekViewCell = ({key, date, time}) => {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingsCount, setBookingsCount] = React.useState(-1);

    const [isPast, setIsPast] = React.useState(false);

    useEffect( () => {
        const todayStr = dateformat(new Date(), 'yyyy-mm-dd');
        setIsPast(date < todayStr);

    }, [date]);

    useEffect ( () => {

        const fetchDate = async () =>
        {
            if (!date || date.length <= 0 || !time || time.length <= 0)
            {
                return;
            }
         
            if (isPast)
            {
                setBookingsCount(-2);
                return;
            }
    
            setBookingsCount(-1);
    
            var res = state.calendarCache?.find(record => record.method === 'getBookingsCountByDateStrandTime' && record.query === `${date}${time}`)?.res;
            if (!res)
            {
                res = await BookService.getBookingsCountByDateStrandTime(date, time);
                setState(state => ({...state, calendarCache : [...state.calendarCache, {method: 'getBookingsCountByDateStrandTime' , query : `${date}${time}`, res: res}]}));
            }
          
            if (res.data.count >= 0)
            {
                
                setBookingsCount(res.data.count);
            }   
        }

        fetchDate();
     
    }, [date, time]);


    const getBookingsCountLabel = (_bookingsCount) =>
    {
        if (_bookingsCount === -1)
        {
            return (
                <div className={classes.LoadingProgress}>
                      <CircularProgress disableShrink  />
                </div>
            );  
        }
        else if (_bookingsCount > 0 && !isPast)
        {
            if (_bookingsCount >= MAX_BOOKING_COUNT)
            {
                return (
                    <div className={classes.BookingCountLabelBusy}>
                        {_bookingsCount}
                    </div>
                );
            }
            else
            {
                return (
                    <div className={classes.BookingCountLabel}>
                        {_bookingsCount}
                    </div>
                );
            }
        }
    }

    const getBookingsCountGauge = (_bookingsCount) =>
    {
        if (_bookingsCount > 0 && !isPast)
        {
            let percent = (_bookingsCount / MAX_BOOKING_COUNT) * 100;
            if (percent > 100)
            {
                percent = 100;
            }

            // percent = 100 - percent;

            return (

                <div className={classes.BookingCountGauge}>
                  <div style={{padding:"0", margin:"0", width:"100%", height:"100%", backgroundColor: "#f5f5f5"}} >
                        <div  style={{padding:"0", margin:"0", height:"100%", width:`${percent}%`, backgroundColor: "#3f51b5"}} >

                        </div>
                  </div>
                </div>
            );
        }
    }

    return (
        <React.Fragment>

            <div className={isPast ? classes.ContainerPast : classes.Container}>

              {getBookingsCountLabel(bookingsCount)}

              {getBookingsCountGauge(bookingsCount)}

            </div>

        </React.Fragment>


    );
}

WeekViewCell.propTypes = {
    key: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  };

 
  
export default WeekViewCell;