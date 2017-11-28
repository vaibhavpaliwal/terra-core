const BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

/**
 * This function returns the attachment object, adjusted for RTL conversion.
 *
 * @ param {Object} attachment - The vertical and horizonal hookshot attachments.
 * @ param {bool} isRTL - Whether or not the page is using RTL.
 */
const getDirectionalAttachment = (attachment, isRTL) => {
  if (attachment.horizontal === 'start') {
    return { vertical: attachment.vertical, horizontal: (isRTL ? 'right' : 'left') };
  } else if (attachment.horizontal === 'end') {
    return { vertical: attachment.vertical, horizontal: (isRTL ? 'left' : 'right') };
  }
  return attachment;
};

/**
 * This function returns the offset object, adjusted for RTL conversion.
 *
 * @ param {Object} offset - The vertical and horizonal offset values.
 * @ param {bool} isRTL - Whether or not the page is using RTL.
 */
const getDirectionalOffset = (offset, isRTL) => {
  if (isRTL) {
    return { vertical: offset.vertical, horizontal: -offset.horizontal };
  }
  return offset;
};
/**
 * This function returns the size of an element and its position relative to the viewport. It takes into account parent <frame> offsets
 * if the element lies within a nested document (<frame> or <iframe>-like).
 *
 * @ param {htmlELement} node - The html reference to use to retrieve it's bounding rect values.
 */
const getActualBoundingClientRect = (node) => {
  const clientRect = node.getBoundingClientRect();
  return {
    top: node.offsetTop,
    height: clientRect.height,
    bottom: node.offsetTop + clientRect.height,
    left: node.offsetLeft,
    width: clientRect.width,
    right: node.offsetLeft + clientRect.width,
  };
};

/**
 * This function returns the bounds of an element.
 *
 * @ param {htmlELement} element - The html reference to use to retrieve it's bounds.
 */
const getBounds = (element) => {
  let doc = document;
  let currentElement = document.documentElement;

  if (element !== document) {
    doc = element.ownerDocument;
    currentElement = element;
  }

  const docEl = doc.documentElement;
  const box = getActualBoundingClientRect(currentElement);

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }

  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top -= docEl.clientTop;
  box.left -= docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  // round origin
  box.top = Math.round(box.top);
  box.right = Math.round(box.right);
  box.bottom = Math.round(box.bottom);
  box.left = Math.round(box.left);
  box.height = Math.round(box.height);
  box.width = Math.round(box.width);

  return box;
};

/**
 * This function returns the size of an element. It takes into account scroll offsets and border widths applied.
 *
 * @ param {htmlELement/string} boundingElement - The value used to determine the size of bounding element.
 */
const getBoundingRect = (boundingElement) => {
  if (boundingElement === 'window') {
    return {
      top: 0,
      bottom: innerHeight,
      left: 0,
      right: innerWidth,
    };
  }

  const bounds = getBounds(boundingElement);
  const style = getComputedStyle(boundingElement);
  const rect = {
    top: bounds.top,
    bottom: bounds.top + bounds.height,
    left: bounds.left,
    right: bounds.left + bounds.width,
  };

  // Account for any parent Frames scroll offset
  if (boundingElement.ownerDocument !== document) {
    const parentView = boundingElement.ownerDocument.defaultView;

    rect.left += parentView.pageXOffset;
    rect.top += parentView.pageYOffset;
    rect.right += parentView.pageXOffset;
    rect.bottom += parentView.pageYOffset;
  }

  BOUNDS_FORMAT.forEach((side) => {
    const subSide = side[0].toUpperCase() + side.substr(1);
    if (subSide === 'Top' || subSide === 'Left') {
      rect[side] += parseFloat(style[`border${subSide}Width`]);
    } else {
      rect[side] -= parseFloat(style[`border${subSide}Width`]);
    }
  });

  // round origin
  rect.top = Math.round(rect.top);
  rect.right = Math.round(rect.right);
  rect.bottom = Math.round(rect.bottom);
  rect.left = Math.round(rect.left);

  return rect;
};

