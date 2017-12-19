import React from 'react';
import MultiSelectList from 'terra-list/lib/MultiSelectList';
import IconPerson from 'terra-icon/lib/icon/IconPerson';
import IconAlert from 'terra-icon/lib/icon/IconAlert';
import IconInformation from 'terra-icon/lib/icon/IconInformation';

import ItemView from 'terra-clinical-item-view';

const scrollerExample = () => {
  const display1 = <ItemView.Display icon={<IconPerson />} text="Asif Khan" />;
  const display2 = <ItemView.Display text="Care Position: Primary" />;
  const display3 = <ItemView.Display text="Room 100A" />;
  const display4 = <ItemView.Display text="Acuity: 5" />;
  const display5 = <ItemView.Display text="Start Time: 08-05-2016 12:00:00" />;
  const display6 = <ItemView.Display text="End Time: 08-05-2016 16:00:00" />;
  const displays = [display1, display2, display3, display4, display5, display6];
  const comment = <ItemView.Comment text="Faint red rash appeared at 08-05-2016 13:24:00" />;
  const accessoryStart = <IconAlert />;
  const accessoryEnd = <IconInformation />;

  const items = [];
  for (let i = 0; i < 15; i += 1) {
    items.push(
      <MultiSelectList.Item
        key={`${i}`}
        content={
          <ItemView
            displays={displays}
            layout="twoColumns"
            isTruncated
            textEmphasis="start"
            startAccessory={accessoryStart}
            endAccessory={accessoryEnd}
            comment={comment}
            style={{ backgroundColor: 'white', marginTop: '10px', marginBottom: '10px' }}
          />
        }
      />,
    );
  }

  return (
    <div>
      <div style={{ height: '40px', backgroundColor: 'lightGray', width: '100%' }}>
        Header Text
      </div>
      <MultiSelectList isDivided maxSelectionCount={2}>
        {items}
      </MultiSelectList>
    </div>
  );
};
export default scrollerExample;
