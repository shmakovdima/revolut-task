import React from 'react';
import { render, mount } from 'enzyme';
import { ExchangeItem } from '../ExchangeItemContainer';

const props = {
  currency: 'GBP',
  currencyAnother: 'USD',
  type: 'from',
  changeAmount: jest.fn(),
  changeCurrency: jest.fn(),
  amount: '242',
  disabled: false,
  balance: '34 345.5',
};

describe('Component [ExchangeItemContainer]', () => {
  test('Basic render', () => {
    const component = render(<ExchangeItem
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });

  test('Options lenght test (for 4 currency)', () => {
    const component = mount(<ExchangeItem
      {...props}
    />);
    expect(component).toMatchSnapshot();
    expect(component.find('Memo(ExchangeItemView)').prop('options').length).toEqual(2);
  });
});
