import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container } from '@material-ui/core/';

<<<<<<< HEAD
export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, selectedDaysEvents, handleMicroCardClick, changeDetailsDay, openModal, closeModal }) {
=======
export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, selectedDaysEvents, handleMicroCardClick, changeDetailsDay, handleCardActionClick }) {
>>>>>>> development
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
<<<<<<< HEAD
          events={events}
          eventsToday={eventsToday}
          eventsTomorrow={eventsTomorrow}
          eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
          openModal={openModal}
          closeModal={closeModal}
=======
          handleCardActionClick={handleCardActionClick}
>>>>>>> development
        />
      </Grid>
    </>
  );
}