/* eslint-disable import/no-extraneous-dependencies, import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-section-header/docs/README.md';
import { version } from 'terra-section-header/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import SectionHeaderSrc from '!raw-loader!terra-section-header/src/SectionHeader';

// Example Files
import DefaultSectionHeader from './DefaultSectionHeader';
import DefaultSectionHeaderSrc from '!raw-loader!./DefaultSectionHeader.jsx';

const Examples = () => (
  <div>
    <h2>Examples</h2>
    <DefaultSectionHeader />
  </div>
);

const SectionHeaderExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={SectionHeaderSrc} />
    <Examples />
  </div>
);

export default SectionHeaderExamples;
