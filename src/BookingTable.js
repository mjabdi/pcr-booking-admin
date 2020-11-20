import React, {useEffect, useRef, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import BookService from './services/BookService';
import Typography from '@material-ui/core/Typography';
import { Grid, Link, makeStyles, TextField, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import LoaderSpinner from 'react-loader-spinner';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { green, red } from '@material-ui/core/colors';
import GlobalState from './GlobalState';
import { Report } from '@material-ui/icons';
import { getMenuIndex } from './MenuList';






const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1),

  },
  
  refreshButton:{
    marginLeft: theme.spacing(2),
  },

  checkIcon:{
    color: "green"
  },

  closeIcon:{
    color: "red"
  },

  RefLink: {
    cursor: "pointer"
  },

  BookedLabel:{
    backgroundColor: "#606060",
    color: "#fff",
    paddingRight: "10px",
    paddingLeft: "10px"
  },

  PatientAttendedLabel:{
    backgroundColor: "#0066aa",
    color: "#fff",
    paddingRight: "15px",
    paddingLeft: "10px"
  },

  SampleTakenLabel:{
    backgroundColor: "#0066cc",
    color: "#fff",
    paddingRight: "40px",
    paddingLeft: "10px"
  },

  ReportSentLabel:{
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px"
  },

  ReportCertSentLabel:{
    backgroundColor: "#009900",
    color: "#fff",
    paddingRight: "68px",
    paddingLeft: "10px"
  },

  PositiveLabel:{
    backgroundColor: "red",
    color: "#fff",
    paddingRight: "90px",
    paddingLeft: "10px",
    fontWeight: "800"
  }


  
}));

const getTableTitle = (str) =>{

  if (str === 'today')
  {
    return `Today's Bookings`;
  }else if (str === 'old')
  {
    return `Old Bookings`;
  }else if (str === 'future')
  {
    return `Future Bookings`;
  }else if (str === 'recent')
  {
    return `Recent Bookings`;
  }else if (str === 'live')
  {
    return `Live Bookings`;
  }else if (str === 'completed')
  {
    return `Completed Bookings`;
  }else if (str === 'positive')
  {
    return `Positive Results`;
  }else if (str === 'deleted')
  {
    return `Deleted Records`;
  }
  
  else
  {
    return `All Bookings`;
  }


}

