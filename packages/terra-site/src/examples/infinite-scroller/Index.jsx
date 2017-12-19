/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-infinite-scroller/docs/README.md';
import { version } from 'terra-infinite-scroller/package.json';

// Component Source
/* eslint-disable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */
import InfiniteScrollerSrc from '!raw-loader!terra-infinite-scroller/src/InfiniteScroller';
import InfiniteScrollerItemSrc from '!raw-loader!terra-infinite-scroller/src/_ScrollerItem';
/* eslint-enable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */


// Example Files
import InfiniteScrollerExample from './InfiniteScrollerExample';

const InfiniteScrollerExamples = () => (
  <InfiniteScrollerExample />
);

export default InfiniteScrollerExamples;
