import React from 'react';
import Avatar from '../../src/Avatar';

describe('Avatar', () => {
  const defaultRender = <Avatar />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.avatar').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class avatar', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('avatar');
  });
});
