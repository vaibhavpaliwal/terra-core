import React from 'react';
import PropTypes from 'prop-types';
import CSSVariableProvider from './CSSVariableProvider';
import CSSVariablePolyfillProvider from './CSSVariablePolyfillProvider';

const propTypes = {
  /**
   * Children content
   */
  children: PropTypes.node,
  /**
   * Used to set new theme variables
   */
  variables: PropTypes.object,
};

const defaultProps = {
  variables: {},
};

const ThemeAdapter = ({ variables, children, ...customProps }) => {
  function supportsCSSVars() {
    return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
  }

  if (supportsCSSVars()) {
    return <CSSVariableProvider {...customProps} variables={variables}>{children}</CSSVariableProvider>;
  }

  return <CSSVariablePolyfillProvider {...customProps} variables={variables}>{children}</CSSVariablePolyfillProvider>;
};

ThemeAdapter.propTypes = propTypes;
ThemeAdapter.defaultProps = defaultProps;

export default ThemeAdapter;
