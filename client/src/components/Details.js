import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Details({ event }) {
  const classes = useStyles()

  return (
    <Grid item xs={8}>
      <div>
        <Paper className={classes.root}>
          <Typography variant='h5' component='h3'>
            This is a sheet of paper.
        </Typography>
          <Typography component='p'>
            Paper can be used to build surface or other elements for your application.
        </Typography>
        </Paper>
      </div>
    </Grid>
  )

}