import React from 'react';
import { render, shallow, mount } from 'enzyme';

import Button from '.';

describe('Component [Button]', () => {
  test('Basic render', () => {
    const component = render(<Button>Test</Button>);
    expect(component).toMatchSnapshot();
  });

  test('Disabled prop', () => {
    const component = render(<Button disabled>Test</Button>);
    expect(component).toMatchSnapshot();
  });

  test('ClassName prop', () => {
    const className = 'test-class';
    const component = mount(<Button className={className}>ClassName</Button>);
    expect(component.hasClass(className)).toEqual(true);
    expect(component).toMatchSnapshot();
  });

  test('handleClick', () => {
    const handleClick = jest.fn();
    const component = shallow(<Button onClick={handleClick}>Test</Button>);
    component.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });

  test('handleClick disabled', () => {
    const handleClick = jest.fn();
    const component = shallow(
      <Button disabled onClick={handleClick}>
        Test
      </Button>,
    );
    component.simulate('click');
    expect(handleClick).not.toHaveBeenCalled();
  });
});
