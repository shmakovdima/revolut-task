import React from 'react';
import { shallow } from 'enzyme';
import { IndexPage } from '../IndexPageContainer';

const props = {
  disabled: false,
  startExchange: jest.fn(),
  loadCurrency: jest.fn(),
};

describe('Component [IndexPage]', () => {
  test('Basic render', () => {
    const component = shallow(<IndexPage
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });
});
