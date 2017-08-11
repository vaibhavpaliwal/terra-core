/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import DateTimePickerTests from './DateTimePickerTests';

// Test Cases
import DefaultDateTimePicker from './DefaultDateTimePicker';

const routes = (
  <div>
    <Route path="/tests/date-time-picker-tests" component={DateTimePickerTests} />
    <Route path="/tests/date-time-picker-tests/default" component={DefaultDateTimePicker} />
  </div>
);

export default routes;
