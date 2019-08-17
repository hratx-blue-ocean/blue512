import React from 'react';
import MicroCardMaker from './MicroCardMaker.js'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, Fade } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    // maxWidth: ,
    backgroundColor: theme.palette.background.paper,
  },
  Tab: {
    flexGrow: 1,
    width: '100%'
  },
  ListPaper: {
    maxHeight: '89vh',
    overflow: 'auto'
  }
}));

const overmorrow = moment().add(2, 'days').format('dddd')

export default function MicroCardContainer({
  eventsToday,
  eventsTomorrow,
  eventsTomorrowPlusPlus,
  selectedDaysEvents,
  handleMicroCardClick,
  changeDetailsDay }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  let animationTimeout = 0;
  const animationTimeouts = [];

  for (let event = 0; event < selectedDaysEvents.length; event++) {
    animationTimeout += 300;
    animationTimeouts.push(animationTimeout);
  }

  return (
    <>
      <div style={{ height: 900 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          onClick={() => (changeDetailsDay(event))}
          indicatorColor='primary'
          textColor='primary'
          variant='standard'
          centered

        >
          <Tab label='Today' />
          <Tab label='Tomorrow' />
          <Tab label={overmorrow} />
        </Tabs>
        <Divider />



        {/* <Paper className={classes.root}> */}
        <Fade in={true} timeout={1000}>
          <List className={classes.root} style={{ maxHeight: '100%', overflow: 'scroll' }}>

            {selectedDaysEvents.map((event, index) => <MicroCardMaker key={event.experience_api_id} event={event} animationTimeout={animationTimeouts[index]} handleMicroCardClick={handleMicroCardClick} />)}
          </List>
        </Fade>
        {/* </Paper> */}
      </div>
    </>
  );
}