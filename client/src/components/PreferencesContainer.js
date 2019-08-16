import React from 'react';
import Preference from './Preference';
import { List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title.js';

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '55vh',
    overflow: 'auto'
  }
}))

export default function PreferencesContainer({
  categories,
  userPreferences,
  handleChange,
  userToken
}) {
  const classes = useStyles();

  return (
    <>
      <Title>What are you into?</Title>
      <List className={classes.root}>
        {categories
          .filter(cat => cat !== 'undefined')
          .map((cat, ind) => (
            <Preference
              key={ind}
              cat={cat}
              handleChange={handleChange}
              userToken={userToken}
              userPreference={
                userPreferences
                  ? userPreferences.find(pref => pref['name'] === cat)
                  : ''
              }
            />
          ))}
      </List>
    </>
  );
}
