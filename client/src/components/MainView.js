import React, { Component } from 'react';
import CardMaker from './CardMaker.js';
import CardContainer from './CardContainer.js';
// import fetch from 'node-fetch';


import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Container, Typography } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function MainView({ events }) {
  const classes = useStyles();

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
