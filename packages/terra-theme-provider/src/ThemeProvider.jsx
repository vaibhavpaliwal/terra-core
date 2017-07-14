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
   * Callback function that should return an array of strings to
   * themable stylesheet urls. e.g. `['https://cerner.com/styles-1032.css', 'https://cerner.com/styles-7A85.css']`
   */
  getThemeableCSS: PropTypes.func.isRequired,
  /**
   * Used to set new theme variables. e.g `{ '--terra-Badge-backgroundColor--default': '#bcbfc0' }`
   */
  theme: PropTypes.object,
};

const defaultProps = {
  theme: {},
};

const ThemeProvider = ({ theme, children, getThemeableCSS, ...customProps }) => {
  function supportsCSSVars() {
    return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
  }

  if (supportsCSSVars()) {
    return <CSSVariableProvider {...customProps} theme={theme}>{children}</CSSVariableProvider>;
  }

  return <CSSVariablePolyfillProvider {...customProps} theme={theme} getThemeableCSS={getThemeableCSS}>{children}</CSSVariablePolyfillProvider>;
};

ThemeProvider.propTypes = propTypes;
ThemeProvider.defaultProps = defaultProps;

export default ThemeProvider;
