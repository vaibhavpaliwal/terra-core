import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-date-time-picker/docs/README.md';
import { version } from 'terra-date-time-picker/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import DateTimePickerSrc from '!raw-loader!terra-date-time-picker/src/DateTimePicker';
// Example Files
import DateTimePickerDefault from './DateTimePickerDefaultDate';

const DateTimePickerExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={DateTimePickerSrc} />
    <h2 id="default">Default</h2>
    <DateTimePickerDefault />
    <br />
    <br />
  </div>
);

export default DateTimePickerExamples;
