import React from 'react';
import { render, mount } from 'enzyme';
import InfoBlockView from '../InfoBlockView';

const props = {
  currencyFrom: 'GBP',
  currencyTo: 'USD',
  costOne: '34.4554',
  isFetching: false,
  isError: false,
  swapCurrency: jest.fn(),
  setHovered: jest.fn(),
  hovered: false,
};

describe('Component [InfoBlockView]', () => {
  test('Basic render', () => {
    const component = render(<InfoBlockView
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });

  test('Swap Button click', () => {
    const swapCurrency = jest.fn();
    const component = mount(<InfoBlockView
      {...props}
      swapCurrency={swapCurrency}
    />);
    component.find('button').simulate('click');
    expect(swapCurrency).toHaveBeenCalled();
  });

  test('isError', () => {
    const component = mount(<InfoBlockView
      {...props}
      isError
    />);
    expect(component.find('span[children="Error!!!"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  test('isFetching', () => {
    const component = mount(<InfoBlockView
      {...props}
      isFetching
    />);

    expect(component.find('svg[data-icon="sync"]')).toHaveLength(1);
    expect(component).toMatchSnapshot(); 
  });

  test('isFetching and isError', () => {
    const component = mount(<InfoBlockView
      {...props}
      isFetching
      isError
    />);

    expect(component.find('span[children="Error!!!"]')).toHaveLength(1);
    expect(component.find('svg[data-icon="sync"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
