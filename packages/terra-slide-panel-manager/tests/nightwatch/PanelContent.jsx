import React from 'react';
import PropTypes from 'prop-types';
import AppDelegate from 'terra-app-delegate';

const propTypes = {
  app: AppDelegate.propType,
  someText: PropTypes.string,
};

const PanelContent = ({ app, someText }) => (
  <div style={{ backgroundColor: 'pink', height: '100%' }}>
    <h2>THIS IS SUPER NEAT.</h2>
    <p>{someText}</p>
    <button className="go-back" onClick={app.goBack}>Go Back</button>
    <button className="dismiss" onClick={app.dismiss}>Next</button>
    <button className="close-disclosure" onClick={app.closeDisclosure}>Close</button>
    <button className="maximize" onClick={app.maximize}>Maximize</button>
    <button className="minimize" onClick={app.minimize}>Minimize</button>
  </div>
);


PanelContent.propTypes = propTypes;

const disclosureName = 'PanelContentExample';
AppDelegate.registerComponentForDisclosure(disclosureName, PanelContent);

export { disclosureName };
export default PanelContent;
