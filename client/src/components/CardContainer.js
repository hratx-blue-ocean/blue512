import React from 'react';
import CardMaker from './CardMaker.js';
import { Grid, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardColumn: {
    padding: 20
  }
}));

export default function CardContainer({ event, day, animationTime }) {
  const classes = useStyles();

  return (
    <>
      <Grid align="center" item xs={12} md={4} className={classes.cardColumn}>
        <Typography align="center">
          {day}
        </Typography>
        <CardMaker event={event} animationTime={animationTime} />
      </Grid>
    </>
  );
}