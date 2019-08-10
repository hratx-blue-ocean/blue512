import React, { Component } from 'react';
import CardMaker from './CardMaker.js';
// import fetch from 'node-fetch';


import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';

import { Paper, Grid, Container } from '@material-ui/core/';

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

export default function CardContainer() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={4} className={classes.cardColumn}>
            <CardMaker/>
          </Grid>
          <Grid item xs={4} className={classes.cardColumn}>
            <CardMaker/>
          </Grid>
          <Grid item xs={4} className={classes.cardColumn}>
            <CardMaker/>
          </Grid>
        </Grid>
      </Container>
    </>
  );

  // function FormRow() {
  //   return (
  //     <>
  //       <Container maxWidth="lg">
  //         <Grid container>
  //           <Grid item xs={4} className={classes.cardColumn}>
  //             <CardMaker/>
  //           </Grid>
  //           <Grid item xs={4} className={classes.cardColumn}>
  //             <CardMaker/>
  //           </Grid>
  //           <Grid item xs={4} className={classes.cardColumn}>
  //             <CardMaker/>
  //           </Grid>
  //         </Grid>
  //       </Container>
  //     </>
  //   );
  // }

  // return (
  //   <div className={classes.root}>
  //     <Grid container spacing={1}>
  //       <Grid container item xs={12} spacing={3}>
  //         <FormRow />
  //       </Grid>
  //       <Grid container item xs={12} spacing={3}>
  //         <FormRow />
  //       </Grid>
  //       <Grid container item xs={12} spacing={3}>
  //         <FormRow />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
}
