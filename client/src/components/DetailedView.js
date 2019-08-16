import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid } from '@material-ui/core/';


export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, selectedDaysEvents, handleMicroCardClick, changeDetailsDay, handleCardActionClick }) {
  return (
    <>
      <Grid container>
        <MicroCardContainer
          events={events}
          eventsToday={eventsToday}
          eventsTomorrow={eventsTomorrow}
          selectedDaysEvents={selectedDaysEvents}
          changeDetailsDay={changeDetailsDay}
          handleMicroCardClick={handleMicroCardClick}
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
        />
        <Details
          event={clickedMicroCard}
          handleCardActionClick={handleCardActionClick}
        />
      </Grid>
    </>
  );
}