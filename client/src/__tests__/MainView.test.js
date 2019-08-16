import { shallow } from 'enzyme';
import React from 'react';
import MainView from '../components/MainView';
import CardContainer from '../components/CardContainer';
import { Grid, Container } from '@material-ui/core/';

const getProps = () => ({
  loaded: true
});

describe('Main View component', () => {
  let wrapper;
  const { loaded } = getProps();

  beforeAll(() => {
    wrapper = shallow(
      <MainView
        loaded={loaded}
        eventsToday={['foo', 'bar', 'baz']}
        eventsTomorrow={['foo', 'bar', 'baz']}
        eventsTomorrowPlusPlus={['foo', 'bar', 'baz']}
      />
    );
  });

  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders the correct child components when loaded', () => {
    expect(wrapper.find(CardContainer).length).toBe(3); // exactly 3 cards in MainView
    expect(wrapper.find(Grid).length).toBeGreaterThan(0);
    expect(wrapper.find(Container).length).toBeGreaterThan(0);
  });
});
