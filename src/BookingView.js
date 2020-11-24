import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import BookService from './services/BookService';
import * as dateformat from 'dateformat';
import GlobalState from './GlobalState';
import { getMenuIndex } from './MenuList';
import {FormatDateFromString, FormatDateFromStringShortYear} from './DateFormatter';


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function BookingView() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);  

  const [data, setData] = React.useState({bookings: [] , isFetching : false});

  const [refresh, setRefresh] = React.useState(false);

  const seeMoreRecords = (event) => {
    event.preventDefault();
    setState(state=>({...state, currentMenuIndex:getMenuIndex(`recentBookings`)}));
  }

  const loadData = () => 
  {
    setData({bookings: data.bookings, isFetching: true});
    BookService.getRecentBookings().then( (res) =>{
        setData({bookings: res.data, isFetching: false});

    }).catch( (err) => {
        console.log(err);
        setData({bookings: data.bookings, isFetching: false});
    });
  }


  useEffect( () => {
          loadData();
        },
        [refresh]);   


   useEffect( () => {
     loadData();
     setInterval(() => {
       setRefresh(refresh => !refresh);
     }, 5000);
   }, []) ;    

   const formatTimeStamp = (timeStamp) =>
   {
     const todayStr = dateformat(new Date(), 'yyyy-mm-dd');
     const timeStampStr = dateformat(timeStamp, 'yyyy-mm-dd');
     if (todayStr === timeStampStr)
     {
       return dateformat(timeStamp, "'Today', h:MM:ss TT");
     }
     else
     {
        return dateformat(timeStamp, "mmm dS, h:MM:ss TT");
     }
   }

  return (
    <React.Fragment>
      <Title>Recent Bookings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>TimeStamp</TableCell>        
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>D.O.B</TableCell>
            <TableCell>Booked Date</TableCell>
            <TableCell>Booked Time</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {data.bookings.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{formatTimeStamp(row.timeStamp)}</TableCell>
              <TableCell>{row.forename}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{FormatDateFromString(row.birthDate)}</TableCell>
              <TableCell>{FormatDateFromString(row.bookingDate)}</TableCell>
              <TableCell>{row.bookingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={seeMoreRecords}>
          See more records
        </Link>
      </div>
    </React.Fragment>
  );
}