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
import UnavailableTimeContainer from './UnavailableTimeContainer';
import Title from './Title.js';

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
      unavailableTimes: []
    };
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUnavailableTimes = this.getUnavailableTimes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    axios
      .post(`/api/unavailable`, {
        token: this.props.userToken,
        name: this.state.eventName,
        time_start: `${this.state.date} ${this.state.timeStart}`,
        time_end: `${this.state.date} ${this.state.timeEnd}`
      })
      .then(_ => this.getUnavailableTimes())
      .catch();
  }

  handleDelete(item_id) {
    axios
      .delete(
        `/api/unavailable?token=${this.props.userToken}&item_id=${item_id}`
      )
      .then(_ => this.getUnavailableTimes())
      .catch();
  }

  handleNameChange(eventName) {
    this.setState({ eventName });
  }

  getUnavailableTimes() {
    axios
      .get(`/api/unavailable?token=${this.props.userToken}`)
      .then(({ data }) => data.filter(time => time.recurring))
      .then(unavailableTimes => this.setState({ unavailableTimes }))
      .catch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userToken !== prevProps.userToken) {
      this.getUnavailableTimes();
    }
  }

  componentDidMount() {
    this.getUnavailableTimes();
  }

  render() {
    return (
      <>
        <Title>When are you busy?</Title>
        <Typography variant="subtitle2" color="textSecondary">
          Tell us when you are unavailable. We assume these times are recurring.
          Please delete them below if they are no longer relevant!
        </Typography>

        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="standard-name"
              label="Event Name"
              onChange={e => this.handleNameChange(e.target.value)}
              fullWidth={true}
            />
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
        </Grid>

        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => this.handleSubmit()} />
        </Fab>
        <UnavailableTimeContainer
          times={this.state.unavailableTimes}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}
