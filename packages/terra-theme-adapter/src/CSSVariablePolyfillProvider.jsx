import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * Child content
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

class CSSVariablePolyfillProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      css: '',
    };
  }

  componentDidMount() {
    this.variablesDidChange(this.props.variables);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.variables === this.props.variables) {
      return;
    }
    this.variablesDidChange(this.props.variables);
  }

  variablesDidChange() {
    let cssFile;
    if (this.props.getThemeableCSS) {
      cssFile = this.props.getThemeableCSS();
      if (!cssFile.href) {
        // eslint-disable-next-line
        console.warn('Unable to locate valid CSS file');
      }
    }

    const regEx = /var\(([^)]+)\)/g;
    const generateCSS = (cssText, cssVars) => cssText.replace(regEx, (match, variable) => cssVars[variable] || match);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', cssFile.href);
    xhr.send(null);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState((prevState, props) => ({
            css: generateCSS(xhr.responseText, props.variables),
          }));
        } else {
          // eslint-disable-next-line
          console.warn(`Error: ${xhr.status}`);
        }
      }
    };
  }

  render() {
    const { children, variables, getThemeableCSS, ...customProps } = this.props;
    const { css } = this.state;
    return (
      <div {...customProps}>
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
