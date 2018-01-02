import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import List from 'terra-list';
import Image from 'terra-image';

const propTypes = {
  isMountable: PropTypes.bool,
  isPersistent: PropTypes.bool,
  isRenderable: PropTypes.bool,
  numberOfImages: PropTypes.number,
  refCallback: PropTypes.func,
  title: PropTypes.string,
};

const defaultProps = {
  isMountable: true,
  isPersistent: false,
  isRenderable: true,
  numberOfImages: 0,
  title: '',
};

class Mock extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.isRenderable || this.props.isRenderable !== nextProps.isRenderable;
  }

  render() {
    const {
      isMountable,
      isPersistent,
      isRenderable,
      numberOfImages,
      refCallback,
      title,
      ...customProps
    } = this.props;

    if (!isRenderable) {
      return null;
    }

    const items = [];
    for (let i = 0; i < numberOfImages; i += 1) {
      items.push(
        <List.Item
          key={`${i}`}
          content={
            <Image style={{ width: '100%' }} src="http://nichegamer.com/wp-content/uploads/2015/09/Himouto-9-3-2015-1.jpg" />
          }
        />,
      );
    }

    return (
      <div {...customProps} ref={refCallback} key={title}>
        <div style={{ height: '40px', backgroundColor: 'lightGray', width: '100%' }}>
          {title}
        </div>
        <List isDivided>
          {items}
        </List>
      </div>
    );
  }
}

Mock.propTypes = propTypes;
Mock.defaultProps = defaultProps;

export default Mock;
