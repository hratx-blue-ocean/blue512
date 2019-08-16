import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Fab, Slide } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import ShowMoreText from 'react-show-more-text';
import { minWidth } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(9, 7),
    height: '90vh'
  },
  pad: {
    padding: "5px",
  },
  fab: {
    // margin: "10px",
    margin: theme.spacing(1),
  },
  media: {
    //display: 'flex',
    minHeight: '30vh',
    maxHeight: '50vh',
    objectFit: 'cover',
    maxWidth: '100%',

    // maxWidth: '70vw',
    //minWidth: '70%',

  },
}));

export default function Details({ event, handleCardActionClick }) {
  const classes = useStyles()

  return (
    <Slide in={true} timeout={400} direction="left">
      <Grid item xs={8} style={{ height: '90vh', display: 'inline-block' }}>
        <div>
          <Paper className={classes.root} style={{ maxHeight: '100vh', overflow: 'auto' }}>
            <Typography variant='h4' component='h2' className={classes.pad}>
              {event.name}
            </Typography>

            <img src={event.img} className={classes.media} />

            <Typography variant='h5' component='h5' className={classes.pad}>
              {moment(event.time_start).format('ddd, MMM DD, h:mm a')}
              <Fab className={classes.fab}
                color="secondary"
                aria-label="add"
                onClick={() => { handleCardActionClick(event, true) }}>
                add
                    <CalendarIcon />
              </Fab>
              {/* <Button className={classes.pad}>Add to calendar</Button> */}
            </Typography>

            <Typography variant='h5' component='h5' className={classes.pad}>
              @ {event.venue}  {event.location}
            </Typography>

            <Typography variant='h6' component='h5' className={classes.pad}>
              <ShowMoreText
                lines={4}
                more='Show more'
                less='Show less'
                anchorClass=''
                expanded={false}
              >
                {event.description}
              </ShowMoreText>

            </Typography>

            <Button href={event.url} variant='outlined' className={classes.pad} target="_blank">Visit partner site</Button>

          </Paper>
        </div>
      </Grid>
    </Slide>
  )

}
