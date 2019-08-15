import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container } from '@material-ui/core/';

export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, handleMicroCardClick}) {
  return (
    <>
      <Grid container>
        <MicroCardContainer 
          events={events} 
          eventsToday={eventsToday} 
          eventsTomorrow={eventsTomorrow} 
          handleMicroCardClick={handleMicroCardClick}
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus} 
        />
        <Details 
          event={clickedMicroCard} 
          events={events} 
          eventsToday={eventsToday} 
          eventsTomorrow={eventsTomorrow} 
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
        />
      </Grid>
    </>
  );

}