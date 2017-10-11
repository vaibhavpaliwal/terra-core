import React from 'react';
import SlidePanelManager from '../../src/SlidePanelManager';

describe('SlidePanelManager', () => {
  const defaultRender = <SlidePanelManager />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.slide-panel-manager').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class slide-panel-manager', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('slide-panel-manager');
  });
});
