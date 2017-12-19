import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Image from 'terra-image';

const propTypes = {
  isMountable: PropTypes.bool,
  isPersistent: PropTypes.bool,
  isRenderable: PropTypes.bool,
  refCallback: PropTypes.func,
  title: PropTypes.string,
};

const defaultProps = {
  isMountable: false,
  isPersistent: true,
  isRenderable: false,
  title: '',
};

class Mock extends React.Component {
  render() {
    const {
      isMountable,
      isPersistent,
      isRenderable,
      refCallback,
      title,
      ...customProps
    } = this.props;

    return (
      <div {...customProps} ref={refCallback} key={title}>
        <div style={{ height: '40px', backgroundColor: 'lightGray', width: '100%' }}>
          {title}
        </div>
        <Image style={{ width: '100%' }} src="http://nichegamer.com/wp-content/uploads/2015/09/Himouto-9-3-2015-1.jpg" />
      </div>
    );
  }
}

Mock.propTypes = propTypes;
Mock.defaultProps = defaultProps;

export default Mock;
