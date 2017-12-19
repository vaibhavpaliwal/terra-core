import React from 'react';
import PropTypes from 'prop-types';
import 'terra-base/lib/baseStyles';
import Textarea from 'terra-form-textarea';

const propTypes = {
  isMountable: PropTypes.bool,
  isPersistent: PropTypes.bool,
  isRenderable: PropTypes.bool,
  refCallback: PropTypes.func,
  title: PropTypes.string,
};

const defaultProps = {
  isMountable: true,
  isPersistent: false,
  isRenderable: false,
  title: '',
};

class Mock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      area1: 'I automatically resize as you type in more information (Except in Mobile)',
    };
    this.handleArea1Change = this.handleArea1Change.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isRenderable || this.props.isRenderable !== nextProps.isRenderable;
  }

  handleArea1Change(event) {
    this.setState({ area1: event.currentTarget.value });
  }

  render() {
    const {
      isMountable,
      isPersistent,
      isRenderable,
      refCallback,
      title,
      ...customProps
    } = this.props;

    if (!isRenderable) {
      return null;
    }

    return (
      <div {...customProps} ref={refCallback} key={title}>
        <div style={{ height: '40px', backgroundColor: 'lightGray', width: '100%' }}>
          {title}
        </div>
        <form>
          <Textarea name="details" size="full" value={this.state.area1} required onChange={this.handleArea1Change} />
        </form>
      </div>
    );
  }
}

Mock.propTypes = propTypes;
Mock.defaultProps = defaultProps;

export default Mock;
