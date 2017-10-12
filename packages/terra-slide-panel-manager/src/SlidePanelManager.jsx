import React from 'react';
import PropTypes from 'prop-types';

import AppDelegate from 'terra-app-delegate';
import SlideGroup from 'terra-slide-group';
import SlidePanel from 'terra-slide-panel';

import 'terra-base/lib/baseStyles';

const propTypes = {
  /**
   * The AppDelegate instance provided by the containing component. If present, its properties will propagate to the children components.
   */
  app: AppDelegate.propType,
  /**
   * Components that will receive the slidePanelManager's AppDelegate configuration. Components given as children must appropriately handle an `app` prop.
   */
  children: PropTypes.node,
  /**
   * From `connect`. The Array of component data (key, name, and props) that will be used to instantiate the Modal's inner components.
   */
  panelComponentData: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object,
  })),
  panelBehavior: PropTypes.oneOf(['overlay', 'squish']),
  panelPosition: PropTypes.oneOf(['start', 'end']),
  panelSize: PropTypes.oneOf(['small', 'large']),
  isOpen: PropTypes.bool,
  isFullscreen: PropTypes.bool,
  fill: PropTypes.bool,
  openPanel: PropTypes.func,
  closePanel: PropTypes.func,
  pushPanel: PropTypes.func,
  popPanel: PropTypes.func,
  maximizePanel: PropTypes.func,
  minimizePanel: PropTypes.func,
};

const defaultProps = {
  isOpen: false,
  isFullscreen: false,
  fill: false,
  panelBehavior: 'overlay',
  panelPosition: 'end',
  panelSize: 'small',
  panelComponentData: [],
};

class SlidePanelManager extends React.Component {
  constructor(props) {
    super(props);
    this.buildPanelComponents = this.buildPanelComponents.bind(this);
    this.buildChildren = this.buildChildren.bind(this);
  }

  buildPanelComponents() {
    const { app, panelComponentData, isFullscreen, pushPanel, popPanel, closePanel, maximizePanel, minimizePanel } = this.props;
    console.log("Any mapping? " + panelComponentData);
    return panelComponentData.map((componentData, index) => {
      const Component = AppDelegate.getComponentForDisclosure(componentData.name);

      console.log("HERE")
      if (!Component) {
        console.log("NOPE")
        return undefined;
      }
      console.log(Component)

      const appDelegate = AppDelegate.create({
        disclose: (data) => {
          if (data.preferredType === 'panel' || !app) {
            pushPanel(data);
          } else {
            app.disclose(data);
          }
        },
        dismiss: () => {
          if (index > 0) {
            popPanel();
          } else {
            closePanel();
          }
        },
        closeDisclosure: () => { closePanel(); },
        goBack: index > 0 ? () => { popPanel(); } : null,
        maximize: !isFullscreen ? () => { maximizePanel(); } : null,
        minimize: isFullscreen ? () => { minimizePanel(); } : null,
      });

      return <Component key={componentData.key} {...componentData.props} app={appDelegate} />;
    });
  }

  /**
   * The provided child components are cloned and provided with an AppDelegate instance that contains a new disclose
   * function that will allow for modal presentation. If an AppDelegate was already provided to the SlidePanelManager through
   * props, its implementations will be used for APIs not implemented by the SlidePanelManager.
   */
  buildChildren() {
    const { app, children, openPanel } = this.props;
    console.log("HERE?")
    return React.Children.map(children, (child) => {
      const childAppDelegate = AppDelegate.clone(app, {
        disclose: (data) => {
          if (data.preferredType === 'panel' || !app) {
            openPanel(data);
          } else {
            app.disclose(data);
          }
        },
      });

      return React.cloneElement(child, { app: childAppDelegate });
    });
  }

  render() {
    const { panelBehavior, panelPosition, panelSize, fill, isOpen, isFullscreen } = this.props;

    return (
      <SlidePanel
        mainContent={this.buildChildren()}
        panelContent={<SlideGroup items={this.buildPanelComponents()} />}
        panelBehavior={panelBehavior}
        panelPosition={panelPosition}
        panelSize={panelSize}
        isFullscreen={isFullscreen}
        isOpen={isOpen}
        fill={fill}
      />
    );
  }
}

SlidePanelManager.propTypes = propTypes;
SlidePanelManager.defaultProps = defaultProps;

export default SlidePanelManager;
