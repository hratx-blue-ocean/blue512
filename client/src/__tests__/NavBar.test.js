import { shallow } from 'enzyme';
import React from 'react';
import NavBar from '../components/Navbar';
import {
  AppBar,
  Toolbar,
  Typography,
  // InputBase,
  Button
} from '@material-ui/core';

describe('Nav Bar component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<NavBar />);
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders the corect child components', () => {
    expect(wrapper.find(AppBar).length).toBeGreaterThan(0);
    expect(wrapper.find(Button).length).toBeGreaterThan(0);
    // expect(wrapper.find(InputBase).length).toBeGreaterThan(0);
    expect(wrapper.find(Toolbar).length).toBeGreaterThan(0);
    expect(wrapper.find(Typography).length).toBeGreaterThan(0);
  });
});
