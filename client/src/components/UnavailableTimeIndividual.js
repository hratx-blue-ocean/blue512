import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import moment from 'moment';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

export default function UnavailableTimeIndividual({ time, handleDelete }) {
  const dayOfTheWeek = moment(time.time_start).format('dddd');
  const timeStart = moment(time.time_start).format('hh:mm a');
  const timeEnd = moment(time.time_end).format('hh:mm a');
  return (
    <ListItem>
      <ListItemText
        primary={time.name}
        secondary={`${dayOfTheWeek}s: ${timeStart} - ${timeEnd}`}
      ></ListItemText>
      <DeleteRoundedIcon onClick={() => handleDelete(time.item_id)} />
    </ListItem>
  );
}
