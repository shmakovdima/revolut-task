import React from 'react';
import { render, mount } from 'enzyme';
import EchangeItemView from '../ExchangeItemView';

const props = {
  onInput: jest.fn(),
  type: 'from',
  amount: '242',
  currency: 'EUR',
  balance: '34 345.5',
  changeCurrency: jest.fn(),
  options: [
    {
      value: 'RUB',
      label: 'RUB',
    },
    {
      value: 'GBP',
      label: 'GBP',
    },
    {
      value: 'USD',
      label: 'USD',
    }],
  disabled: false,
};

describe('Component [EchangeItemView]', () => {
  test('Basic render', () => {
    const component = render(<EchangeItemView
      {...props}
    />);
    expect(component).toMatchSnapshot();
  });

  test('Type from', () => {
    const component = mount(<EchangeItemView
      {...props}
    />);
    expect(component).toMatchSnapshot();
    expect(component.find('NumberFormat').find('input').prop('value')).toEqual('– 242');
  });

  test('Type from disabled', () => {
    const component = mount(<EchangeItemView
      {...props}
      disabled
    />);
    expect(component).toMatchSnapshot();
    expect(component.find('span[children="exceeds balance"]')).toHaveLength(1);
  });

  test('Type to', () => {
    const component = mount(<EchangeItemView
      {...props}
      type="to"
    />);
    expect(component).toMatchSnapshot();
    expect(component.find('NumberFormat').find('input').prop('value')).toEqual('+ 242');
  });

  test('Type to disabled', () => {
    const component = mount(<EchangeItemView
      {...props}
      type="to"
      disabled
    />);
    expect(component).toMatchSnapshot();
    expect(component.find('span[children="exceeds balance"]')).toHaveLength(0);
  });

  test('DropDown onChange', () => {
    const changeCurrency = jest.fn();
    const component = mount(<EchangeItemView
      {...props}
      changeCurrency={changeCurrency}
    />);
    component.find('Select').props().onChange({ name: 'select', value: 'GBP' });
    expect(changeCurrency).toHaveBeenCalled();
  });

  test('Input onChange', () => {
    const onInput = jest.fn();
    const component = mount(<EchangeItemView
      {...props}
      onInput={onInput}
    />);
    component.find('NumberFormat').props().onInput({ target: { value: '- 343' } });
    expect(onInput).toHaveBeenCalled();
  });
});