export default function BookingTable(props) {
  
  const classes = useStyles();




  const columns = [
    { field: 'id', headerName: '#', width: 50 },

    { field: 'bookingDate', headerName: 'Booked Date', width: 120 },
    { field: 'bookingTimeNormalized', headerName: 'Booked Time', width: 120 , valueGetter: (params) => {
      return params.getValue('bookingTime');

    }},
    { field: 'status', headerName: 'Status', width: 200, renderCell: (params) =>{
        if (params.value === 'booked')
        {
          return (
            <span className={classes.BookedLabel}> Booking Made </span>
          );
      
        }else if (params.value === 'patient_attended')
        {
          return (
            <span  className={classes.PatientAttendedLabel}> Patient Attended </span>
          );

        }else if (params.value === 'sample_taken')
        {
          return (
            <span  className={classes.SampleTakenLabel}> Sample Taken </span>
          );

        }else if (params.value === 'report_sent')
        {
          return (
            <span  className={classes.ReportSentLabel}> Report Sent </span>
          );

        }else if (params.value === 'report_cert_sent')
        {
          return (
            <span  className={classes.ReportCertSentLabel}> {`Rpt & Cert Sent`} </span>
          );

        }else if (params.value === 'positive')
        {
          return (
            <span  className={classes.PositiveLabel}> {`POSITIVE`} </span>
          );
        }
        
        else{
          return 'Unknown';
        }
      }
    },
    { field: 'bookingRef', headerName: 'Ref No.', width: 120 , renderCell: (params) =>{
      return (
        <Tooltip title="Go Find By Ref" placement="right">
            <Link className={classes.RefLink} onClick={
              () => {
                // console.log(params.value);

                setState(state => ({...state, currentMenuIndex: getMenuIndex(`findByRef`)}));
                setState(state => ({...state, ref : params.value}));
                setState(state => ({...state, refError : false})); 
                setState(state => ({...state, foundRecords : []}));
                setState(state => ({...state, findRecords : !state.findRecords}));
              }
            }>
              {params.value}
            </Link>
        </Tooltip>

      );
    }},
    { field: 'forenameCapital', headerName: 'Forename', width: 150 },
    { field: 'surnameCapital', headerName: 'Surname', width: 150 },
    { field: 'birthDate', headerName: 'D.O.B', width: 120 },
    { field: 'email', headerName: 'email', width: 300 , valueFormatter : (params) => {
      return params.value.toUpperCase();
    }},
    { field: 'phone', headerName: 'Tel', width: 150 },
    { field: 'passportNumber', headerName: 'Passport No.', width: 250,  valueGetter: (params) => {
      const pass2 = params.getValue('passportNumber2');
      if (pass2 && pass2.length > 0 && pass2.trim().length > 0)
      {
        return `${params.getValue('passportNumber')?.toUpperCase()} - ${params.getValue('passportNumber2')?.toUpperCase()}`
      }
      else
      {
        return params.getValue('passportNumber')?.toUpperCase();
      }
   

    }},
    { field: 'certificate', headerName: 'Certificate', width: 120,  renderCell: (params) => {
        return params.value ? (
          <CheckIcon className={classes.checkIcon}/>
        ) :
        (
          <CloseIcon className={classes.closeIcon}/> 
        );
    } },
    { field: 'antiBodyTest', headerName: 'Antibody Test', width: 120,  renderCell: (params) => {
      return params.value ? (
        <CheckIcon className={classes.checkIcon}/>
      ) :
      (
      <  CloseIcon className={classes.closeIcon}/> 
      );
  } },
    { field: 'postCode', headerName: 'Post Code', width: 150, valueFormatter : (params) => {
      return params.value.toUpperCase();
    } },
    { field: 'address', headerName: 'Address', width: 500, valueFormatter : (params) => {
      return params.value.toUpperCase();
    } },
    { field: 'notes', headerName: 'Notes', width: 500 },
  
  ];

  const [state, setState] = React.useContext(GlobalState);  

  const [data, setData] = React.useState({bookings: [] , cachedBookings: [], isFetching : false});

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [filter,setFilter] = React.useState('');

  const [refresh, setRefresh] = React.useState(false);

  const lastPromise = useRef();

  useEffect( () => {

            var api = BookService.getAllBookings;
            if (props.date === 'today')
            {
              api = BookService.getTodayBookings;
            }else if (props.date === 'old')
            {
              api = BookService.getOldBookings;
            }else if (props.date === 'future')
            {
              api = BookService.getFutureBookings;
            }else if (props.date === 'recent')
            {
              api = BookService.getRecentBookingsAll;
            }else if (props.date === 'live')
            {
              api = BookService.getLiveBookings;
            }else if (props.date === 'completed')
            {
              api = BookService.getCompletedBookings;
            }
            else if (props.date === 'positive')
            {
              api = BookService.getPositiveBookings;
            }
            else if (props.date === 'deleted')
            {
              api = BookService.getDeletedBookings;
            }
                       
            setData({bookings: [], cachedBookings: [], isFetching: true});
            const currentPromise = api().then( (res) =>{
              
              for (var i=0; i < res.data.length; i++)
              {
                res.data[i] = {...res.data[i], id : i + 1}
              }  
              
              return res.data;
            })

            lastPromise.current = currentPromise;

            currentPromise.then(
              result => {
                if (currentPromise === lastPromise.current) {
                  setData({bookings: result, cachedBookings: [...result], isFetching: false});
                  setPage(1);
                }
              },
              e => {
                if (currentPromise === lastPromise.current) {
                    console.log(e);
                    setData({bookings: data.bookings, cachedBookings: data.cachedBookings, isFetching: false});
                }
              });
        },
        [props.date, refresh]);



  useEffect( () => {

        if (filter && filter.trim().length > 0)
        {
          var filteredData = data.bookings.filter( (element) => {

            return (element.forename.toLowerCase().indexOf(filter.toLowerCase()) >= 0) ||
                   (element.surname.toLowerCase().indexOf(filter.toLowerCase()) >= 0) ||
                   (element.email.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
            
            ;
  
          });
  
  
          setData({bookings: filteredData, cachedBookings: data.cachedBookings, isFetching: false});
        }else
        {
          setData({bookings: [...data.cachedBookings], cachedBookings: data.cachedBookings, isFetching: false});
        }
      },
      [filter]);






  const refreshClicked = (event) =>{
    setFilter('');
    setRefresh(!refresh);

  }

  const filterChanged = (event) =>{
    setFilter(event.target.value);
  }

  const handleSelectionChanged = (newSelection) =>
  {
    if (newSelection.length > 0){
      setSelectedRow(newSelection.rows[0]);
    }
    
  }

  const [page, setPage] = React.useState(1);

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-between" alignItems="flex-end">
        <Grid item md={3}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {getTableTitle(props.date)}

            <Tooltip title="Refresh" placement="right">
              <IconButton
                color="primary"
                className={classes.refreshButton}
                onClick={refreshClicked}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

          </Typography>
        </Grid>

        <Grid item md={3}>

    {data.isFetching && (

        <LoaderSpinner
        type="ThreeDots"
        color="#3f51b5"
        height={50}
        width={50}
        timeout={0} //3 secs

     />


    )}


        </Grid>


        <Grid item md={3}>
          <TextField
            variant="standard"
            value={filter}
            onChange={filterChanged}
            margin="normal"
            size="small"
            id="filter"
            label="Filter"
            name="filter"
            autoComplete="off"
          />
        </Grid>
      </Grid>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid rows={data.bookings} 
                  columns={columns} 
                  autoPageSize
                  page={page}
                  onPageChange={(params) => {
                    setPage(params.page);
                  }}
                  onSelectionChange = {handleSelectionChanged}
                  />
      </div>
    </React.Fragment>
  );
}