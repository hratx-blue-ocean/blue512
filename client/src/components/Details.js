<<<<<<< HEAD
import React               from 'react';
// import { makeStyles }      from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
=======
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
>>>>>>> boilerplate for details in detailView

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Details({ event }) {
  const classes = useStyles()

  return (
    <Grid item xs={9}>
      <div>
<<<<<<< HEAD
        Details of clicked MicroCard with a nice prop {event.name}
=======
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {event.name}
        </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
        </Typography>
        </Paper>
>>>>>>> boilerplate for details in detailView
      </div>
    </Grid>
  )

}