import React from 'react';
import ThemeProvider from '../../src/ThemeProvider';

describe('ThemeProvider', () => {
  const defaultRender = <ThemeProvider />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.terra-ThemeProvider').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class terra-ThemeProvider', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('terra-ThemeProvider');
  });
});
