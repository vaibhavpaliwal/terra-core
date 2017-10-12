import { open, push, pop, maximize, minimize, defaultState } from './disclosureReducerUtils';

import {
  OPEN,
  CLOSE,
  PUSH,
  POP,
  MAXIMIZE,
  MINIMIZE,
} from './actionTypes';

const supportedBehavior = {
  overlay: 'overlay',
  squish: 'squish',
};

const supportedPositions = {
  start: 'start',
  end: 'end',
};

const supportedSizes = {
  small: 'small',
  large: 'large',
};

const defaultSlidePanelState = Object.assign({}, defaultState, {
  panelBehavior: supportedBehavior.overlay,
  panelPosition: supportedPositions.end,
  panelSize: supportedSizes.small,
});

const slidePanelManagerReducers = (state = defaultSlidePanelState, action) => {
  switch (action.type) {
    case OPEN:
      return Object.assign({}, open(state, action), {
        panelBehavior: action.data.panelBehavior || supportedSizes.overlay,
        panelPosition: action.data.panelPosition || supportedSizes.end,
        panelSize: action.data.panelSize || supportedSizes.small,
      });
    case CLOSE:
      return defaultSlidePanelState;
    case PUSH:
      return push(state, action);
    case POP:
      return pop(state, action);
    case MAXIMIZE:
      return maximize(state, action);
    case MINIMIZE:
      return minimize(state, action);
    default:
      return state;
  }
};

export default slidePanelManagerReducers;
