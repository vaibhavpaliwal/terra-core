/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Link } from 'react-router';

const InputTests = () => (
  <div>
    <ul>
      <li><Link to="/tests/form-input-tests/default">Input - Default</Link></li>
      <li><Link to="/tests/form-input-tests/disabled">Input - Disabled</Link></li>
      <li><Link to="/tests/form-input-tests/populated">Input - Populated</Link></li>
    </ul>
  </div>
);

export default InputTests;
