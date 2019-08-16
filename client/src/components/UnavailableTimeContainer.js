import React from 'react';
import { List } from '@material-ui/core';
import UnavailableTimeIndividual from './UnavailableTimeIndividual';

export default function UnavailableTimeContainer({ times, handleDelete }) {
  return (
    <List>
      {times.map(time => (
        <UnavailableTimeIndividual
          key={time.id}
          time={time}
          handleDelete={handleDelete}
        />
      ))}
    </List>
  );
}
