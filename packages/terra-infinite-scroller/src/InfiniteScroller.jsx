import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import LoadingOverlay from 'terra-overlay/lib/LoadingOverlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import ScrollerItem from './_ScrollerItem';
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
    this.update = this.update.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.enableListeners = this.enableListeners.bind(this);
    this.disableListeners = this.disableListeners.bind(this);
    this.getVisibleChildren = this.getVisibleChildren.bind(this);
    this.getTopFromTopDown = this.getTopFromTopDown.bind(this);
    this.getTopFromBottomUp = this.getTopFromBottomUp.bind(this);
    this.getBottomFromTopDown = this.getBottomFromTopDown.bind(this);
    this.getBottomFromBottomUp = this.getBottomFromBottomUp.bind(this);
    this.setContentNode = this.setContentNode.bind(this);
    this.tick = this.tick.bind(this);

    // make common
    this.itemsByIndex = [];
    React.Children.forEach(props.children, () => {
      this.itemsByIndex.push({ height: 0, offsetTop: 0 }); // TODO: find good insital state to determine if loaded
    });

    this.boundary = {
      topBoundryIndex: -1,
      hiddenTopHeight: -1,
      bottomBoundryIndex: -1,
      hiddenBottomHeight: -1,
    };
  }

  componentDidMount() {
    if (!this.listenersAdded) {
      this.enableListeners();
    }
    this.update();
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({ isEnabled: newProps.isEnabled && newProps.isOpen });
  // }

  componentDidUpdate() {
    // // make common
    // this.itemsByIndex = [];
    // React.Children.forEach(this.props.children, (child) => {
    //   this.itemsByIndex.push({ height: child.props.height || 0, offsetTop: 0 });
    // });

    if (!this.listenersAdded) {
      this.enableListeners();
    }
  }

  componentWillUnmount() {
    this.disableListeners();
  }

  setContentNode(node) {
    this.contentNode = node;
  }

  getVisibleChildren(children) {
    if (React.Children.count(this.props.children) < 1) {
      return null;
    }
    let noTopIndex = false;
    let validTopIndex = this.boundary.topBoundryIndex;
    if (validTopIndex < 0) {
      validTopIndex = -1;
      noTopIndex = true;
    }
    let noBottomIndex = false;
    let validBottomIndex = this.boundary.bottomBoundryIndex;
    if (validBottomIndex < 0) {
      validBottomIndex = React.Children.count(children);
      noBottomIndex = true;
    }

    if (!(noTopIndex && noBottomIndex)) {
      const visibleChildren = [];
      const childrenArray = React.Children.toArray(children);
      for (let i = validTopIndex + 1; i < validBottomIndex; i += 1) {
        visibleChildren.push(
          <ScrollerItem refCallback={this.updateHeight} index={i} key={i}>
            {childrenArray[i]}
          </ScrollerItem>,
        );
      }
      return visibleChildren;
    }
    return React.Children.map(children, (child, index) => (
      <ScrollerItem refCallback={this.updateHeight} index={index} key={`scrollerItem-${index}`}>
        {child}
      </ScrollerItem>
    ));
  }

  getTopFromTopDown(index, validTop) {
    const lastHidden = { index: -1, height: -1 };
    for (let i = index; i < this.itemsByIndex.length; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop + item.height <= validTop) {
        lastHidden.index = i;
        lastHidden.height = item.offsetTop + item.height;
      } else {
        break;
      }
    }
    return lastHidden;
  }

  getTopFromBottomUp(index, validTop) {
    const nextHidden = { index: -1, height: -1 };
    for (let i = index; i >= 0; i -= 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop + item.height <= validTop) {
        nextHidden.index = i;
        nextHidden.height = item.offsetTop + item.height;
        break;
      }
    }
    return nextHidden;
  }

  getBottomFromTopDown(index, validBottom) {
    const nextHidden = { index: -1, height: -1 };
    const finalItem = this.itemsByIndex[this.itemsByIndex.length - 1];
    for (let i = index; i < this.itemsByIndex.length; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop >= validBottom) {
        nextHidden.index = i;
        nextHidden.height = (finalItem.offsetTop + finalItem.height) - item.offsetTop;
        break;
      }
    }
    return nextHidden;
  }

  getBottomFromBottomUp(index, validBottom) {
    const lastHidden = { index: -1, height: -1 };
    const finalItem = this.itemsByIndex[this.itemsByIndex.length - 1];
    for (let i = index; i >= 0; i -= 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop >= validBottom) {
        lastHidden.index = i;
        lastHidden.height = (finalItem.offsetTop + finalItem.height) - item.offsetTop;
      } else {
        break;
      }
    }
    return lastHidden;
  }

  tick(event) {
    if (this.lastDuration && this.lastDuration > 32) {
      // Throttle to 60fps, in order to handle safari and mobile performance
      this.lastDuration = Math.min(this.lastDuration - 32, 150);

      // Just in case this is the last event, remember to position just once more
      this.pendingTimeout = setTimeout(this.tick, 150);
      return;
    }

    if (this.lastCall && (performance.now() - this.lastCall) < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (this.pendingTimeout != null) {
      clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;
    }

    this.lastCall = performance.now();
    this.update(event);
    this.lastDuration = performance.now() - this.lastCall;
  }

  enableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.addEventListener('scroll', this.tick); // consider tick
    this.listenersAdded = true;
  }

  disableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.removeEventListener('scroll', this.tick); // consider tick
    this.listenersAdded = false;
  }

  update() {
    if (!this.contentNode) {
      return;
    }

    const scrollTop = this.contentNode.scrollTop;
    const scrollHeight = this.contentNode.scrollHeight;
    const clientHeight = this.contentNode.clientHeight;
    const validTop = scrollTop - (1 * clientHeight);
    const validBottom = scrollTop + (2 * clientHeight);

    let topHiddenItem;
    if (validTop > 0) {
      let nextIndex = this.boundary.topBoundryIndex;
      if (nextIndex < 0) {
        nextIndex = 0;
      }

      const topItem = this.itemsByIndex[nextIndex];
      if (topItem.offsetTop + topItem.height <= validTop) {
        topHiddenItem = this.getTopFromTopDown(nextIndex, validTop);
      } else {
        topHiddenItem = this.getTopFromBottomUp(nextIndex, validTop);
      }
    } else {
      topHiddenItem = { index: -1, height: -1 };
    }

    let bottomHiddenItem;
    if (scrollHeight - validBottom > 0) {
      let nextIndex = this.boundary.bottomBoundryIndex;
      if (nextIndex < 0) {
        nextIndex = 0;
      }

      const bottomItem = this.itemsByIndex[nextIndex];
      if (bottomItem.offsetTop >= validBottom) {
        bottomHiddenItem = this.getBottomFromBottomUp(nextIndex, validBottom);
      } else {
        bottomHiddenItem = this.getBottomFromTopDown(nextIndex, validBottom);
      }
    } else {
      bottomHiddenItem = { index: -1, height: -1 };
    }

    if (topHiddenItem.index !== this.boundary.topBoundryIndex || bottomHiddenItem.index !== this.boundary.bottomBoundryIndex) {
      this.boundary = {
        topBoundryIndex: topHiddenItem.index,
        hiddenTopHeight: topHiddenItem.height,
        bottomBoundryIndex: bottomHiddenItem.index,
        hiddenBottomHeight: bottomHiddenItem.height,
      };
      this.forceUpdate();
    }

    const shouldTriggerRequest = scrollHeight - (scrollTop + clientHeight) < clientHeight;
    if (this.props.onRequestItems && shouldTriggerRequest) {
      this.props.onRequestItems();
    }
  }

  updateHeight(node, index) {
    if (node) {
      this.itemsByIndex[index] = { height: node.clientHeight, offsetTop: node.offsetTop };
    }
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
    if (this.boundary.hiddenTopHeight > 0) {
      topSpacer = <div className={cx(['spacer'])} style={{ height: this.boundary.hiddenTopHeight }} />;
    }

    let bottomSpacer;
    if (this.boundary.hiddenBottomHeight > 0) {
      bottomSpacer = <div className={cx(['spacer'])} style={{ height: this.boundary.hiddenBottomHeight }} />;
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

export default InfiniteScroller;
