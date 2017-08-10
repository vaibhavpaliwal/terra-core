/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import InfiniteScrollerTests from './InfiniteScrollerTests';

// Test Cases
import DefaultInfiniteScroller from './DefaultInfiniteScroller';

const routes = (
  <div>
    <Route path="/tests/infinite-scroller-tests" component={InfiniteScrollerTests} />
    <Route path="/tests/infinite-scroller-tests/default" component={DefaultInfiniteScroller} />
  </div>
);

export default routes;
