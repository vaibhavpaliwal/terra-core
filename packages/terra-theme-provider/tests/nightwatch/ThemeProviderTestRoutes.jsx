/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ThemeProviderTests from './ThemeProviderTests';

// Test Cases
import DefaultThemeProvider from './DefaultThemeProvider';

const routes = (
  <div>
    <Route path="/tests/theme-provider-tests" component={ThemeProviderTests} />
    <Route path="/tests/theme-provider-tests/default" component={DefaultThemeProvider} />
  </div>
);

export default routes;
