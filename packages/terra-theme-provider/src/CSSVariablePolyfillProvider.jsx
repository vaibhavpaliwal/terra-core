import React from 'react';
import PropTypes from 'prop-types';

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

class CSSVariablePolyfillProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      css: '',
    };
  }

  componentDidMount() {
    this.setTheme(this.props.theme);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme === this.props.theme) {
      return;
    }
    this.setTheme(this.props.theme);
  }

  setTheme() {
    let styleSheets;
    if (this.props.getThemeableCSS && Array.isArray(this.props.getThemeableCSS())) {
      styleSheets = this.props.getThemeableCSS();
    } else {
      // eslint-disable-next-line
      console.warn('Unable to locate valid CSS file(s)');
    }

    /**
     * Matches all instances of var(*), which is the syntax for CSS Variables
     * e.g. "color: var(--text-color);" matches "var(--text-color)"
     */
    const regEx = /var\(([^)]+)\)/g;

    /**
     * Replaces var(*) isntances with static values
     */
    const generateCSS = (cssText, cssVars) => cssText.replace(regEx, (match, variable) => {
      // Given '--prop' is the variable, set customProp to '--prop'
      let customProp = variable;
      // If CSS custom prop fallback syntax is used e.g. var(--prop, fallback-value);
      // Strip --prop off of string to set that to customProp
      if (variable.indexOf(',') >= 0) {
        customProp = variable.split(', ')[0];
      }
      return cssVars[customProp] || match;
    });

    /**
     * Store this context for later use in AJAX calls
     */
    const that = this;

    /**
     * The following makes AJAX request for all files within the themeable CSS Array
     * passed in via getThemeableCSS prop.
     * These responses are then contatenated and rendered inside a <style> block on the
     * last loop through the for loop.
     */
    const xhr = [];
    let successfulRequests = 0;
    let responseString = '';

    function setStyles(j) {
      xhr[j] = new XMLHttpRequest();
      const url = styleSheets[j];
      xhr[j].open('GET', url, true);
      xhr[j].onreadystatechange = () => {
        if (xhr[j].readyState === 4 && xhr[j].status === 200) {
          // track successful requests here
          successfulRequests += 1;
          responseString += xhr[j].responseText;

          if (successfulRequests === styleSheets.length) {
            // console.log(responseString);
            that.setState((prevState, props) => ({
              /* Replace CSS custom properties with static values and save to state */
              css: generateCSS(responseString, props.theme),
            }));
          }
        }
      };
      xhr[j].send();
    }

    for (let i = 0; i < styleSheets.length; i += 1) {
      setStyles(i);
    }
  }

  render() {
    const { children, theme, getThemeableCSS, ...customProps } = this.props;
    const { css } = this.state;
    return (
      <div {...customProps}>
        {/* Write contents of themeable CSS file with replaced CSS custom props in style block */}
        <style>
          {css}
        </style>
        {children}
      </div>
    );
  }
}

CSSVariablePolyfillProvider.propTypes = propTypes;

export default CSSVariablePolyfillProvider;
