import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import 'terra-base/lib/baseStyles';
import LoadingOverlay from 'terra-overlay/lib/LoadingOverlay';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import ResizeObserver from 'resize-observer-polyfill';
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

const createSpacer = (height, index) => <div className={cx(['spacer'])} style={{ height }} key={`scrollerSpacer-${index}`} />;

class InfiniteScroller extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.handleResize = this.throttle(this.handleResize.bind(this), 250);
    this.resetSizeCache = this.resetSizeCache.bind(this);
    this.enableListeners = this.enableListeners.bind(this);
    this.disableListeners = this.disableListeners.bind(this);
    this.getVisibleChildren = this.getVisibleChildren.bind(this);
    this.getTopFromTopDown = this.getTopFromTopDown.bind(this);
    this.getTopFromBottomUp = this.getTopFromBottomUp.bind(this);
    this.getBottomFromTopDown = this.getBottomFromTopDown.bind(this);
    this.getBottomFromBottomUp = this.getBottomFromBottomUp.bind(this);
    this.updateScrollGroups = this.updateScrollGroups.bind(this);
    this.getPersistentItems = this.getPersistentItems.bind(this);
    this.setContentNode = this.setContentNode.bind(this);
    this.wrapChild = this.wrapChild.bind(this);

    this.resetSizeCache(props);
    this.cached = false;
    this.derp = true;
  }

  componentDidMount() {
    if (!this.listenersAdded) {
      this.enableListeners();
    }
    this.update();
  }

  componentWillReceiveProps(newProps) {
    if (React.Children.count(newProps.children) !== this.childCount) {
      this.resetSizeCache(newProps);
    }
  }

  componentDidUpdate() {
    if (!this.listenersAdded) {
      this.enableListeners();
    }
  }

  componentWillUnmount() {
    this.disableListeners();
  }

  setContentNode(node) {
    this.contentNode = node;
    this.updateScrollGroups();// ensure this only happens once or move it to mount.
  }

  getPersistentItems(persistentIndexes, startIndex, endIndex, spacerIndex) {
    const items = [];
    let newSpacerIndex = spacerIndex;
    let segmentHeight = 0;
    for (let i = startIndex; i <= endIndex; i += 1) {
      const itemIndex = this.scrollGroups[i].items[0];
      const item = this.itemsByIndex[itemIndex];
      if (!item.isMountable && persistentIndexes.indexOf(i) >= 0) {
        if (segmentHeight > 0) {
          items.push(createSpacer(segmentHeight, newSpacerIndex));
          newSpacerIndex += 1;
          segmentHeight = 0;
        }
        items.push(this.wrapChild(this.childrenArray[itemIndex], itemIndex, false));
      } else {
        segmentHeight += this.scrollGroups[i].height;
        if (i === endIndex) {
          items.push(createSpacer(segmentHeight, newSpacerIndex));
          newSpacerIndex += 1;
        }
      }
    }
    return { items, spacerIndex: newSpacerIndex };
  }

  getScrollContent() {
    let topSpacer = [];
    let bottomSpacer = [];
    const topIFrames = [];
    const bottomIFrames = [];
    let spacerIndex = 0;
    if (this.iFrames.length > 0) {
      this.iFrames.forEach((iFrameIndex) => {
        if (this.boundary.topBoundryIndex >= 0 && iFrameIndex <= this.boundary.topBoundryIndex) {
          topIFrames.push(iFrameIndex);
        } else if (this.boundary.bottomBoundryIndex >= 0 && iFrameIndex >= this.boundary.bottomBoundryIndex) {
          bottomIFrames.push(iFrameIndex);
        }
      });
    }

    if (topIFrames.length > 0) {
      const persistent = this.getPersistentItems(topIFrames, 0, this.boundary.topBoundryIndex, spacerIndex);
      topSpacer = persistent.items;
      spacerIndex = persistent.spacerIndex;
    } else if (this.boundary.hiddenTopHeight > 0) {
      topSpacer.push(createSpacer(this.boundary.hiddenTopHeight, spacerIndex));
      spacerIndex += 1;
    }

    if (bottomIFrames.length > 0) {
      const maxIndex = this.scrollGroups.length - 1;
      const persistent = this.getPersistentItems(bottomIFrames, this.boundary.bottomBoundryIndex, maxIndex, spacerIndex);
      bottomSpacer = persistent.items;
      spacerIndex = persistent.spacerIndex;
    } else if (this.boundary.hiddenBottomHeight > 0) {
      bottomSpacer.push(createSpacer(this.boundary.hiddenBottomHeight, spacerIndex));
      spacerIndex += 1;
    }

    return topSpacer.concat(this.getVisibleChildren()).concat(bottomSpacer);
  }

  getVisibleChildren() {
    if (this.childCount === 0) {
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
      validBottomIndex = this.scrollGroups.length;
      noBottomIndex = true;
    }

    if (!noTopIndex || !noBottomIndex) {
      const visibleChildren = [];
      const childrenArray = this.childrenArray;
      const scrollGroups = this.scrollGroups;
      for (let i = validTopIndex + 1; i < validBottomIndex; i += 1) {
        const scrollGroup = scrollGroups[i].items;
        const scrollGroupLength = scrollGroup.length;
        for (let j = 0; j < scrollGroupLength; j += 1) {
          const itemIndex = scrollGroup[j];
          visibleChildren.push(this.wrapChild(childrenArray[itemIndex], itemIndex, true));
        }
      }
      return visibleChildren;
    }
    return this.childrenArray.map((child, i) => (
      this.wrapChild(child, i, true)
    ));
  }

  getTopFromTopDown(index, validTop) {
    const lastHidden = { index: -1, height: -1 };
    for (let i = index; i < this.scrollGroups.length; i += 1) {
      const item = this.scrollGroups[i];
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
      const item = this.scrollGroups[i];
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
    const finalItem = this.scrollGroups[this.scrollGroups.length - 1];
    for (let i = index; i < this.scrollGroups.length; i += 1) {
      const item = this.scrollGroups[i];
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
    const finalItem = this.scrollGroups[this.scrollGroups.length - 1];
    for (let i = index; i >= 0; i -= 1) {
      const item = this.scrollGroups[i];
      if (item.offsetTop >= validBottom) {
        lastHidden.index = i;
        lastHidden.height = (finalItem.offsetTop + finalItem.height) - item.offsetTop;
      } else {
        break;
      }
    }
    return lastHidden;
  }

  resetSizeCache(props) {
    this.itemsByIndex = [];
    this.scrollGroups = [];
    this.iFrames = [];
    this.childCount = React.Children.count(props.children);
    this.childrenArray = React.Children.toArray(props.children);

    this.boundary = {
      topBoundryIndex: -1,
      hiddenTopHeight: -1,
      bottomBoundryIndex: -1,
      hiddenBottomHeight: -1,
    };
  }

  wrapChild(child, index, isRenderable) {
    // if (this.cached) {
    //   return (
    //     <ScrollerItem key={`scrollerItem-${index}`} isRenderable={isRenderable}>
    //       {child}
    //     </ScrollerItem>
    //   );
    // }
    const isMountable = child.props.isMountable;
    const isPersistent = child.props.isPersistent;
    const wrappedCallBack = (node) => {
      this.updateHeight(node, index, isPersistent, isMountable);
      if (child.props.refCallback) {
        child.props.refCallback(node);
      }
    };
    return (
      <ScrollerItem refCallback={wrappedCallBack} key={`scrollerItem-${index}`} isRenderable={isRenderable} scrollProps={{ 'data-infinite-scroller-index': index }}>
        {child}
      </ScrollerItem>
    );
  }

  throttle(fn) {
    return (...args) => {
      const context = this;
      const now = performance.now();
      if (this.last && now < this.last + 250) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.last = now;
          this.disableScroll = false;
          fn.apply(context, args);
        }, 250);
      } else {
        this.last = now;
        this.disableScroll = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.last = now;
          this.disableScroll = false;
          fn.apply(context, args);
        }, 250);
      }
    };
  }

  enableListeners() {
    if (!this.contentNode) {
      return;
    }
    this.resizeObserver = new ResizeObserver((entries) => {
      this.handleResize(entries[0].contentRect);
    });
    this.resizeObserver.observe(this.contentNode);
    this.contentNode.addEventListener('scroll', this.update); // consider tick
    this.listenersAdded = true;
  }

  disableListeners() {
    if (!this.contentNode) {
      return;
    }
    this.resizeObserver.disconnect(this.contentNode);
    this.contentNode.removeEventListener('scroll', this.update); // consider tick
    this.listenersAdded = false;
  }

  handleResize() {
    if (this.scrollHeight !== this.contentNode.scrollHeight) {
      this.adjustHeight();
    }
  }

  adjustHeight() {
    if (this.derp) {
      this.derp = false;
      return;
    }
    if (this.contentNode) {
      this.itemsByIndex.forEach((item, itemIndex) => {
        const scrollItemNode = this.contentNode.querySelector(`[data-infinite-scroller-index="${itemIndex}"]`);
        if (scrollItemNode) {
          const delta = scrollItemNode.clientHeight - this.itemsByIndex[itemIndex].height;
          if (!this.itemsByIndex[itemIndex].height || Math.abs(delta) > 1) {
            this.itemsByIndex[itemIndex].height = scrollItemNode.clientHeight;
          }
          if (!this.itemsByIndex[itemIndex].offsetTop || Math.abs(this.itemsByIndex[itemIndex].offsetTop - scrollItemNode.offsetTop) > 1) {
            this.itemsByIndex[itemIndex].offsetTop = scrollItemNode.offsetTop;
          }
          this.adjustTrailingItems(itemIndex);
        }
      });

      // needs to update offset tops of every other save
      this.updateScrollGroups();
      this.boundary = {
        topBoundryIndex: -1,
        hiddenTopHeight: -1,
        bottomBoundryIndex: -1,
        hiddenBottomHeight: -1,
      };
      this.update();
    }
  }

  adjustTrailingItems(index) {
    let lastTop = this.itemsByIndex[index].offsetTop;
    let lastHeight = this.itemsByIndex[index].height;
    for (let i = index + 1; i < this.itemsByIndex.length; i += 1) {
      lastTop += lastHeight;
      lastHeight = this.itemsByIndex[i].height;
      this.itemsByIndex[i].offsetTop = lastTop;
    }
  }

  update() {
    if (!this.contentNode || this.disableScroll) {
      return;
    }

    console.log('scroll - scrollHeight');
    console.log(this.scrollHeight = this.contentNode.scrollHeight);
    console.log('scroll - scrollTop');
    console.log(this.contentNode.scrollTop);

    this.scrollHeight = this.contentNode.scrollHeight;
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

      const topItem = this.scrollGroups[nextIndex];
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

      const bottomItem = this.scrollGroups[nextIndex];
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

  updateScrollGroups() {
    if (!this.contentNode) {
      return;
    }

    let groupHeight = 0;
    let groupIndex = 0;
    let captureOffsetTop = true;
    this.scrollGroups = [];
    this.iFrames = [];
    for (let i = 0; i < this.itemsByIndex.length; i += 1) {
      const item = this.itemsByIndex[i];
      if (item.height > 0) {
        if (item.isPersistent || item.isMountable) {
          if (groupHeight > 0) {
            groupHeight = 0;
            groupIndex += 1;
            captureOffsetTop = true;
          }
          this.iFrames.push(groupIndex);
        }

        groupHeight += item.height; // check individaul height is greater
        this.scrollGroups[groupIndex] = this.scrollGroups[groupIndex] || { items: [] };
        this.scrollGroups[groupIndex].items.push(i);
        this.scrollGroups[groupIndex].height = groupHeight;
        this.itemsByIndex[i].groupIndex = groupIndex;

        if (captureOffsetTop) {
          this.scrollGroups[groupIndex].offsetTop = this.itemsByIndex[i].offsetTop;
          captureOffsetTop = false;
        }
        if (item.isIFrame || groupHeight >= 1 * this.contentNode.clientHeight) {
          groupHeight = 0;
          groupIndex += 1;
          captureOffsetTop = true;
        }
      }
    }
    this.cached = true;
  }

  updateHeight(node, index, isPersistent, isMountable) {
    if (node) {
      this.itemsByIndex[index] = this.itemsByIndex[index] || {};
      let updatedHeight = false;
      let updateSpecial = false;
      if (!this.itemsByIndex[index].height || Math.abs(this.itemsByIndex[index].height - node.clientHeight) > 1) {
        this.itemsByIndex[index].height = node.clientHeight;
        updatedHeight = true;
        updateSpecial = true;
      }
      if (this.itemsByIndex[index].offsetTop !== node.offsetTop) {
        this.itemsByIndex[index].offsetTop = node.offsetTop;
        updatedHeight = true;
      }
      if (isPersistent) {
        this.itemsByIndex[index].isPersistent = true;
      }
      if (isMountable) {
        this.itemsByIndex[index].isMountable = true;
      }

      // do this calc only at max count
      if (updatedHeight && this.itemsByIndex.length === this.childCount) {
        if (updateSpecial) {
          this.adjustHeight();
        } else {
          this.updateScrollGroups();
        }
        // todo: maybe call update;
      }
    }
  }

  render() {
    const {
      children,
      isFinishedLoading,
      onRequestItems,
      ...customProps
    } = this.props;

    let loadingSpinner;
    if (!this.isFinishedLoading) {
      loadingSpinner = (
        <OverlayContainer className={cx(['loading'])} key="scroller-Loading">
          <LoadingOverlay isOpen isAnimated isRelativeToContainer />
        </OverlayContainer>
      );
    }

    return (
      <div {...customProps} className={cx(['infinite-scroller', customProps.className])} ref={this.setContentNode}>
        {this.getScrollContent(children)}
        {loadingSpinner}
      </div>
    );
  }
}

InfiniteScroller.propTypes = propTypes;
InfiniteScroller.defaultProps = defaultProps;

export default InfiniteScroller;
