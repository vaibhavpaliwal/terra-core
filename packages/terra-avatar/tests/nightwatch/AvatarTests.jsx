/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';

const AvatarTests = () => (
  <div>
    <ul>
      <li><Link to="/tests/avatar-tests/default">Avatar - Default</Link></li>
      <li><Link to="/tests/avatar-tests/icon">Avatar - Icon</Link></li>
      <li><Link to="/tests/avatar-tests/image">Avatar - Image</Link></li>
      <li><Link to="/tests/avatar-tests/initials">Avatar - Initials</Link></li>
    </ul>
  </div>
);

export default AvatarTests;
