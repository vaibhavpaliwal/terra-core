import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Input.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The defaultValue of the input field. Use this to create an uncontrolled input.
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Whether the input is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Whether the input is invalid
   */
  isInvalid: PropTypes.bool,
  /**
   * Name of the input.
   */
  name: PropTypes.string,
  /**
   * Function to trigger when user changes the input value. Provide a function to create a controlled input.
   */
  onChange: PropTypes.func,
  /**
   * Function to trigger when user puts focus on this input.
   */
  onFocus: PropTypes.func,
  /**
   * Whether the input is required.
   */
  required: PropTypes.bool,
  /**
   * The value of the input field. Use this to create a controlled input.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  defaultValue: undefined,
  disabled: false,
  isInvalid: false,
  name: null,
  required: false,
  value: undefined,
};

class Input extends React.Component {

  render() {
    const {
      defaultValue,
      isInvalid,
      name,
      onChange,
      onFocus,
      required,
      value,
      ...customProps
    } = this.props;

    const additionalInputProps = Object.assign({}, customProps);
    const inputClasses = cx([
      'input',
      { 'input-error': isInvalid },
      additionalInputProps.className,
    ]);

    if (required) {
      additionalInputProps['aria-required'] = 'true';
    }

    if (value !== undefined) {
      additionalInputProps.value = value;
    } else {
      additionalInputProps.defaultValue = defaultValue;
    }

    return (
      <input
        {...additionalInputProps}
        className={inputClasses}
        name={name}
        onChange={onChange}
        onFocus={this.onFocus}
        ref={(input) => { this.textInput = input; }}
        required={required}
      />
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
