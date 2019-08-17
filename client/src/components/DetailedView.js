import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container } from '@material-ui/core/';

export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, selectedDaysEvents, handleMicroCardClick, changeDetailsDay, openModal, closeModal, handleCardActionClick }) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
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
              openModal={openModal}
              closeModal={closeModal}
              handleCardActionClick={handleCardActionClick}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}