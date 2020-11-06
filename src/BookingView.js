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



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function BookingView() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);  

  const [data, setData] = React.useState({bookings: [] , isFetching : false});

  const seeMoreRecords = (event) => {
    event.preventDefault();
    setState(state=>({...state, currentMenuIndex:100}));
  }


  useEffect( () => {

            setData({bookings: data.bookings, isFetching: true});
            BookService.getRecentBookings().then( (res) =>{
                setData({bookings: res.data, isFetching: false});

            }).catch( (err) => {
                console.log(err);
                setData({bookings: data.bookings, isFetching: false});
            });
        },
        []);   

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
              <TableCell>{dateformat(row.timeStamp, "mmm dS, h:MM:ss TT")}</TableCell>
              <TableCell>{row.forename}</TableCell>
              <TableCell>{row.surname}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell>{row.bookingDate}</TableCell>
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