import React from 'react';
import Preference from './Preference';
import { List } from '@material-ui/core/';
import Title from './Title.js';

export default function PreferencesContainer({
  categories,
  userPreferences,
  handleChange,
  userToken
}) {
  return (
    <>
      <Title>What are you into?</Title>
      <List>
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
