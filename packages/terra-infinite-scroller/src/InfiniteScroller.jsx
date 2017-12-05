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

    // make common
    this.itemsByIndex = [];
    React.Children.forEach(props.children, () => {
      this.itemsByIndex.push({ height: 0, offsetTop: 0 }); // TODO: find good insital state to determine if loaded
    });

    this.state = {
      topBoundryIndex: -1,
      hiddenTopHeight: 0,
      bottomBoundryIndex: -1,
      hiddenBottomHeight: 0,
    };
  }

  componentDidMount() {
    if (!this.listenersAdded) {
      this.enableListeners();
    }
    this.update();
  }

  componentWillReceiveProps(newProps) {
    this.setState({ isEnabled: newProps.isEnabled && newProps.isOpen });
  }

  componentDidUpdate() {
    // // make common
    // this.itemsByIndex = [];
    // React.Children.forEach(this.props.children, (child) => {
    //   this.itemsByIndex.push({ height: child.props.height || 0, offsetTop: 0 });
    // });

    if (!this.listenersAdded) {
      this.enableListeners();
    }
    this.update();
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
    let validTopIndex = this.state.topBoundryIndex;
    if (validTopIndex < 0) {
      validTopIndex = 0;
      noTopIndex = true;
    }
    let noBottomIndex = false;
    let validBottomIndex = this.state.bottomBoundryIndex;
    if (validBottomIndex < 0) {
      validBottomIndex = React.Children.count(children);
      noBottomIndex = true;
    }

    if (validTopIndex !== validBottomIndex && !(noTopIndex && noBottomIndex)) {
      const visibleChildren = [];
      const childrenArray = React.Children.toArray(children);
      for (let i = validTopIndex; i < validBottomIndex; i += 1) {
        const child = childrenArray[i];
        visibleChildren.push(React.cloneElement(child, { refCallback: this.updateHeight, index: i }));
      }
      return visibleChildren;
    }
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, { refCallback: this.updateHeight, index });
    });
  }

  getTopFromTopDown(index, validTop) {
    const lastHidden = { index: -1, height: -1 };
    for (let i = index; i < this.itemsByIndex.length; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop + item.height >= validTop) {
        lastHidden.index = i;
        lastHidden.height = item.offsetTop + item.height;
        break;
      }
    }
    return lastHidden;
  }

  getTopFromBottomUp(index, validTop) {
    const nextHidden = { index: -1, height: -1 };
    for (let i = index; i >= 0; i -= 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop < validTop) {
        nextHidden.index = i;
        nextHidden.height = item.offsetTop + item.height;
      } else {
        break;
      }
    }
    return nextHidden;
  }

  getBottomFromTopDown(index, validBottom) {
    const nextHidden = { index: -1, height: -1 };
    for (let i = index; i < this.itemsByIndex.length; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop + item.height > validBottom) {
        nextHidden.index = i;
        nextHidden.height = item.offsetTop;
      } else {
        break;
      }
    }
    return nextHidden;
  }

  getBottomFromBottomUp(index, validBottom) {
    const lastHidden = { index: -1, height: -1 };
    for (let i = index; i >= 0; i -= 1) {
      const item = this.itemsByIndex[i];
      if (item.offsetTop >= validBottom) {
        lastHidden.index = i;
        lastHidden.height = item.offsetTop + item.height;
        break;
      }
    }
    return lastHidden;
  }

  enableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.addEventListener('scroll', this.update); // consider tick
    this.listenersAdded = true;
  }

  disableListeners() {
    if (!this.contentNode) {
      return;
    }

    this.contentNode.removeEventListener('scroll', this.update); // consider tick
    this.listenersAdded = false;
  }

  update() {
    if (!this.contentNode) {
      return;
    }

    const scrollTop = this.contentNode.scrollTop;
    const scrollHeight = this.contentNode.scrollHeight;
    const clientHeight = this.contentNode.clientHeight;
    const validTop = scrollTop > clientHeight ? scrollTop - clientHeight : scrollTop;
    const validBottom = scrollTop + (2 * clientHeight);

    let topHiddenItem;
    if (scrollTop > clientHeight) {
      let nextIndex = this.state.topBoundryIndex;
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
      topHiddenItem = { index: -1, height: 0 };
    }

    let bottomHiddenItem;
    if (scrollHeight - (scrollTop + clientHeight) > clientHeight) {
      let nextIndex = this.state.bottomBoundryIndex;
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
      bottomHiddenItem = { index: -1, height: 0 };
    }

    if (topHiddenItem.index !== this.state.topBoundryIndex || bottomHiddenItem.index !== this.state.bottomBoundryIndex || topHiddenItem.height !== this.state.hiddenTopHeight || bottomHiddenItem.height !== this.state.hiddenBottomHeight) {
      this.setState({
        topBoundryIndex: topHiddenItem.index,
        hiddenTopHeight: topHiddenItem.height,
        bottomBoundryIndex: bottomHiddenItem.index,
        hiddenBottomHeight: bottomHiddenItem.height,
      });
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

  // debounce(fn, delay) {
  //   let timer = null;
  //   return (...args) => {
  //     const context = this;
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       fn.apply(context, args);
  //     }, delay);
  //   };
  // }

  render() {
    const {
      children,
      isFinishedLoading,
      onRequestItems,
      ...customProps
    } = this.props;

    let topSpacer;
    if (this.state.hiddenTopHeight > 0) {
      topSpacer = <div className={cx(['spacer'])} style={{ height: this.state.hiddenTopHeight }} />;
    }

    let bottomSpacer;
    if (this.state.hiddenBottomHeight > 0) {
      bottomSpacer = <div className={cx(['spacer'])} style={{ height: this.state.hiddenBottomHeight }} />;
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
