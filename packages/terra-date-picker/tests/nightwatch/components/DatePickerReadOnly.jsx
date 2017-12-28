import React from 'react';
import Base from 'terra-base';
import DatePicker from '../../../src/DatePicker';

const locale = document.getElementsByTagName('html')[0].getAttribute('lang');

const DatePickerReadOnly = () => (
  <Base locale={locale}>
    <DatePicker
      name="date-input"
      readOnly
    />
  </Base>
);

export default DatePickerReadOnly;
