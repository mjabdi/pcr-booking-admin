import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Tooltip } from '@material-ui/core';
import * as dateformat from 'dateformat';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>

      <Title>Current Visits</Title>
      <Typography component="p" variant="h6">
        9:00 AM - 9:15 AM
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {dateformat(new Date(), 'dd mmmm, yyyy') } 
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          
                  View Visitors
          
        </Link>
      </div>

    </React.Fragment>
  );
}