import React from 'react';
import InfiniteScroller from '../../src/InfiniteScroller';

describe('InfiniteScroller', () => {
  const defaultRender = <InfiniteScroller />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  // Prop Tests
  it('should use the default value when no value is given', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.find('.infinite-scroller').text()).toEqual('defualt');
  });

  // Structure Tests
  it('should have the class infinite-scroller', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper.prop('className')).toContain('infinite-scroller');
  });
});
