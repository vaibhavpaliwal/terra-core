import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Avatar.scss';

const cx = classNames.bind(styles);

const propTypes = {
 /*
 * Content to be displayed as the name
 */
  name: PropTypes.string,
};

const defaultProps = {
  name: 'default',
};

const Avatar = ({ name, ...customProps }) => {
  const attributes = Object.assign({}, customProps);
  const AvatarClassNames = cx([
    'avatar',
    attributes.className,
  ]);

  return (<div {...attributes} className={AvatarClassNames} />);
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
