import { shallow } from 'enzyme';
import React from 'react';
import UnavailableTimeIndividual from '../components/UnavailableTimeIndividual';
import { ListItem, ListItemText } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

describe('UnavailableTimeIndividual component', () => {
  const handleDelete = jest.fn();
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <UnavailableTimeIndividual
        time={{
          time_start: '2019-08-28T01:55:00.000Z',
          time_end: '2019-08-28T01:55:00.000Z',
          name: 'test',
          item_id: 1
        }}
        handleDelete={handleDelete}
      />
    );
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders the corect child components', () => {
    expect(wrapper.find(ListItemText).length).toBe(1);
    expect(wrapper.find(ListItem).length).toBe(1);
    expect(wrapper.find(DeleteRoundedIcon).length).toBe(1);
  });
});
