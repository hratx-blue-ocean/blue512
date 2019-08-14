import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container } from '@material-ui/core/';

export default function DetailedView({ events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus }) {
  return (
    <>
      <Grid container>
        <MicroCardContainer 
          events={events} 
          eventsToday={eventsToday} 
          eventsTomorrow={eventsTomorrow} 
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus} 
        />
        <Details 
          event={events[0]} 
          events={events} 
          eventsToday={eventsToday} 
          eventsTomorrow={eventsTomorrow} 
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
        />
      </Grid>
    </>
  );

}