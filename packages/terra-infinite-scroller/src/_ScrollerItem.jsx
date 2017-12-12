import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './ScrollerItem.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The content element to be placed inside the list item for display.
   */
  children: PropTypes.node,
  /**
   * Whether or not the list item should have selection styles applied.
   */
  refCallback: PropTypes.func,
};

const defaultProps = {
  children: [],
};

const ScrollerItem = ({
    children,
    refCallback,
    ...customProps
  }) => {
  const scrollerItemClassNames = cx([
    'scroller-item',
    customProps.className,
  ]);

  return (
    <div {...customProps} className={scrollerItemClassNames} ref={refCallback}>
      {children}
    </div>
  );
};

ScrollerItem.propTypes = propTypes;
ScrollerItem.defaultProps = defaultProps;

export default ScrollerItem;
