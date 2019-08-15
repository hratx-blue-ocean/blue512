import React from 'react';
import CardContainer from './CardContainer.js';
import moment from 'moment';
import spinner from '../../public/spinner.gif';
// import fetch from 'node-fetch';


// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';

// const useStyles = makeStyles(theme => ({
// }));


// const today = moment().format('dddd')
// const tomorrow = moment().add(1, 'days').format('dddd')
const tomorrowPlusPlus = moment().add(2, 'days').format('dddd')


export default function MainView({ loaded, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, handleAddToCalClick }) {
  // const classes = useStyles();

  return (
    <>

      {loaded ?
        <Container maxWidth="lg">
          <Grid container>
            <CardContainer
              event={events[0]}
              day={'Today'}
              animationTime={400}
              handleAddToCalClick={handleAddToCalClick} />
            <CardContainer
              event={events[1]}
              day={'Tomorrow'}
              animationTime={600}
              handleAddToCalClick={handleAddToCalClick} />
            <CardContainer
              event={events[2]}
              day={tomorrowPlusPlus}
              animationTime={800}
              handleAddToCalClick={handleAddToCalClick} />
          </Grid>
        </Container>

        :
        <div style={{ paddingTop: '20vh', display: 'flex', justifyContent: 'center' }}>
          <img src={spinner} alt="loading events..." />
        </div>
      }
    </>
  );
}
