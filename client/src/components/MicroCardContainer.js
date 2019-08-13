import React from 'react';
import MicroCardMaker from './MicroCardMaker.js'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    direction: 'column',
  },
  cardColumn: {
    padding: 10
  }
}));

export default function MicroCardContainer({ events }) {
  const classes = useStyles();
  return (

    // Build mini navbar onto container

    <Grid item xs={3}>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
    </Grid>
  );

}