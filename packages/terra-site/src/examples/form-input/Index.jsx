/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-form-input/docs/README.md';
import { version } from 'terra-form-input/package.json';

import InputExamples from './InputExamples';
// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import InputSrc from '!raw-loader!terra-form-input/src/Input';

// Example Files

const FormInputExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={InputSrc} />
    <InputExamples />
  </div>
);

export default FormInputExamples;
