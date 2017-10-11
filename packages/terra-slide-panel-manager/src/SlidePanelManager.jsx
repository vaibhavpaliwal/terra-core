import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './SlidePanelManager.scss';

const cx = classNames.bind(styles);

const propTypes = {
 /*
 * Content to be displayed as the name
 */
  name: PropTypes.string,
};

const defaultProps = {
  name: 'default',
};

const SlidePanelManager = ({ name, ...customProps }) => {
  const attributes = Object.assign({}, customProps);
  const SlidePanelManagerClassNames = cx([
    'slide-panel-manager',
    attributes.className,
  ]);

  return (<div {...attributes} className={SlidePanelManagerClassNames} />)
};

SlidePanelManager.propTypes = propTypes;
SlidePanelManager.defaultProps = defaultProps;

export default SlidePanelManager;
