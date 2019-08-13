import React from 'react';
import MicroCardContainer from './MicroCardContainer.js'
import Details from './Details.js'
import { Grid, Container } from '@material-ui/core/';

export default function DetailedView({ events }) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <MicroCardContainer events={events} />
          <Details event={events[0]} />
        </Grid>
      </Container>
    </>
  );

}