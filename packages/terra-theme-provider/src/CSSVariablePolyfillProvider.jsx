import React from 'react';
import PropTypes from 'prop-types';

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
    this.themeDidChange(this.props.theme);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme === this.props.theme) {
      return;
    }
    this.themeDidChange(this.props.theme);
  }

  themeDidChange() {
    /*
     * Matches all instances of var(*), which is the syntax for CSS Variables
     * e.g. "color: var(--text-color);" matches "var(--text-color)"
     */
    const regEx = /var\(([^)]+)\)/g;
    /**
     * Replaces var(*) isntances with static values
     */
    const generateCSS = (cssText, cssVars) => cssText.replace(regEx, (match, variable) => cssVars[variable] || match);
    const xhr = new XMLHttpRequest();

    let cssFile;
    if (this.props.getThemeableCSS) {
      cssFile = this.props.getThemeableCSS();
      if (!cssFile.href) {
        // eslint-disable-next-line
        console.warn('Unable to locate valid CSS file');
      }
    }

    /* AJAX request to get themeable CSS file */
    xhr.open('GET', cssFile.href);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState((prevState, props) => ({
            /* Replace CSS custom properties with static values and save to state */
            css: generateCSS(xhr.responseText, props.theme),
          }));
        } else {
          // eslint-disable-next-line
          console.warn(`Error: ${xhr.status}`);
        }
      }
    };
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
