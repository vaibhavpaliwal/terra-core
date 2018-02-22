import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Avatar.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The text content that specifies the alternative text for the image.
   */
  alt: PropTypes.string,
  /**
   * The icon to display.
   */
  icon: PropTypes.element,
  /**
   * The image to display.
   */
  image: PropTypes.string,
  /**
   * The initials to display.
   */
  initials: PropTypes.string,
};

export const propsErrorMsg = 'Only one of the props: [icon, image, initials] should be supplied.';

const Avatar = ({
  alt,
  icon,
  image,
  initials,
  ...customProps
  }) => {
  if ((icon && image) || (icon && initials) || (image && initials)) {
    throw new Error(propsErrorMsg);
  }

  const attributes = Object.assign({}, customProps);

  const AvatarClassNames = cx([
    'avatar',
    attributes.className,
  ]);

  const AvatarChildClassNames = cx([
    'avatar-child',
    attributes.className,
  ]);

  const AvatarContent = () => {
    let avatarContent = null;
    if (image) {
      avatarContent = <img src={image} alt={alt} className={AvatarChildClassNames} />;
    } else if (initials) {
      avatarContent = <text className={AvatarChildClassNames} >{initials.toUpperCase()}</text>;
    } else if (icon) {
      avatarContent = icon;
    }
    return (
      <circle aria-label="Avatar" {...attributes} className={AvatarClassNames} >
        {avatarContent}
      </circle>
    );
  };

  return <AvatarContent />;
};

Avatar.propTypes = propTypes;

export default Avatar;
