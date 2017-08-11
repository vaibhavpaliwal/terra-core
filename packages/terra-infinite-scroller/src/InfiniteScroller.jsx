import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import styles from './InfiniteScroller.scss';

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

const InfiniteScroller = ({ name, ...customProps }) => {
  // TODO: If no more class names are added, move this to be inline for naming div.
  const InfiniteScrollerClassNames = cx([
    'infinite-scroller',
  ]);

  return (<div {...customProps} className={InfiniteScrollerClassNames} />);
};

InfiniteScroller.propTypes = propTypes;
InfiniteScroller.defaultProps = defaultProps;

export default InfiniteScroller;
