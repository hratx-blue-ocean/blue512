import React from 'react';
import CardContainer from './CardContainer.js';
// import fetch from 'node-fetch';


// import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';

// const useStyles = makeStyles(theme => ({
// }));

export default function MainView({ events }) {
  // const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <CardContainer event={events[0]} day={'placeholder day 1'}/>
          <CardContainer event={events[1]} day={'placeholder day 2'}/>
          <CardContainer event={events[2]} day={'placeholder day 3'}/>
        </Grid>
      </Container>
    </>
  );
}
