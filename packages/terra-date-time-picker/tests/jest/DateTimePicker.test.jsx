import React from 'react';
import DateTimePicker from '../../src/DateTimePicker';

describe('DateTimePicker', () => {
  const defaultRender = <DateTimePicker />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.terra-DateTimePicker').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class terra-DateTimePicker', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('terra-DateTimePicker');
  });
});
