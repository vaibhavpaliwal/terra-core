import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Avatar.scss';
import IconUser from '../../terra-icon/lib/icon/IconPerson';
import IconFacility from '../../terra-icon/lib/icon/IconHospital';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The text content that specifies the alternative text for the image.
   */
  alt: PropTypes.string,
  /**
   * The image to display.
   */
  image: PropTypes.string,
  /**
   * The initials to display.
   */
  initials: PropTypes.string,
  /**
   * The avatar variant.
   */
  variant: PropTypes.string.isRequired,
};

export const propsErrorMsg = 'Only one of the props: [image, initials] should be supplied.';

const Avatar = ({
  alt,
  image,
  initials,
  variant,
  ...customProps
  }) => {
  if (image && initials) {
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
    } else {
      avatarContent = variant === 'facility' ? <IconFacility /> : <IconUser />;
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
