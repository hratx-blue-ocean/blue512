import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

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
          <Typography variant='h3' component='h2'>
            Today: (hardcoded) {event.name}
          </Typography>
          <img src={event.img} style={{ width: '100%' }}/>
          <Typography variant='h5' component='h5'>
            Description: (currently null for this event){event.description}
           </Typography>
           <Typography variant='h5' component='h5'>
              At: {event.time_start} to {event.time_end}
           </Typography>
           <Typography variant='h5' component='h5'>
             Venue: {event.venue} 
           </Typography>
           <Typography variant='h5' component='p'>
             <ButtonGroup>
              <Button>Add to calendar</Button>
              <Button>Get more info *url*</Button>
             </ButtonGroup>
           </Typography>
        </Paper>
      </div>
    </Grid>
  )

}
