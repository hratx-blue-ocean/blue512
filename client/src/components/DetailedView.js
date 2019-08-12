import React               from 'react';
import MicroCardMaker      from './MicroCardMaker.js'
import Details             from './Details.js'
import { makeStyles }      from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    direction: 'column',
  },
  cardColumn: {
    padding: 20
  }
}));

export default function DetailedView({ events }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">

      <Grid container xs={12}>

        <Grid item xs={3}>
          <Grid item xs={12} className={classes.cardColumn}>
            <MicroCardMaker event={events[0]}/>
          </Grid>
          <Grid item xs={12} className={classes.cardColumn}>
            <MicroCardMaker event={events[0]}/>
          </Grid>
          <Grid item xs={12} className={classes.cardColumn}>
            <MicroCardMaker event={events[0]}/>
          </Grid>
        </Grid>

        <Grid item xs={9}>
          <Grid item>
            <Details />
          </Grid>
        </Grid>

      </Grid>

      </Container>
    </>
  );

}