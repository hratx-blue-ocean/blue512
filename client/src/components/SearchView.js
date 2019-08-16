import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Container,
  Grid
} from '@material-ui/core/';
import CardContainer from './CardContainer.js';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey['600'], 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey['800'], 0.25)
    },
    margin: '0 auto',
    width: '35%',
    top: '8px'
  },
  searchIcon: {
    position: 'absolute',
    left: '92%',
    paddingTop: '4px',
    cursor: 'pointer'
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 450
    }
  }
}));

const SearchView = function(props) {
  const classes = useStyles();

  const [grid, setGrid] = useState(<Grid />);
  const [events, setEvents] = useState(props.events);
  const [eventsLength, setEventsLength] = useState(props.events);
  const [totalEventCount, setTotalEventCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (totalEventCount !== props.events.length) {
      console.log('new props!', props.events.length);
      setTotalEventCount(props.events.length);
      setEvents(props.events);
      setGrid(buildGrid(props.events));
    } else if (events.length !== eventsLength) {
      console.log('new events length!');
      setGrid(buildGrid(events));
      setEventsLength(events.length);
    }
    // else if (oldSearchTerm !== searchTerm) {
    //   // setBooleans(searchedBoolean(searchTerm));
    //   setEvents(filter(searchTerm));
    //   setOldSearchTerm(searchTerm);
    //   console.log('newSearchTerm!', searchTerm, booleans);
    // }
  });

  const filter = function(search) {
    console.log('filter called');
    if (!search.length) {
      return props.events;
    }
    const searchArr = search.split(/[\s-]/);
    const filteredEvents = props.events.filter(event => {
      const titleArr = event.name.split(/[\s-]/);
      for (let titleSegment of titleArr) {
        for (let searchSegment of searchArr) {
          console.log(
            new RegExp('^' + searchSegment + '.*', 'i').test(
              titleSegment.toLowerCase()
            )
          );
          if (
            new RegExp('^' + searchSegment + '.*', 'i').test(
              titleSegment.toLowerCase()
            )
          ) {
            return true;
          }
        }
      }
      return false;
    });
    console.log(filteredEvents);
    return filteredEvents;
  };

  const buildGrid = function(events) {
    let arr = [];
    for (let i = 0; i < events.length; i += 3) {
      arr.push(
        <Grid key={`cardSearchGrid${events[i].experience_api_id}`} container>
          {buildCards(i, events)}{' '}
        </Grid>
      );
    }
    return arr;
  };

  const buildCards = function(i, events) {
    let arr = [];
    for (let j = i; j < i + 3; j++) {
      if (!events[j]) {
        break;
      }
      arr.push(
        <CardContainer
          key={`cardSearchCard${events[j].experience_api_id}`}
          event={events[j]}
          day={''}
          animationTime={j * 400}
          handleAddToCalClick={props.handleAddToCalClick}
        />
      );
    }
    return arr;
  };

  const handleSearchTerm = function(e) {
    setSearchTerm(e.target.value);
  };

  const handleEnter = function(e) {
    if (e.key === 'Enter') {
      setEvents(filter(searchTerm));
    }
  };

  const handleClick = function(e) {
    setEvents(filter(searchTerm));
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div>
          <div className={classes.search}>
            <InputBase
              onKeyPress={handleEnter}
              onChange={handleSearchTerm}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <span className={classes.searchIcon} onClick={handleClick}>
              <SearchIcon />
            </span>
          </div>
        </div>
      </div>

      <Container maxWidth="lg" align="center">
        {props.events.length ? (
          grid
        ) : (
          <div>Sorry, we don't have any events for you to search today.</div>
        )}
      </Container>
    </>
  );
};

export default SearchView;
