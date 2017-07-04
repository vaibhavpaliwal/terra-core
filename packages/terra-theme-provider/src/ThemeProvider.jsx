import React from 'react';
import PropTypes from 'prop-types';
import CSSVariableProvider from './CSSVariableProvider';
import CSSVariablePolyfillProvider from './CSSVariablePolyfillProvider';

const propTypes = {
  /**
   * The component(s) that will be wrapped by <ThemeProvider />
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback function used to return stylesheet link element to themable css. e.g. `<link href="style.css" rel="stylesheet">`
   */
  getThemeableCSS: PropTypes.func.isRequired,
  /**
   * Used to set new theme variables. e.g `{ '--terra-Badge-backgroundColor--default': '#bcbfc0' }`
   */
  variables: PropTypes.object,
};

const defaultProps = {
  variables: {},
};

const ThemeProvider = ({ variables, children, getThemeableCSS, ...customProps }) => {
  function supportsCSSVars() {
    return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
  }

  if (supportsCSSVars()) {
    return <CSSVariableProvider {...customProps} variables={variables}>{children}</CSSVariableProvider>;
  }

  return <CSSVariablePolyfillProvider {...customProps} variables={variables} getThemeableCSS={getThemeableCSS}>{children}</CSSVariablePolyfillProvider>;
};

ThemeProvider.propTypes = propTypes;
ThemeProvider.defaultProps = defaultProps;

export default ThemeProvider;
