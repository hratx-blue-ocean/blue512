import { shallow } from 'enzyme';
import React from 'react';
import UnavailableTimeContainer from '../components/UnavailableTimeContainer';
import UnavailableTimeIndividual from '../components/UnavailableTimeIndividual';
import { List } from '@material-ui/core/';

const handleDelete = jest.fn();

describe('Settings View component', () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(
      <UnavailableTimeContainer
        times={[{ foo: 'bar', id: 1 }, { baz: 'bo', id: 2 }]}
        handleDelete={handleDelete}
      />
    );
  });
  test('it renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('it renders the corect child components', () => {
    expect(wrapper.find(UnavailableTimeIndividual).length).toBe(2);
    expect(wrapper.find(List).length).toBe(1);
  });
});
