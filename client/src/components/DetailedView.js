import React               from 'react';
import MicroCardContainer  from './MicroCardContainer.js'
import MicroCardMaker      from './MicroCardMaker.js'
import Details             from './Details.js'
import { makeStyles }      from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';

export default function DetailedView({ events }) {

  return (
    <>
      <Container maxWidth="lg">

        <Grid container>

          <MicroCardContainer events={events}/>

          <Grid item xs={9}>
              <Details />
          </Grid>

        </Grid>

      </Container>
    </>
  );

}