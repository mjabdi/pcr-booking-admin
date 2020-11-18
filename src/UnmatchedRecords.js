import React, {useEffect, useRef, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import BookService from './services/BookService';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Link, makeStyles, TextField, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import LoaderSpinner from 'react-loader-spinner';
import GlobalState from './GlobalState';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


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
  }
  
}));



export default function UnmatchedRecords() {
  
  const classes = useStyles();

  const columns = [
    { field: 'id', headerName: '#', width: 50 },

    { field: 'testDate', headerName: 'Test Date', width: 150 },
    { field: 'forename', headerName: 'Forename', width: 300 },
    { field: 'surname', headerName: 'Surname', width: 300 },
    { field: 'birthDate', headerName: 'D.O.B', width: 150 },
    { field: '_id' , headerName:'Action', width: 150 , renderCell: (params) => {
        if (selectedTab === 'unresolved')
        {
            return (
                <Button
                disabled = {params.value === disableId}
                type="button"
                variant="contained"
                color="primary"
                onClick = { event => archiveRecord(event,params.value)}
                className={classes.archiveButton}
              >
                archive
              </Button>
            );
        }else
        {
            return (
                <Button
                disabled = {params.value === disableId}
                type="button"
                variant="contained"
                color="primary"
                onClick = { event => unArchiveRecord(event,params.value)}
                className={classes.archiveButton}
              >
                Undo
              </Button>
            );
        }
        
    } },
   
  ];

  const [state, setState] = React.useContext(GlobalState);  

  const [data, setData] = React.useState({bookings: [] , cachedBookings: [], isFetching : false});

  const [selectedRow, setSelectedRow] = React.useState(null);

  const [filter,setFilter] = React.useState('');

  const [refresh, setRefresh] = React.useState(false);

  const [disableId, setDisableId] = React.useState(null);

  const [selectedTab, setSeletedTab] = React.useState('unresolved');

  const handleTabChanged = (event, value) => {
      if (value && value.length)
      {
        setSeletedTab(value);
      }
   
  };

  const archiveRecord = (event, id) =>
  {
      if (disableId)
      {
        return;
      }
        console.log(id);
        setDisableId(id);
        
        BookService.archiveRecord(id).then(
            (res) => {
                setDisableId(null);
                setRefresh(!refresh);
            }
        ).catch( (err) => {
            setDisableId(null);
        })
  }

  const unArchiveRecord = (event, id) =>
  {
      if (disableId)
      {
        return;
      }
        console.log(id);
        setDisableId(id);
        
        BookService.unArchiveRecord(id).then(
            (res) => {
                setDisableId(null);
                setRefresh(!refresh);
            }
        ).catch( (err) => {
            setDisableId(null);
        })
  }


  const lastPromise = useRef();

  useEffect( () => {

            var api = BookService.getUnmatchedRecords;
            if (selectedTab === 'archived')
            {
                api = BookService.getUnmatchedRecordsArchived;
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
                }
              },
              e => {
                if (currentPromise === lastPromise.current) {
                    console.log(e);
                    setData({bookings: data.bookings, cachedBookings: data.cachedBookings, isFetching: false});
                }
              });
        },
        [refresh, selectedTab]);



  useEffect( () => {

        if (filter && filter.trim().length > 0)
        {
          var filteredData = data.bookings.filter( (element) => {

            return (element.forename.toLowerCase().indexOf(filter.toLowerCase()) >= 0) ||
                   (element.surname.toLowerCase().indexOf(filter.toLowerCase()) >= 0) 
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
           Unmatched Records

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

        <ToggleButtonGroup
            value={selectedTab}
            style= {{marginBottom: "10px"}}
            exclusive
            onChange={handleTabChanged}
            aria-label="text alignment"
        >
            <ToggleButton value="unresolved" aria-label="left aligned">
                UnResolved
            </ToggleButton>
            <ToggleButton value="archived" aria-label="centered">
                Archived
            </ToggleButton>
    </ToggleButtonGroup>

    {/* {data.isFetching && (

        <LoaderSpinner
        type="ThreeDots"
        color="#3f51b5"
        height={50}
        width={50}
        timeout={0} //3 secs

     />


    )} */}


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
                  onSelectionChange = {handleSelectionChanged}
                  />
      </div>
    </React.Fragment>
  );
}