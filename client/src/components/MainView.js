import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
// import fetch from 'node-fetch';

// import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Grid, Container } from '@material-ui/core/';

// const useStyles = makeStyles(theme => ({
// }));

// const today = moment().format('dddd')
// const tomorrow = moment().add(1, 'days').format('dddd')
const tomorrowPlusPlus = moment()
  .add(2, 'days')
  .format('dddd');

export default function MainView({
  loaded,
  events,
  eventsToday,
  eventsTomorrow,
  eventsTomorrowPlusPlus,
  handleAddToCalClick
}) {
  // const classes = useStyles();
  // const noEventsFound = {
  //   img:
  //     'https://images-na.ssl-images-amazon.com/images/I/71zbVolPKJL._SX425_.jpg',
  //   url: '#',
  //   name: 'Sorry, no events found',
  //   time_start: '2019-08-11T02:00:00Z',
  //   venue: '',
  //   location: '',
  //   description:
  //     'Try adjusting your category preferences and/or unavailable times from the Settings page'
  // };

  return (
    <>
      {loaded ? (
        <div>
          <Container maxWidth="lg" align="center">
            <Typography
              variant="h3"
              color="textSecondary"
              style={{ marginTop: 125, marginBottom: 50 }}
            >
              Top Picks For You
            </Typography>
            <Grid container>
              <CardContainer
                event={eventsToday.length ? eventsToday[0] : ''}
                day={'Today'}
                animationTime={400}
                handleAddToCalClick={handleAddToCalClick}
              />
              <CardContainer
                event={eventsTomorrow.length ? eventsTomorrow[0] : ''}
                day={'Tomorrow'}
                animationTime={600}
                handleAddToCalClick={handleAddToCalClick}
              />
              <CardContainer
                event={
                  eventsTomorrowPlusPlus.length ? eventsTomorrowPlusPlus[0] : ''
                }
                day={tomorrowPlusPlus}
                animationTime={800}
                handleAddToCalClick={handleAddToCalClick}
              />
            </Grid>
          </Container>
        </div>
      ) : (
        <div
          style={{
            paddingTop: '20vh',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img src={spinner} alt="loading events..." />
        </div>
      )}
    </>
  );
}
