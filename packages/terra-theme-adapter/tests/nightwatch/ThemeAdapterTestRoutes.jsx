/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ThemeAdapterTests from './ThemeAdapterTests';

// Test Cases
import DefaultThemeAdapter from './DefaultThemeAdapter';

const routes = (
  <div>
    <Route path="/tests/theme-adapter-tests" component={ThemeAdapterTests} />
    <Route path="/tests/theme-adapter-tests/default" component={DefaultThemeAdapter} />
  </div>
);

export default routes;
