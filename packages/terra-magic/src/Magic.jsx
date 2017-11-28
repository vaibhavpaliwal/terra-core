import React from 'react';
import PropTypes from 'prop-types';
import MagicContent from './MagicContent';
import MagicUtils from './_MagicUtils';

const VERTICAL_ATTACHMENTS = [
  'top',
  'middle',
  'bottom',
];

const HORIZONTAL_ATTACHMENTS = [
  'start',
  'center',
  'end',
];

const ATTACHMENT_BEHAVIORS = [
  'auto',
  'flip',
  'none',
];

const propTypes = {
  /**
   * How the content should be positioned when the primary attachment is not available.
   * Valid values:
   *  'auto': returns 180 degrees, returns rotate 90 degree, returns rotate -90 degrees, returns primary attachment
   *  'flip': returns 180 degrees, returns primary attachment
   *  'none': returns primary attachment
   */
  attachmentBehavior: PropTypes.oneOf(ATTACHMENT_BEHAVIORS),
  /**
   * Value in px of the margin to place between the target and the content.
   */
  attachmentMargin: PropTypes.number,
  /**
   * Reference to the bounding container, will use window if nothing is provided.
   */
  boundingRef: PropTypes.func,
  /**
   * The HookshotContent to be attached.
   */
  children: PropTypes.element.isRequired,
  /**
   * Object containing the vertical and horizontal attachment values for the content.
   * Valid values: { horizontal: ['start', 'center', 'end'], vertical: ['top', 'middle', 'bottom'] }.
   */
  contentAttachment: PropTypes.shape({
    horizontal: PropTypes.oneOf(HORIZONTAL_ATTACHMENTS),
    vertical: PropTypes.oneOf(VERTICAL_ATTACHMENTS),
  }).isRequired,
  /**
   * Object containing the vertical and horizontal offset values in px for the content.
   */
  contentOffset: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number,
  }),
  /**
   * Determines whether the content should be actively positioned via hookshot.
   */
  isEnabled: PropTypes.bool,
  /**
   * Should the content be presented.
   */
  isOpen: PropTypes.bool,
  /**
   * Callback function when the content has been positioned.
   */
  onPosition: PropTypes.func,
  /**
   * Required element that the content will hookshot to.
   */
  targetRef: PropTypes.func.isRequired,
  /**
   * Object containing the vertical and horizontal attachment values for the target.
   * Valid values: { horizontal: ['start', 'center', 'end'], vertical: ['top', 'middle', 'bottom'] }.
   */
  targetAttachment: PropTypes.shape({
    horizontal: PropTypes.oneOf(HORIZONTAL_ATTACHMENTS),
    vertical: PropTypes.oneOf(VERTICAL_ATTACHMENTS),
  }),
  /**
   * Object containing the vertical and horizontal offset values in px for the target.
   */
  targetOffset: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number,
  }),
};

const defaultProps = {
  attachmentMargin: 0,
  attachmentBehavior: 'auto',
  contentOffset: { horizontal: 0, vertical: 0 },
  isEnabled: false,
  isOpen: false,
  targetOffset: { horizontal: 0, vertical: 0 },
};

class Magic extends React.Component {
  constructor(props) {
    super(props);
    this.setContentNode = this.setContentNode.bind(this);
    this.getNodeRects = this.getNodeRects.bind(this);
    this.update = this.update.bind(this);
    this.tick = this.tick.bind(this);
    this.state = { isEnabled: props.isEnabled && props.isOpen };
    this.listenersAdded = false;
    this.lastCall = null;
    this.lastDuration = null;
    this.pendingTimeout = null;
  }

