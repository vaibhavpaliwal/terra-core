import React from 'react';
import Menu from '../../../lib/Menu';

const MenuItemSubMenu = () => (
  <div style={{ padding: '10px' }}>
    <ul style={{ height: '34px', width: '240px' }}>
      <Menu.Item
        className="TestSubMenuItem"
        text="MenuItem - Submenu"
        subMenuItems={[
          <Menu.Item text="Not Visible" />,
        ]}
      />
    </ul>
  </div>
);

export default MenuItemSubMenu;
