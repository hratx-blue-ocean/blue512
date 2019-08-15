import React from 'react';
import { Grid, Typography } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';

export default class UnavailableTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      timeStart: '',
      timeEnd: '',
      datepickerDate: new Date(),
      datepickerStart: new Date(),
      datepickerEnd: new Date(),
      recurring: false
    };
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  // // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  handleDateChange(_, value) {
    const date = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD');
    this.setState({ date, datepickerDate: value });
  }

  handleTimeStartChange(_, value) {
    const timeStart = moment(value, 'HH:mm a').format('HH:mm:00');
    this.setState({ timeStart, datepickerStart: _ });
  }

  handleTimeEndChange(_, value) {
    const timeEnd = moment(value, 'HH:mm a').format('HH:mm:00');
    this.setState({ timeEnd, datepickerEnd: _ });
  }

  render() {
    return (
      <>
        <Typography variant="subtitle1" align="center">
          Tell us when you are unavailable. We assume these times are recurring
          - delete them below if they are no longer relevant.
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              value={this.state.datepickerDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time Start"
              value={this.state.datepickerStart}
              onChange={this.handleTimeStartChange}
              minutesStep={5}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time End"
              value={this.state.datepickerEnd}
              onChange={this.handleTimeEndChange}
              minutesStep={5}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </>
    );
  }
}