  componentDidMount() {
    if (this.state.isEnabled) {
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
    if (this.state.isEnabled) {
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

  getNodeRects() {
    const targetRect = MagicUtils.getBounds(this.props.targetRef());
    const contentRect = MagicUtils.getBounds(this.contentNode);
    const boundingRect = MagicUtils.getBoundingRect(this.props.boundingRef ? this.props.boundingRef() : 'window');
    return { targetRect, contentRect, boundingRect };
  }

  tick(event) {
    if (this.lastDuration && this.lastDuration > 16) {
      // Throttle to 60fps, in order to handle safari and mobile performance
      this.lastDuration = Math.min(this.lastDuration - 16, 100);

      // Just in case this is the last event, remember to position just once more
      this.pendingTimeout = setTimeout(this.tick, 100);
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
    const target = this.props.targetRef();
    if (!target) {
      return;
    }

    ['resize'].forEach(event => window.addEventListener(event, this.tick));
    this.listenersAdded = true;
  }

  disableListeners() {
    ['resize'].forEach(event => window.removeEventListener(event, this.tick));
    this.listenersAdded = false;
  }

  position(event, resetCache) {
    if (resetCache) {
      this.cachedRects = this.getNodeRects();
    } else {
      if (this.props.boundingRef) {
        this.cachedRects.boundingRect = MagicUtils.getBoundingRect(this.props.boundingRef());
      }
      this.cachedRects.targetRect = MagicUtils.getBounds(this.props.targetRef());
    }

    this.content.rect = this.cachedRects.contentRect;
    this.target.rect = this.cachedRects.targetRect;

    const result = MagicUtils.positionStyleFromBounds(
      this.cachedRects.boundingRect,
      this.content,
      this.target,
      this.props.attachmentMargin,
      this.props.attachmentBehavior,
    );

    let styleUpdated = false;
    const newTransform = `translate3d(${result.style.left}, ${result.style.top}, 0px)`;
    if (this.contentNode.style.transform !== newTransform) {
      this.contentNode.style.transform = newTransform;
      styleUpdated = true;
    }
    if (this.contentNode.style.opacity !== '1') {
      this.contentNode.style.opacity = '1';
      styleUpdated = true;
    }
    if (styleUpdated) {
      this.cachedRects.contentRect = MagicUtils.getBounds(this.contentNode);
      result.positions.content.rect = this.cachedRects.contentRect;
    }

    if (this.props.onPosition) {
      this.props.onPosition(
        event,
        result.positions,
      );
    }
  }

  update(event) {
    if (!this.props.targetRef() || !this.contentNode) {
      return;
    }
    this.updateHookshot(event);
  }

  updateHookshot(event) {
    this.position(event, !event);
  }

  cloneContent(content) {
    return React.cloneElement(content, { refCallback: this.wrappedRefCallback(content) });
  }

  wrappedRefCallback(content) {
    const initialRefCallback = content.props.refCallback;

    return (node) => {
      this.setContentNode(node);

      if (initialRefCallback) {
        initialRefCallback(node);
      }
    };
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      attachmentBehavior,
      attachmentMargin,
      boundingRef,
      children,
      contentAttachment,
      contentOffset,
      isEnabled,
      isOpen,
      targetRef,
      targetAttachment,
      targetOffset,
      onPosition,
    } = this.props;
    /* eslint-enable no-unused-vars */
    if (!isOpen) {
      return null;
    }

    const isRTL = document.getElementsByTagName('html')[0].getAttribute('dir') === 'rtl';
    this.content = {
      offset: MagicUtils.getDirectionalOffset(contentOffset, isRTL),
      attachment: MagicUtils.getDirectionalAttachment(contentAttachment, isRTL),
    };
    this.target = {
      offset: MagicUtils.getDirectionalOffset(targetOffset, isRTL),
      attachment: targetAttachment ? MagicUtils.getDirectionalAttachment(targetAttachment, isRTL) : MagicUtils.mirrorAttachment(this.content.attachment),
    };

    return (
      this.cloneContent(children)
    );
  }
}

Magic.propTypes = propTypes;
Magic.defaultProps = defaultProps;
Magic.horizontalAttachments = HORIZONTAL_ATTACHMENTS;
Magic.verticalAttachments = VERTICAL_ATTACHMENTS;
Magic.attachmentBehaviors = ATTACHMENT_BEHAVIORS;
Magic.Utils = MagicUtils;
Magic.Content = MagicContent;

export default Magic;
