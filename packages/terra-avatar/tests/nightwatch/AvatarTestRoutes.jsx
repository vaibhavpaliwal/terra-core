/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route } from 'react-router';
import AvatarTests from './AvatarTests';

// Test Cases
import DefaultAvatar from './DefaultAvatar';

const routes = (
  <div>
    <Route path="/tests/avatar-tests" component={AvatarTests} />
    <Route path="/tests/avatar-tests/default" component={DefaultAvatar} />
  </div>
);

export default routes;
