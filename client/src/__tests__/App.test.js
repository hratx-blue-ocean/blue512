import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';
import NavBar from '../components/Navbar';
import MainView from '../components/MainView';

describe('Top level App component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders a single NavBar child', () => {
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });
  test('it renders a single MainView child when / route is hit', () => {
    let mountedWrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(mountedWrapper.find(MainView)).toHaveLength(1);
  });
  test('it has the correct state shape', () => {
    expect(wrapper.state().eventsAll).toBeInstanceOf(Object);
  });
});
