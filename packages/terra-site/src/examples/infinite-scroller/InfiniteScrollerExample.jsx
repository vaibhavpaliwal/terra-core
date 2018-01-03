import React from 'react';
import InfiniteScroller from 'terra-infinite-scroller';
// import ScrollerItem from 'terra-infinite-scroller/lib/_ScrollerItem';
// import IconPerson from 'terra-icon/lib/icon/IconPerson';
// import IconAlert from 'terra-icon/lib/icon/IconAlert';
// import IconInformation from 'terra-icon/lib/icon/IconInformation';
// import ItemView from 'terra-clinical-item-view';

// import ModalIndex from '../modal-manager/Index';

// import DummyLoader from './DummyLoader';

import MockRows from './mock-chart/MockRows';
import MockTextInputs from './mock-chart/MockTextInputs';
import MockImages from './mock-chart/MockImages';
import MockGraph from './mock-chart/MockGraph';

class scrollerExample extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToFirstItem = this.scrollToFirstItem.bind(this);
    this.scrollToMiddleItem = this.scrollToMiddleItem.bind(this);
    this.scrollToSecondToLastItem = this.scrollToSecondToLastItem.bind(this);
    this.scrollToLastItem = this.scrollToLastItem.bind(this);
    this.clearScroll = this.clearScroll.bind(this);

    this.state = { visbleIndex: -1 };
  }

  scrollToFirstItem() {
    this.setState({ visbleIndex: 0 });
  }

  scrollToMiddleItem() {
    this.setState({ visbleIndex: 12 });
  }

  scrollToSecondToLastItem() {
    this.setState({ visbleIndex: 19 });
  }

  scrollToLastItem() {
    this.setState({ visbleIndex: 20 });
  }

  clearScroll() {
    this.setState({ visbleIndex: -1 });
  }

  render() {
    // const display1 = <ItemView.Display icon={<IconPerson />} text="Asif Khan" />;
  // const display2 = <ItemView.Display text="Care Position: Primary" />;
  // const display3 = <ItemView.Display text="Room 100A" />;
  // const display4 = <ItemView.Display text="Acuity: 5" />;
  // const display5 = <ItemView.Display text="Start Time: 08-05-2016 12:00:00" />;
  // const display6 = <ItemView.Display text="End Time: 08-05-2016 16:00:00" />;
  // const displays = [display1, display2, display3, display4, display5, display6];
  // const comment = <ItemView.Comment text="Faint red rash appeared at 08-05-2016 13:24:00" />;
  // const accessoryStart = <IconAlert />;
  // const accessoryEnd = <IconInformation />;

  // const items = [];
  // for (let i = 0; i < 2000; i += 1) {
  //   items.push(
  //     <ItemView
  //       displays={displays}
  //       layout="twoColumns"
  //       isTruncated
  //       textEmphasis="start"
  //       startAccessory={accessoryStart}
  //       endAccessory={accessoryEnd}
  //       comment={comment}
  //       style={{ backgroundColor: 'white', marginTop: '10px', marginBottom: '10px'}}
  //       key={`${i}`}
  //     />,
  //   );
  // }

  // const section = (
  //   <div>
  //     {itemView}
  //     {itemView}
  //     {itemView}
  //     {itemView}
  //     {itemView}
  //   </div>
  // );

  // const items = [];
  // for (let i = 0; i < 50; i += 1) {
  //   items.push(
  //     <ScrollerItem key={`ScrollerItem-${i}`}>
  //       {section}
  //     </ScrollerItem>,
  //   );
  // }

  // const items = [];
  // for (let i = 0; i < 80; i += 1) {
  //   // if (i % 26 === 0) {
  //   //   items.push(<DummyLoader isIFrame key={`${i}`} />);
  //   // } else {
  //   items.push(<DummyLoader key={`${i}`} />);
  //   // }
  // }

  // return (
  //   <div>
  //     <div style={{ height: '600px', width: '100%', position: 'relative', border: '1px solid black' }}>
  //       <InfiniteScroller>
  //         {items}
  //       </InfiniteScroller>
  //     </div>
  //   </div>
  // );

    return (
      <div>
        <button onClick={this.scrollToFirstItem}>index 0</button>
        <button onClick={this.scrollToMiddleItem}>index 12</button>
        <button onClick={this.scrollToSecondToLastItem}>index 19</button>
        <button onClick={this.scrollToLastItem}>index 20</button>
        <button onClick={this.clearScroll}>clear index</button>
        <div style={{ height: '600px', width: '100%', position: 'relative', border: '1px solid black' }}>
          <InfiniteScroller requestedVisbleIndex={this.state.visbleIndex}>
            <MockRows title="Chief Complaint" numberOfRows={1} />
            <MockRows title="Documents" numberOfRows={5} />
            <MockRows title="Vitals" numberOfRows={30} />
            <MockGraph title="Intake & Output" />
            <MockRows title="Problems" numberOfRows={100} />
            <MockRows title="Allergies" numberOfRows={25} />
            <MockRows title="Home Medications" numberOfRows={25} />
            <MockRows title="In-Office Medications" numberOfRows={20} />
            <MockRows title="Labs" numberOfRows={30} />
            <MockRows title="Diagnostics" numberOfRows={5} />
            <MockRows title="Pathologies" numberOfRows={5} />
            <MockImages title="Media Gallery" numberOfImages={30} />
            <MockRows title="Immunizations" numberOfRows={20} />
            <MockRows title="Social History" numberOfRows={50} />
            <MockRows title="Family History" numberOfRows={25} />
            <MockRows title="Procedure History" numberOfRows={100} />
            <MockRows title="Visit List" numberOfRows={6} />
            <MockTextInputs title="Subjective/HPI" />
            <MockTextInputs title="Review of Systems" />
            <MockTextInputs title="Objective/PE" />
            <MockTextInputs title="Assessment/Plan" />
          </InfiniteScroller>
        </div>
      </div>
    );
  }
}
export default scrollerExample;
