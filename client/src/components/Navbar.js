import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton
} from '@material-ui/core/';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18
    // maxHeight: '200px'
  },
  button: {
    margin: theme.spacing(1),
    color: 'white',
    fontSize: 13,
    paddingTop: '4px'
  },
  selectedButton: {
    margin: theme.spacing(1),
    color: 'white',
    fontSize: 13,
    'border-bottom': '1px solid white',
    'border-radius': '0px',
    'margin-bottom': '7px'
  },
  Signupbutton: {
    margin: theme.spacing(1),
    color: 'white',
    fontSize: 18
  },
  input: {
    display: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    float: 'right',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();

  const signOut = function (handlePageClick) {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => { handlePageClick('/') });

  };

  window.getCalData = id_token => {
    window.gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
      })
      .then(data => {
        props.loadEvents(id_token, data.result.items);
      });
  };

  const generateSettingsIcon = () => {
    if (props.isSignedIn) {
      return (
        <MenuItem>
          <IconButton
            component={RouterLink}
            to="/settings"
            color="inherit"
            onClick={() => {
              props.handlePageClick('/settings');
            }}
          >
            <SettingsIcon />
          </IconButton>
        </MenuItem>
      );
    }
  };

  return (
    <div
      className={classes.grow}
      style={{
        marginBottom: 64
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <Button
            component={RouterLink}
            to="/"
            onClick={() => {
              props.handlePageClick('/');
            }}
            className={
              props.path === '/' ? classes.selectedButton : classes.button
            }
          >
            Some Events
          </Button>
          <Button
            component={RouterLink}
            to="/detailed"
            onClick={() => {
              props.handlePageClick('/detailed');
            }}
            className={
              props.path === '/detailed'
                ? classes.selectedButton
                : classes.button
            }
          >
            More Events
          </Button>
          <Button
            component={RouterLink}
            to="/search"
            onClick={() => {
              props.handlePageClick('/search');
            }}
            className={
              props.path === '/search' ? classes.selectedButton : classes.button
            }
          >
            All Events
          </Button>
          <Typography
            className={classes.title}
            component={RouterLink}
            to="/"
            onClick={() => {
              props.handlePageClick('/');
            }}
          >
            <img
              src="./logo.png"
              style={{
                maxHeight: '75px',
                marginTop: '-10px',
                marginBottom: '-20px'
              }}
            />
          </Typography>
          <div style={{ minWidth: '20%' }}>
            <div className={classes.sectionDesktop}>
              <div
                className={classes.button}
                id="my-signin2"
                data-onsuccess="onSignIn"
              />
              {props.isSignedIn ? (
                <Button className={classes.button} onClick={signOut}>
                  Sign Out
                </Button>
              ) : (
                <></>
              )}
              {generateSettingsIcon()}
            </div>
            <div className={classes.sectionMobile} />
            <div className={classes.sectionMobile} />

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
