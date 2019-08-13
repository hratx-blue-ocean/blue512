import React               from 'react';
// import { makeStyles }      from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';

// const useStyles = makeStyles({
// });

export default function Details( {event} ) {

  return (
    <Grid item xs={9}>
      <div>
        Details of clicked MicroCard
      </div>
    </Grid>
  )

}