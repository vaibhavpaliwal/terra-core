import React from 'react';
import InfiniteScroller from 'terra-infinite-scroller';

const scrollerExample = () => {
  const items = [];
  for (let i = 0; i < 25000; i += 1) {
    const item = (
      <InfiniteScroller.Item key={`${i}`}>
        <div style={{ height: '40px', width: '100%', position: 'relative', backgroundColor: 'red' }} />
        <div style={{ height: '40px', width: '100%', position: 'relative', backgroundColor: 'blue' }} />
        <div style={{ height: '40px', width: '100%', position: 'relative', backgroundColor: 'green' }} />
      </InfiniteScroller.Item>
    );
    items.push(item);
  }

  return (
    <div style={{ height: '600px', width: '100%', position: 'relative' }}>
      <InfiniteScroller>
        {items}
      </InfiniteScroller>
    </div>
  );
};
export default scrollerExample;
