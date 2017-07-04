import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

const propTypes = {
  /**
   * Child content
   */
  children: PropTypes.node.isRequired,
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
    // Need to review setting vars intitially in ThemeAdapted and using them here
    // vs using them in the setState function used below
    const variables = this.props.variables;

    const cssFile = document.querySelector('link[href*=terra-core]');
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
          console.log(`Error: ${xhr.status}`);
        }
      }
    };
  }

  render() {
    const { children, variables, ...customProps } = this.props;
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
