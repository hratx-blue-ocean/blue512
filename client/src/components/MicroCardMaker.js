import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 120,
  },
  content: {
    height: 40,
  }
});

export default function MicroCardMaker({ event }) {
  const classes = useStyles();
  const eventStart = Date(event.time_start)

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={event.img || 'Event Image'}
          title={event.event_id || 'Event Title'}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Starting at {eventStart.split("GMT")[0].split(" ")[4].split(":").slice(0, 2).join(":") || 'starting time'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )

}
