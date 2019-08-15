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
import AddIcon from '@material-ui/icons/Add';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import { Grow, Fab } from '@material-ui/core/';
import moment from 'moment';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 360
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

export default function CardMaker({ event, animationTime, handleAddToCalClick }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Grow in={true} timeout={animationTime}>
      <Card className={classes.card}>

        {/* <CardHeader
        // Stuff above the image would go here
        /> */}
        <CardMedia
          className={classes.media}
          image={event.img}
        />

        <CardContent>
          <Typography variant="h6"  >
            <Link href={event.url} color="textPrimary">
              {event.name}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {moment(event.time_start).format('ddd, MMM DD, h:mm a')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {event.venue}, {event.location}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => { handleAddToCalClick(event) }}
          >
            {/* <AddIcon /> */}
            <CalendarIcon />
          </Fab>

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

        {/* Collapse Section */}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Description? {event.description}
            </Typography>
          </CardContent>
        </Collapse>

      </Card>
    </Grow>
  );
}
