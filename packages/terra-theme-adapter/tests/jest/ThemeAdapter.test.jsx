import React from 'react';
import ThemeAdapter from '../../src/ThemeAdapter';

describe('ThemeAdapter', () => {
  const defaultRender = <ThemeAdapter />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.terra-ThemeAdapter').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class terra-ThemeAdapter', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('terra-ThemeAdapter');
  });
});
