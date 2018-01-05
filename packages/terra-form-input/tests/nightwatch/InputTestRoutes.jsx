/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import InputTests from './InputTests';

import DefaultInput from './DefaultInput';
import PopulatedInput from './PopulatedInput';
import DisabledInput from './DisabledInput';

const routes = (
  <div>
    <Route path="/tests/form-input-tests" component={InputTests} />
    <Route path="/tests/form-input-tests/default" component={DefaultInput} />
    <Route path="/tests/form-input-tests/disabled" component={DisabledInput} />
    <Route path="/tests/form-input-tests/populated" component={PopulatedInput} />
  </div>
);

export default routes;
