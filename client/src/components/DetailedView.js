import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container, Paper } from '@material-ui/core/';

export default function DetailedView({ clickedMicroCard, events, eventsToday, eventsTomorrow, eventsTomorrowPlusPlus, selectedDaysEvents, handleMicroCardClick, changeDetailsDay, openModal, closeModal, handleCardActionClick }) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>

          <Grid item xs={12} sm={12} md={5}>
            <Paper style={{
              padding: 20,
              margin: 10,
              marginTop: 20,
            }}>
              <MicroCardContainer
                events={events}
                eventsToday={eventsToday}
                eventsTomorrow={eventsTomorrow}
                selectedDaysEvents={selectedDaysEvents}
                changeDetailsDay={changeDetailsDay}
                handleMicroCardClick={handleMicroCardClick}
                eventsTomorrowPlusPlus={eventsTomorrowPlusPlus}
              />

            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={7} style={{ height: 900 }} >
            <Paper style={{
              padding: 20,
              margin: 10,
              marginTop: 20,
              display: 'flex',
              overflow: 'auto',
              flexDirection: 'column',
            }}>
              <Details
                event={clickedMicroCard}
                openModal={openModal}
                closeModal={closeModal}
                handleCardActionClick={handleCardActionClick}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}