import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The component(s) that will be wrapped by <ThemeProvider />
   */
  children: PropTypes.node.isRequired,
  /**
   * Used to set new theme variables. e.g `{ '--terra-Badge-backgroundColor--default': '#bcbfc0' }`
   */
  theme: PropTypes.object,
};

const defaultProps = {
  theme: {},
};

class CSSVariableProvider extends React.Component {
  componentDidMount() {
    this.updateCSSVariables(this.props.theme);
  }

  componentDidUpdate() {
    this.updateCSSVariables(this.props.theme);
  }

  // eslint-disable-next-line class-methods-use-this
  updateCSSVariables(theme) {
    // Loops through theme object and writes values to style attribute on HTML element
    Object
      .entries(theme)
      .forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
  }

  render() {
    const { children, theme, ...customProps } = this.props;

    return (
      <div {...customProps}>
        {children}
      </div>
    );
  }
}

CSSVariableProvider.propTypes = propTypes;
CSSVariableProvider.defaultProps = defaultProps;

export default CSSVariableProvider;
