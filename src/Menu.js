import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


import { ListItemIcon, Tooltip } from '@material-ui/core';
import GlobalState from './GlobalState';
import { List, ListItem } from '@material-ui/core';

import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';

import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HistoryIcon from '@material-ui/icons/History';
import TimelineIcon from '@material-ui/icons/Timeline';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
 
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function DashboardPreview() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    setSelectedIndex(state.currentMenuIndex);
  }, [state.currentMenuIndex]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    setState(state => ({...state, currentMenuIndex: index}))
  };

  return (
        <React.Fragment>

            <List>
                    <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <NewReleasesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Today's Bookings" />
                    </ListItem>
                    <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Old Bookings" />
                    </ListItem>
                    <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <TimelineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Future Bookings" />
                    </ListItem>
                    <ListItem button selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Bookings" />
                    </ListItem>

                    <ListItem button selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Find By Ref No." />
                    </ListItem>
            </List>

        </React.Fragment>
  );
}