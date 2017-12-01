import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import LoadingOverlay from 'terra-overlay/lib/LoadingOverlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import ScrollerItem from './ScrollerItem';
import styles from './InfiniteScroller.scss';

const cx = classNames.bind(styles);

const propTypes = {
  /**
   * The ScrollerItem children to be placed within the infinite scroller..
   */
  children: PropTypes.node.isRequired,
  /**
   * Determines whether or not the loading indicator is visible and if callbacks are triggered.
   */
  isFinishedLoading: PropTypes.bool,
  /**
   * Callback trigger when new scroller items are requested..
   */
  onRequestItems: PropTypes.func,
};

const defaultProps = {
  children: [],
  isFinishedLoading: false,
};

class InfiniteScroller extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.debounce(this.update.bind(this), 250);
    this.updateHeight = this.updateHeight.bind(this);
    this.enableEscListener = this.enableEscListener.bind(this);
    this.disableEscListener = this.disableEscListener.bind(this);
    this.getVisibleChildren = this.getVisibleChildren.bind(this);

    // make common
    this.itemsByKey = {};
    this.itemsByIndex = [];
    React.Children.forEach(props.children, (child, index) => {
      this.itemsByKey[child.key] = { index, height: child.props.height || 0, top: 0 };
      this.itemsByIndex.push({ key: child.key, height: child.props.height || 0, top: 0 });
    });

    this.state = { hiddenTopItems: [], hiddenBottomItems: [] };
  }

  componentDidMount() {
    if (!this.state.isFinishedLoading) {
      if (!this.listenersAdded) {
        this.enableListeners();
      }
      this.update();
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isEnabled: newProps.isEnabled && newProps.isOpen });
  }

  componentDidUpdate() {
    // make common
    this.itemsByKey = {};
    this.itemsByIndex = [];
    React.Children.forEach(props.children, (child, index) => {
      this.itemsByKey[child.key] = { index, height: child.props.height || 0, top: 0 };
      this.itemsByIndex.push({ key: child.key, height: child.props.height || 0, top: 0 });
    });

    if (!this.state.isFinishedLoading) {
      if (!this.listenersAdded) {
        this.enableListeners();
      }
      this.update();
    } else {
      this.disableListeners();
    }
  }

  componentWillUnmount() {
    this.disableListeners();
  }

  setContentNode(node) {
    this.contentNode = node;
  }

  getVisibleChildren(children) {
    const newProps = { refCallback: this.updateHeight };
    const visibleChildren = [];

    // TODO: might need to be more efficient, eliminating children by index.
    React.Children.forEach(children, (child) => {
      if (this.state.hiddenTopItems.indexOf(child.key) < 0 || this.state.hiddenBottomItems.indexOf(child.key) < 0) {
        visibleChildren.push(React.cloneElement(child, newProps));
      }
    });
    return visibleChildren;
  }

  enableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.addEventListener('scroll', this.tick);
    this.listenersAdded = true;
  }

  disableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.removeEventListener('scroll', this.tick);
    this.listenersAdded = false;
  }

  update() {
    if (!this.contentNode) {
      return;
    }

    // TODO: might need to be more efficient, eliminating children by index.
    const hiddenTopItems = [];
    const hiddenBottomItems = [];

    const topItemKey = this.state.hiddenTopItems[0];
    const bottomItemKey = this.state.hiddenBottomItems[0];

    const topItemIndex = this.itemsByKey[topItemKey];
    const bottomItemIndex = this.itemsByKey[bottomItemKey];

    const scrollTop = this.contentNode.scrollTop;
    const scrollHeight = this.contentNode.scrollHeight;
    const clientHeight = this.contentNode.clientHeight;

    const scrollBottom = scrollHeight - (scrollTop + clientHeight);

    const validTop = scrollTop - clientHeight;
    const validBottom = scrollBottom + clientHeight;

    // adjust based on index diff, not total height.
    this.hiddenTopHeight = 0; // reset height
    for (let i = topItemIndex; i >= 0; i -= 1) {
      const item = this.itemsByIndex[i];
      if (item.top + top.height < validTop) {
        hiddenTopItems.push(item.key);
        this.hiddenTopHeight += item.height;
      }
    }

    // adjust based on index diff, not total height.
    this.hiddenBottomHeight = 0; // reset height
    for (let i = bottomItemIndex; i >= this.itemsByIndex.length - 1; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.top > validBottom) {
        hiddenBottomItems.push(item.key);
        this.hiddenBottomHeight += item.height;
      }
    }

    if (hiddenTopItems.length !== this.state.hiddenTopItems || hiddenBottomItems.length !== this.state.hiddenBottomItems) {
      this.setState({ hiddenTopItems, hiddenBottomItems });
    }

    const shouldTriggerRequest = scrollHeight - (scrollTop + clientHeight) < clientHeight;
    if (this.props.onRequestItems && shouldTriggerRequest) {
      this.props.onRequestItems();
    }
  }

  updateHeight(node, key, index) {
    this.itemsByKey[key] = node.clientHeight;
    this.itemsByIndex[index] = node.clientHeight;
  }

  debounce(fn, delay) {
    let timer = null;
    return (...args) => {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }

  render() {
    const {
      children,
      isFinishedLoading,
      onRequestItems,
      ...customProps
    } = this.props;

    let topSpacer;
    if (this.state.hiddenTopItems) {
      topSpacer = <div className={cx(['spacer'])} style={{ height: this.hiddenTopHeight }} />;
    }

    let bottomSpacer;
    if (this.state.hiddenBottomItems) {
      bottomSpacer = <div className={cx(['spacer'])} style={{ height: this.hiddenBottomHeight }} />;
    }

    let loadingSpinner;
    if (!this.isFinishedLoading) {
      loadingSpinner = (
        <OverlayContainer className={cx(['loading'])} >
          <LoadingOverlay isOpen isAnimated isRelativeToContainer />
        </OverlayContainer>
      );
    }

    return (
      <div {...customProps} className={cx(['infinite-scroller', customProps.className])} ref={this.setContentNode}>
        {topSpacer}
        {this.getVisibleChildren(children)}
        {bottomSpacer}
        {loadingSpinner}
      </div>
    );
  }
}

InfiniteScroller.propTypes = propTypes;
InfiniteScroller.defaultProps = defaultProps;
InfiniteScroller.Item = ScrollerItem;

export default InfiniteScroller;
