import React from 'react';
import PropTypes from 'prop-types';
import CSSVariableProvider from './CSSVariableProvider';
import CSSVariablePolyfillProvider from './CSSVariablePolyfillProvider';

const propTypes = {
  /**
   * Children content
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback function used to return stylesheet link element to themable css. e.g. `<link href="style.css" rel="stylesheet">`
   */
  getThemeableCSS: PropTypes.func.isRequired,
  /**
   * Used to set new theme variables
   */
  variables: PropTypes.object,
};

const defaultProps = {
  variables: {},
};

const ThemeAdapter = ({ variables, children, getThemeableCSS, ...customProps }) => {
  function supportsCSSVars() {
    return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
  }

  if (supportsCSSVars()) {
    return <CSSVariableProvider {...customProps} variables={variables}>{children}</CSSVariableProvider>;
  }

  return <CSSVariablePolyfillProvider {...customProps} variables={variables} getThemeableCSS={getThemeableCSS}>{children}</CSSVariablePolyfillProvider>;
};

ThemeAdapter.propTypes = propTypes;
ThemeAdapter.defaultProps = defaultProps;

export default ThemeAdapter;
