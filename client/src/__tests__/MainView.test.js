import { shallow } from 'enzyme';
import React from 'react';
import MainView from '../components/MainView';

describe('Main View component', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<MainView events={['foo', 'bar', 'baz']} />);
  });

  test('it renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});
