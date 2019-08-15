import React from 'react';
import Preference from './Preference';
import { List } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '30%'
//   }
// }));

export default function PreferencesContainer({
  categories,
  userPreferences,
  handleChange,
  userToken
}) {
  // const classes = useStyles();
  return (
    <>
      <List>
        {categories
          .filter(cat => cat !== 'undefined')
          .map(cat => (
            <Preference
              cat={cat}
              handleChange={handleChange}
              userToken={userToken}
              userPreference={userPreferences.find(
                pref => pref['name'] === cat
              )}
            />
          ))}
      </List>
    </>
  );
}
