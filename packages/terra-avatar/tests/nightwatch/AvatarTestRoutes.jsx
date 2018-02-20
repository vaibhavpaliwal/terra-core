/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route } from 'react-router';
import AvatarTests from './AvatarTests';

// Test Cases
import DefaultAvatar from './DefaultAvatar';
import IconAvatar from './IconAvatar';
import ImageAvatar from './ImageAvatar';
import InitialsAvatar from './InitialsAvatar';

const routes = (
  <div>
    <Route path="/tests/avatar-tests" component={AvatarTests} />
    <Route path="/tests/avatar-tests/default" component={DefaultAvatar} />
    <Route path="/tests/avatar-tests/icon" component={IconAvatar} />
    <Route path="/tests/avatar-tests/image" component={ImageAvatar} />
    <Route path="/tests/avatar-tests/initials" component={InitialsAvatar} />
  </div>
);

export default routes;
