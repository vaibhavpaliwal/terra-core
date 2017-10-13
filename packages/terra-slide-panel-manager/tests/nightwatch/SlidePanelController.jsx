import React from 'react';
import AppDelegate from 'terra-app-delegate';
import { disclosureName } from './PanelContent';

let nestedComponentIndex = 0;

class SlidePanelController extends React.Component {
  constructor(props) {
    super(props);
    this.disclose = this.disclose.bind(this);
    this.closeDisclosure = this.closeDisclosure.bind(this);
  }

  disclose(panelSize) {
    return () => {
      this.props.app.disclose({
        preferredType: 'panel',
        panelSize,
        content: {
          key: `SlidePanelContainer-${nestedComponentIndex += 1}`,
          name: disclosureName,
          props: {
            someText: `DemoContainer-${nestedComponentIndex}`,
          },
        },
      });
    };
  }

  closeDisclosure() {
    this.props.app.closeDisclosure();
  }

  render() {
    return (
      <div className="nested-component" style={{ height: '300px', backgroundColor: 'lightgrey', padding: '10px' }}>
        <div>
          <button className="disclose" onClick={this.disclose()}>Open Default Panel</button>
          <button className="disclose" onClick={this.disclose('small')}>Open Panel - Small</button>
          <button className="disclose" onClick={this.disclose('large')}>Open Panel - Large</button>
        </div>
      </div>
    );
  }
}

SlidePanelController.propTypes = {
  app: AppDelegate.propType,
};

export default SlidePanelController;
