import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { fade, makeStyles} from '@material-ui/core/styles';
import {
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Container,
  Grid, Slide 
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

  expandIcon: {
    fontSize: '48px',
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

const SearchView = function (props) {
  const classes = useStyles();

  const [grid, setGrid] = useState(<Grid />);
  const [events, setEvents] = useState(props.events);
  const [eventsLength, setEventsLength] = useState(props.events);
  const [totalEventCount, setTotalEventCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandClicked, setExpandClicked] = useState(false);
  const [pageLength, setPageLength] = useState(15);

  useEffect(() => {
    if (totalEventCount !== props.events.length) {
      setPageLength(15);
      setTotalEventCount(props.events.length);
      setEvents(props.events);
      setGrid(buildGrid(props.events, 15));
    } else if (events.length !== eventsLength) {
      setPageLength(15);
      setGrid(buildGrid(events, 15));
      setEventsLength(events.length);
    } else if (expandClicked) {
      setGrid(buildGrid(events));
      setExpandClicked(false);
    }
  });

  const filter = function (search) {
    if (!search.length) {
      return props.events;
    }
    const searchArr = search.split(/[\s-]/);
    const filteredEvents = props.events.filter(event => {
      const titleArr = event.name.split(/[\s-]/);
      for (let titleSegment of titleArr) {
        for (let searchSegment of searchArr) {
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
    return filteredEvents;
  };

  const buildGrid = function (events, num = null) {
    let arr = [];
    num = num || pageLength;
    for (let i = 0; i < events.length; i += 3) {
      if (i >= num) {
        break;
      }
      arr.push(
        <Grid key={`cardSearchGrid${events[i].experience_api_id}`} container>
          {buildCards(i, events)}{' '}
        </Grid>
      );
    }
    return arr;
  };

  const buildCards = function (i, events) {
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
          animationTime={(j % 15) * 400}
          handleCardActionClick={props.handleCardActionClick}
          path={props.path}
          handlePageClick={props.handlePageClick}
          handleMicroCardClick={props.handleMicroCardClick}
        />
      );
    }
    return arr;
  };

  const handleSearchTerm = function (e) {
    setSearchTerm(e.target.value);
  };

  const handleEnter = function (e) {
    if (e.key === 'Enter') {
      setEvents(filter(searchTerm));
    }
  };

  const handleClick = function (e) {
    setEvents(filter(searchTerm));
  };

  const handleExpand = function () {
    setPageLength(pageLength + 15);
    setExpandClicked(true);
  };

  return (
    <>
      <div style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 15 }}>
        <div>
          <Slide in={true} timeout={400} direction="left">
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
          </Slide>
        </div>
      </div>

      <Container maxWidth="lg" align="center">
        {props.events.length ? (
          grid
        ) : (
            <div>Sorry, we don't have any events for you to search today.</div>
          )}
      </Container>
      <Container maxWidth="lg" align="center">
        <ExpandMore
          className={classes.expandIcon}
          fontSize="large"
          onClick={handleExpand}
        />
      </Container>
    </>
  );
};

export default SearchView;
