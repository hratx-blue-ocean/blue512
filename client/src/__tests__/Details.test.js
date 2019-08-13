import { shallow } from 'enzyme';
import React from 'react';
import Details from '../components/Details';
import { Grid } from '@material-ui/core/';

describe('CardMaker component', () => {
  let wrapper;
  let event = {
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
    wrapper = shallow(<Details event={event} />);
  });

  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('it renders the correct child components', () => {
    expect(wrapper.find(Grid).length).toBeGreaterThan(0);
  });
});
