/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-infinite-scroller/docs/README.md';
import { version } from 'terra-infinite-scroller/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import InfiniteScrollerSrc from '!raw-loader!terra-infinite-scroller/src/InfiniteScroller';

// Example Files

const InfiniteScrollerExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={InfiniteScrollerSrc} />
  </div>
);

export default InfiniteScrollerExamples;
