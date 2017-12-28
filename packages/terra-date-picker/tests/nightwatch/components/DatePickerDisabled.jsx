import React from 'react';
import Base from 'terra-base';
import DatePicker from '../../../src/DatePicker';

const locale = document.getElementsByTagName('html')[0].getAttribute('lang');

const DatePickerDisabled = () => (
  <Base locale={locale}>
    <DatePicker
      name="date-input"
      disabled
    />
  </Base>
);

export default DatePickerDisabled;
