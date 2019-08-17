import React from 'react';
import {
  Grid,
  Typography,
  Fab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';
import UnavailableTimeContainer from './UnavailableTimeContainer';
import Title from './Title.js';

export default class UnavailableTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      timeStart: moment().format('HH:mm:00'),
      timeEnd: moment().format('HH:mm:00'),
      eventName: '',
      daySelected: '',
      unavailableTimes: []
    };
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.handleDayOfWeekChange = this.handleDayOfWeekChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUnavailableTimes = this.getUnavailableTimes.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleTimeStartChange(_, value) {
    const timeStart = moment(value, 'HH:mm a').format('HH:mm:00');
    this.setState({ timeStart });
  }

  handleTimeEndChange(_, value) {
    const timeEnd = moment(value, 'HH:mm a').format('HH:mm:00');
    this.setState({ timeEnd });
  }

  handleDayOfWeekChange(e) {
    const daySelected = e.target.value;
    const date = moment()
      .isoWeekday(daySelected)
      .format('YYYY-MM-DD');
    this.setState({ date, daySelected });
  }

  handleSubmit() {
    axios
      .post(`/api/unavailable`, {
        token: this.props.userToken,
        name: this.state.eventName,
        time_start: moment(
          `${this.state.date} ${this.state.timeStart}`
        ).toISOString(),
        time_end: moment(
          `${this.state.date} ${this.state.timeEnd}`
        ).toISOString()
      })
      .then(_ => this.getUnavailableTimes())
      .catch();
  }

  handleDelete(item_id) {
    axios
      .delete(
        `/api/unavailable?token=${this.props.userToken}&item_id=${item_id}`
      )
      .then(_ => {
        this.setState(state => {
          return {
            unavailableTimes: state.unavailableTimes.filter(
              time => time.item_id !== item_id
            )
          };
        });
      })
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
          <Grid item xs={8}>
            <TextField
              id="standard-name"
              label="Event Name"
              defaultValue=""
              onChange={e => this.handleNameChange(e.target.value)}
              style={{ minWidth: 250 }}
            />
          </Grid>
          <Grid item xs={4}>
            <form autoComplete="off">
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel htmlFor="dayOfTheWeek">Days</InputLabel>
                <Select
                  onChange={e => this.handleDayOfWeekChange(e)}
                  inputProps={{
                    name: 'day',
                    id: 'dayOfTheWeek'
                  }}
                  value={this.state.daySelected}
                >
                  <MenuItem value={0}>Sundays</MenuItem>
                  <MenuItem value={1}>Mondays</MenuItem>
                  <MenuItem value={2}>Tuesdays</MenuItem>
                  <MenuItem value={3}>Wednesdays</MenuItem>
                  <MenuItem value={4}>Thursdays</MenuItem>
                  <MenuItem value={5}>Fridays</MenuItem>
                  <MenuItem value={6}>Saturdays</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
