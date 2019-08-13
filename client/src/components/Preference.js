import React from 'react';
import {
  ListItem,
  ListItemText,
  Slider,
  Typography,
  ListItemSecondaryAction
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    padding: 40
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const valueLabelFormat = value =>
  marks.findIndex(mark => mark.value === value) + 1;

const marks = [
  {
    value: 0,
    label: 'Not Interested'
  },
  {
    value: 50,
    label: 'No Preference'
  },
  {
    value: 100,
    label: 'Interested'
  }
];

export default function PreferencesContainer({ cat, userPreference }) {
  const classes = useStyles();
  const preferred = userPreference.length ? userPreference[0] : 'No Preference';
  const defaultPreferredSliderValue =
    preferred === true ? 100 : preferred === false ? 0 : 50;
  return (
    <>
      <ListItem>
        <ListItemText
          primary={`${cat} + ${preferred} + ${defaultPreferredSliderValue}`}
        />
        <ListItemSecondaryAction>
          <div className={classes.root}>
            <Slider
              valueLabelFormat={valueLabelFormat}
              aria-labelledby="discrete-slider-restrict"
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              defaultValue={defaultPreferredSliderValue}
              onChangeCommitted={(event, value) => console.log(value)}
            />
          </div>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}
