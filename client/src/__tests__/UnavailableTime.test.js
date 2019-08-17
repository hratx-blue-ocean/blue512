import { shallow } from 'enzyme';
import React from 'react';
import UnavailableTime from '../components/UnavailableTime';
import { Grid, Typography, Fab, TextField } from '@material-ui/core/';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import UnavailableTimeContainer from '../components/UnavailableTimeContainer';

describe('UnavailableTime component', () => {
  let wrapper;
  // const getUnavailableTimes = jest.fn();
  beforeAll(() => {
    wrapper = shallow(<UnavailableTime userToken="foo" />, {
      lifecycleExperimental: true
    });
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders the corect child components', () => {
    expect(wrapper.find(UnavailableTimeContainer).length).toBe(1);
    expect(wrapper.find(Grid).length).toBeGreaterThan(0);
    expect(wrapper.find(Typography).length).toBeGreaterThan(0);
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(Fab).length).toBe(1);
    expect(wrapper.find(KeyboardDatePicker).length).toBe(1); // only 1 DatePicker
    expect(wrapper.find(KeyboardTimePicker).length).toBe(2); // 2 TimePickers should render
  });
  // test('it calls getUnavailableTimes when props change', () => {
  //   wrapper.getUnavailableTimes = jest.fn();
  //   wrapper.setProps({ userToken: 'bar' });
  //   expect(wrapper.instance().getUnavailableTimes).toBeCalled();
  // });
});
