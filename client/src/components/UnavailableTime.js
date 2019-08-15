import React from 'react';
import { Grid, Typography, Fab, TextField } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';

export default class UnavailableTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      timeStart: '',
      timeEnd: '',
      eventName: '',
      datepickerDate: new Date(),
      datepickerStart: new Date(),
      datepickerEnd: new Date(),
      unavailableTimes: {}
    };
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  handleSubmit() {
    axios.post(`/api/unavailable`, {
      token: this.props.userToken,
      name: this.state.eventName,
      time_start: `${this.state.date} ${this.state.timeStart}`,
      time_end: `${this.state.date} ${this.state.timeEnd}`
    });
  }

  handleNameChange(eventName) {
    this.setState({ eventName });
  }

  componentDidMount() {
    axios
      .get(`/api/unavailable?token=${this.props.userToken}`)
      .then(({ data }) => data.filter(time => time.recurring))
      .then(unavailableTimes => this.setState({ unavailableTimes }))
      .catch();
  }

  render() {
    return (
      <>
        <Typography variant="subtitle1" align="center">
          Tell us when you are unavailable. We assume these times are recurring.
          Please delete them below if they are no longer relevant!
        </Typography>
        <TextField
          id="standard-name"
          label="Event Name"
          onChange={e => this.handleNameChange(e.target.value)}
          style={{ marginLeft: 10 }}
        />
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
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => this.handleSubmit()} />
        </Fab>
        <UnavailableTimeWrapper times={this.state.unavailableTimes} />
      </>
    );
  }
}
