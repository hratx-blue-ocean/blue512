import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircle from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 300
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardMaker({ event }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  function addToCalendar(event) {
    console.log('Clicked on:', event)
    let eventStart = new Date(event.time_start);
    let eventEnd;
    if (event.time_end) {
      eventEnd = new Date(event_time.start);
    } else {
      eventEnd = new Date(eventStart)
      eventEnd.setHours(eventEnd.getHours() + 2);
    }
    const gCalEvent = {
      summary: event.name,
      start: {
        dateTime: eventStart
      },
      end: {
        dateTime: eventEnd
      }
    };
    console.log(gCalEvent)
    let request = window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: gCalEvent
    });
    request.execute(function (event) {
      console.log(event.htmlLink);
    });

  }

  let eventStart = Date(event.time_start).split("GMT")[0]

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {event.name.substring(0, 3)}
          </Avatar>
        }
        title={event.name}
        subheader={event.venue}
      />
      <CardMedia
        className={classes.media}
        image={event.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {eventStart}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to calendar"
          onClick={() => { addToCalendar(event) }}
        >
          <AddCircle />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>
            This should link to boilerplate message based on catagory
          </Typography>
          <Typography paragraph>
            This should link to event.description if it exists
          </Typography>
          <Button>Next Suggestion</Button>
          <Button>Add to Calendar</Button>
          <Button>Buy Tickets</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}
