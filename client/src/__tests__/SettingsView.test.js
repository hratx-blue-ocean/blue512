import { shallow } from 'enzyme';
import React from 'react';
import SettingsView from '../components/SettingsView';
import PreferencesContainer from '../components/PreferencesContainer';
import { Grid, Avatar, Typography } from '@material-ui/core/';

describe('Settings View component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<SettingsView user={{ avatar_url: 'foo' }} />);
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders the corect child components', () => {
    expect(wrapper.find(PreferencesContainer).length).toBe(1);
    expect(wrapper.find(Grid).length).toBeGreaterThan(0);
    expect(wrapper.find(Typography).length).toBeGreaterThan(0);
    expect(wrapper.find(Avatar).length).toBe(1);
  });
});
