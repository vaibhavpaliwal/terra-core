/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';

const AvatarTests = () => (
  <div>
    <ul>
      <li><Link to="/tests/avatar-tests/user">Avatar - User</Link></li>
      <li><Link to="/tests/avatar-tests/facility">Avatar - Facility</Link></li>
      <li><Link to="/tests/avatar-tests/image">Avatar - Image</Link></li>
      <li><Link to="/tests/avatar-tests/initials">Avatar - Initials</Link></li>
    </ul>
  </div>
);

export default AvatarTests;
