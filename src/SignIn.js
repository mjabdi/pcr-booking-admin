import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GlobalState from './GlobalState';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Medical Express Clinic
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({

    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },  

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = React.useContext(GlobalState);

  const signIn = () => {
    if (state.user && state.password && state.user.toLowerCase() === 'admin' && state.password === 'pcr$321')
    {
        setState(state => ({...state, signedIn : true }));
    }else
    {
        setState(state => ({...state, signedInError : true }));
    }
  }

  const userChanged = (event) =>
  {
      setState(state => ({...state, user : event.target.value }));
      setState(state => ({...state, signedInError : false }));
  }

  const passwordChanged = (event) =>
  {
      setState(state => ({...state, password : event.target.value }));
      setState(state => ({...state, signedInError : false }));
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="usrname"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={userChanged}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordChanged}
            onKeyPress= {event => {
              if (event.key === 'Enter') {
                signIn();
              }
            }}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {signIn}
            onTouchTap = {signIn}
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </div>

    {state.signedInError && (
        <div className={classes.root}>
             <Alert severity="error">Invalid Username or Password. Please try again.</Alert>
        </div> 

    )}


      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}