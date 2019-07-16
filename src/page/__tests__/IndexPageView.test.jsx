import React from 'react';
import { shallow } from 'enzyme';
import IndexPageView from '../IndexPageView';

const props = {
  disabled: false,
  startExchange: jest.fn(),
};

describe('Component [IndexPageView]', () => {
  test('Basic render', () => {
    const component = shallow(<IndexPageView
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });
});
