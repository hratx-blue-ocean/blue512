import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Grow } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
  card: {
    maxWidth: '100%',
    minWidth: '100%',
  },
  media: {
    height: '130px',
  },
  content: {
    height: '50px',
  },
  listitem: {
    square: true,
  }
});

export default function MicroCardMaker({ event, handleMicroCardClick , animationTimeout}) {
  const classes = useStyles();
  const eventStart = Date(event.time_start)


  return (
    <ListItem className={classes.listitem} alignItems='flex-start' onClick={() => (handleMicroCardClick(event))}>
      <Grow in={true} timeout={animationTimeout}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={event.img || 'Event Image'}
              title={event.name || 'Hello, there!'}
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant='h5' component='h4'>
                {
                  event.name.length < 45 ?
                    event.name :
                    ((event.name).substring(0, 45) + '...')
                }
              </Typography>
              {/* <Typography variant='body2' color='textSecondary' component='p'>
                Starting at {eventStart.split('GMT')[0].split(' ')[4].split(':').slice(0, 2).join(':') || 'starting time'}
              </Typography> */}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grow>
    </ListItem>
  )
}
