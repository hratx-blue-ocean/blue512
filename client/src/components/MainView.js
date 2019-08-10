import React, { Component } from 'react';
import CardMaker from './CardMaker.js';
// import fetch from 'node-fetch';


import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';

import { Paper, Grid, Container, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardColumn: {
    padding: 20
  }
}));

export default function MainView({ events }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={4} className={classes.cardColumn}>
            <CardMaker event={events[0]}/>
          </Grid>
          <Grid item xs={12} md={4} className={classes.cardColumn}>
            <CardMaker event={events[1]}/>
          </Grid>
          <Grid item xs={12} md={4} className={classes.cardColumn}>
            <CardMaker event={events[2]}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
