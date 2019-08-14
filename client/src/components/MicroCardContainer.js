import React from 'react';
import MicroCardMaker from './MicroCardMaker.js'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cardColumn: {
    padding: 10
  }
}));




export default function MicroCardContainer({ events }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  console.log(events[0])
  return (

    // Build mini navbar onto container

    <Grid item xs={4}>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
      <Grid item xs={12} className={classes.cardColumn}>
        <MicroCardMaker event={events[0]} />
      </Grid>
    </Grid>
  );

}