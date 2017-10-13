import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import SlidePanelManager, { reducers as slidePanelManagerReducers } from '../../src/index';
import SlidePanelController from './SlidePanelController';

const store = createStore(combineReducers(slidePanelManagerReducers));

const SlidePanelManagerDemo = () => (
  <Provider store={store}>
    <SlidePanelManager>
      <SlidePanelController />
    </SlidePanelManager>
  </Provider>
);

export default SlidePanelManagerDemo;
