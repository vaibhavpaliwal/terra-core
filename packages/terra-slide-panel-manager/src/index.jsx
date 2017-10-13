import { connect } from 'react-redux';

import SlidePanelManager from './SlidePanelManager';
import slidePanelManagerReducers from './reducers';
import { open, close, push, pop, maximize, minimize } from './actions';

const mapStateToProps = state => (
  (disclosureState => ({
    panelComponentData: disclosureState.componentKeys.map(key => (disclosureState.components[key])),
    panelSize: disclosureState.panelSize,
    isOpen: disclosureState.isOpen,
    isFullscreen: disclosureState.isFullscreen,
  }))(state.slidePanelManager)
);

const mapDispatchToProps = dispatch => ({
  openPanel: (data) => { dispatch(open(data)); },
  closePanel: (data) => { dispatch(close(data)); },
  pushPanel: (data) => { dispatch(push(data)); },
  popPanel: (data) => { dispatch(pop(data)); },
  maximizePanel: (data) => { dispatch(maximize(data)); },
  minimizePanel: (data) => { dispatch(minimize(data)); },
});

const reducers = {
  slidePanelManager: slidePanelManagerReducers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SlidePanelManager);
export { reducers };
