import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './Avatar.scss';

const cx = classNames.bind(styles);

const AvatarVariants = {
  FACILITY: 'facility',
  USER: 'user',
};

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
   * The avatar variant. One of `AvatarVariants.FACILITY`, `AvatarVariants.USER`.
   */
  variant: PropTypes.oneOf([AvatarVariants.FACILITY, AvatarVariants.USER]),
};

const defaultProps = {
  variant: AvatarVariants.USER,
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

  const icon = (
    <div className={cx('avatar-icon')}>
      <svg className={cx(variant)} />
    </div>
  );

  const AvatarContent = () => {
    let avatarContent = null;
    if (image) {
      avatarContent = <img src={image} alt={alt} className={AvatarChildClassNames} />;
    } else if (initials) {
      avatarContent = <text className={AvatarChildClassNames} >{initials.toUpperCase()}</text>;
    } else {
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
Avatar.defaultProps = defaultProps;

export default Avatar;