/**
 * This function returns the screen coordinates, attachment values and offset values for the target.
 *
 * @ param {Object} target - The target x/y coords, rectangle, offset, and attachment.
 */
const getTargetPosition = (target) => {
  const targetCoords = {};
  const targetTop = target.rect.top;
  const targetHeight = target.rect.height;
  const targetLeft = target.rect.left;
  const targetWidth = target.rect.width;

  if (target.attachment.vertical === 'middle') {
    targetCoords.y = targetTop + (targetHeight / 2);
  } else if (target.attachment.vertical === 'bottom') {
    targetCoords.y = targetTop + targetHeight;
  } else {
    targetCoords.y = targetTop;
  }

  if (target.attachment.horizontal === 'center') {
    targetCoords.x = targetLeft + (targetWidth / 2);
  } else if (target.attachment.horizontal === 'right') {
    targetCoords.x = targetLeft + targetWidth;
  } else {
    targetCoords.x = targetLeft;
  }

  return {
    x: targetCoords.x + target.offset.horizontal,
    y: targetCoords.y + target.offset.vertical,
    attachment: target.attachment,
    offset: target.offset,
    rect: target.rect,
  };
};

/**
 * This function returns the relative positional data of the content and target. Positional data includes
 * the screen coordinates, attchment values and offset values.
 *
 * @ param {Object} content - The content x/y coords, rectangle, offset, and attachment.
 * @ param {Object} target - The target x/y coords, rectangle, offset, and attachment.
 * @ param {number} margin - The px value of the attachmentMargin.
 */
const getRelativePositions = (content, target, margin) => {
  const contentCoords = {};
  const contentHeight = content.rect.height;
  const contentWidth = content.rect.width;

  if (content.attachment.vertical === 'middle') {
    if (content.attachment.horizontal === 'center') {
      contentCoords.x = target.x - (contentWidth / 2);
    } else if (content.attachment.horizontal === 'right') {
      contentCoords.x = target.x - contentWidth - margin;
    } else {
      contentCoords.x = target.x + margin;
    }

    contentCoords.y = target.y - (contentHeight / 2);
  } else {
    if (content.attachment.horizontal === 'center') {
      contentCoords.x = target.x - (contentWidth / 2);
    } else if (content.attachment.horizontal === 'right') {
      contentCoords.x = target.x - contentWidth;
    } else {
      contentCoords.x = target.x;
    }

    if (content.attachment.vertical === 'bottom') {
      contentCoords.y = target.y - contentHeight - margin;
    } else {
      contentCoords.y = target.y + margin;
    }
  }

  return {
    content: {
      x: contentCoords.x + content.offset.horizontal,
      y: contentCoords.y + content.offset.vertical,
      attachment: content.attachment,
      offset: content.offset,
      rect: content.rect,
    },
    target,
  };
};

/**
 * The function returns the style and positional data the hookshot content and target. Positional data includes
 * the screen coordinates, attchment values and offset values.
 *
 * @ param {Object} boundingRect - The bounding rectangle.
 * @ param {Object} content - The content x/y coords, rectangle, offset, and attachment.
 * @ param {Object} target - The target x/y coords, rectangle, offset, and attachment.
 * @ param {number} margin - The px value of the attachmentMargin.
 * @ param {string} behavior - The attachemnt behavior which indicates the available content rotations.
 */
const positionStyleFromBounds = (boundingRect, content, target, margin) => {
  const targetPosition = getTargetPosition(target);

  // Get relative content and target positions
  const positions = getRelativePositions(content, targetPosition, margin);

  // if (!isValidPositions(positions, boundingRect)) {
  //   // Try to find valid alternative positions
  //   positions = getAlternatePositions(positions, boundingRect, margin, behavior);
  // }

  // // Get bounded content and target positions
  // positions = getBoundedPositions(positions, boundingRect);

  return {
    style: {
      left: `${Math.round(positions.content.x)}px`,
      top: `${Math.round(positions.content.y)}px`,
    },
    positions,
  };
};

export default {
  getBounds,
  getBoundingRect,
  getDirectionalAttachment,
  getDirectionalOffset,
  positionStyleFromBounds,
};
