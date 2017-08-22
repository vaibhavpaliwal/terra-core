import React from 'react';
import moment from 'moment';
import DateTimePickerExampleTemplate from './DateTimePickerExampleTemplate';

const DateTimePickerExample = () => (
  <DateTimePickerExampleTemplate
    minDate={moment().format()}
    maxDate={moment().add(6, 'days').format()}
  />
);

export default DateTimePickerExample;
