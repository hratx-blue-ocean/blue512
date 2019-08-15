import React from 'react';
import { List } from '@material-ui/core';
import UnavailableTimeIndividual from './UnavailableTimeIndividual';

export default function UnavailableTimeContainer({ times, handleDelete }) {
  console.log(times);
  return (
    <List>
      {times.map(time => (
        <UnavailableTimeIndividual time={time} handleDelete={handleDelete} />
      ))}
    </List>
  );
}
