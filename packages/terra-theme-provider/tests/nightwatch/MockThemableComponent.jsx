import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './themable-styles.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * Child node. Component to display next to the status indicator.
   */
  children: PropTypes.node.isRequired,
};

const MockThemableComponent = ({ children, ...customProps }) => (
  <div {...customProps} className={cx('mock-themable-component', customProps.className)} >
    {children}
  </div>
);

MockThemableComponent.propTypes = propTypes;

export default MockThemableComponent;
