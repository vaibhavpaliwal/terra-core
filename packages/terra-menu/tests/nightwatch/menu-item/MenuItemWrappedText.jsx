import React from 'react';
import Menu from '../../../lib/Menu';

const WrappedTextMenuItem = () => (
  <div style={{ padding: '10px' }}>
    <ul style={{ height: '34px', width: '240px' }}>
      <Menu.Item text="This menu item has a really long text that should wrap." className="testWrappedItem" />
    </ul>
  </div>
);

export default WrappedTextMenuItem;
