import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Fab } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(9, 7),
  },
  pad: {
    padding: "5px",
  }, 
  fab: {
    // margin: "10px",
    margin: theme.spacing(1),
  }
}));

export default function Details({ event }) {
  const classes = useStyles()
  return (
    <Grid item xs={8}>
      <div>
        <Paper className={classes.root}>
          <Typography variant='h4' component='h2' className={classes.pad}>
            {event[0].name}
          </Typography>

          <img src={event[0].img} style={{ width: '100%' }}/>

           <Typography variant='h5' component='h5' className={classes.pad}>
              {moment(event.time_start).format('ddd, MMM DD, h:mm a')}
              <Fab className={classes.fab} 
                color="secondary"
                aria-label="add"
                onClick={() => { addToCalendar(event) }}> 
                  add  
                  <CalendarIcon />
                </Fab>
              {/* <Button className={classes.pad}>Add to calendar</Button> */}
           </Typography>

           <Typography variant='h5' component='h5' className={classes.pad}>
             @ {event[0].venue} , {event[0].location}
           </Typography>

          <Typography variant='h6' component='h5' className={classes.pad}>
          <ShowMoreText
                lines={4}
                more='Show more'
                less='Show less'
                anchorClass=''
                expanded={false}
            >
                {event[0].description}
            </ShowMoreText>

           </Typography>

              <Button href={event[0].url}className={classes.pad}>Get more info</Button>

        </Paper>
      </div>
    </Grid>
  )

}
