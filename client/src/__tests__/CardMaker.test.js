import { shallow } from 'enzyme';
import React from 'react';
import CardMaker from '../components/CardMaker';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core/';

describe('CardMaker component', () => {
  let wrapper;
  let data = {
    source_API: 'TicketMaster',
    name: 'Hayes Carll',
    url:
      'http://www.ticketsnow.com/InventoryBrowse/TicketList.aspx?PID=2718472',
    event_id: 'Z7r9jZ1Aejbow',
    time_start: '2019-08-11T02:00:00Z',
    time_end: null,
    category: 'Music',
    image:
      'https://s1.ticketm.net/dam/a/fc1/e7affb5a-4ba1-4e6f-8aad-29c79f4a6fc1_68981_RECOMENDATION_16_9.jpg',
    venue: 'Gruene Hall',
    location: 'New Braunfels',
    price_min: null,
    price_max: null,
    description: null
  };

  beforeAll(() => {
    wrapper = shallow(<CardMaker event={data} />);
  });

  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders the correct child components', () => {
    expect(wrapper.find(Card).length).toBe(1); // exactly 1 card
    expect(wrapper.find(CardHeader).length).toBe(1);
    expect(wrapper.find(CardContent).length).toBeGreaterThan(0);
    expect(wrapper.find(Typography).length).toBeGreaterThan(0);
  });
});
