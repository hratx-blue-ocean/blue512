import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Fab, Modal, Hidden, Slide, Snackbar, SnackbarContent, Fade } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import CloseIcon from '@material-ui/icons/Close';
import ShowMoreText from 'react-show-more-text';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 5),
    height: '93vh'
  },
  pad: {
    padding: "11px",
  },
  fab: {
    margin: theme.spacing(1),
  },
  media: {
    minHeight: '30vh',
    maxHeight: '50vh',
    objectFit: 'cover',
    maxWidth: '100%',
    margin: 'auto'
  },
}));

export default function Details({ event, openModal, closeModal, handleCardActionClick, isSignedIn }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function renderSnackBar() {
    setOpen(true);
  }

  function closeSnackBar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (<>
    <Hidden only="xs">
      <Slide in={true} timeout={400} direction="left">

        <Grid item sm={8} xs={false} style={{ height: '90vh' }} >
          <div>

            <Paper className={classes.root} style={{ maxHeight: '100vh', overflow: 'auto' }} >

              <Grid container justify="center">

                <Grid item xs={12} align="center">
                  <Typography variant='h4' component='h2' className={classes.pad}>
                    {event.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} align="center">
                  <img src={event.img} className={classes.media} />
                </Grid>


              </Grid>

              <Typography variant='h5' component='h5' className={classes.pad}>
                {moment(event.time_start).format('ddd, MMM DD, h:mm a')}
                <Fab className={classes.fab}
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    handleCardActionClick(event, true);
                    renderSnackBar();
                  }}>
                  <CalendarIcon />
                </Fab>
              </Typography>

              <Typography variant='h5' component='h5' className={classes.pad} >
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
    </Hidden>

    <Hidden smUp={true}>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        open={openModal}
        onClose={closeModal}
      >
        <div>

          <Grid item sm={8} xs={false} style={{ height: '90vh' }} >
            <div>
              <Paper className={classes.pad} style={{ maxHeight: '100vh', overflow: 'auto' }} >
                <Typography variant='h6' component='h6' className={classes.pad}>
                  {event.name}
                </Typography>

                <img src={event.img} className={classes.media} />

                <Typography variant='subtitle1' className={classes.pad}>
                  {moment(event.time_start).format('ddd, MMM DD, h:mm a')}

                  <Fab className={classes.fab}
                    color="primary"
                    aria-label="add"
                    onClick={() => { addToCalendar(event) }}>
                    <CalendarIcon />
                  </Fab>

                  <Fab
                    color="secondary"
                    aria-label="add"
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </Fab>
                </Typography>

                <Typography variant='h6' component='h6' className={classes.pad} >
                  @ {event.venue}  {event.location}
                </Typography>

                <Typography variant='subtitle2' className={classes.pad}>
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

        </div>
      </Modal>
    </Hidden>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={open}
      autoHideDuration={4000}
      onClose={closeSnackBar}
      color="primary"
    >
      {isSignedIn ?
        <SnackbarContent
          onClose={closeSnackBar}
          variant="success"
          message="Event successfully added to your Google calendar!"
        /> :
        <SnackbarContent
          onClose={closeSnackBar}
          variant="success"
          message="Error: Please sign in to add events to your Google calendar"
        />
      }
    </Snackbar>
  </>
  )

}
