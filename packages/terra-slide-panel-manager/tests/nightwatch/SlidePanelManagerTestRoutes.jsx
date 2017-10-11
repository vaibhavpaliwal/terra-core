/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import SlidePanelManagerTests from './SlidePanelManagerTests';

// Test Cases
import DefaultSlidePanelManager from './DefaultSlidePanelManager';

const routes = (
  <div>
    <Route path="/tests/slide-panel-manager-tests" component={SlidePanelManagerTests} />
    <Route path="/tests/slide-panel-manager-tests/default" component={DefaultSlidePanelManager} />
  </div>
);

export default routes;
