import React from 'react';
import { render } from 'enzyme';
import { InfoBlock } from '../InfoBlockContainer';

const props = {
  currencyFrom: 'GBP',
  currencyTo: 'USD',
  costOne: '34.4554',
  isFetching: false,
  isError: false,
  swapCurrency: jest.fn(),
};

describe('Component [InfoBlock]', () => {
  test('Basic render', () => {
    const component = render(<InfoBlock
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });
});
