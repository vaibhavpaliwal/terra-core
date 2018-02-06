/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-avatar/docs/README.md';
import { version } from 'terra-avatar/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import AvatarSrc from '!raw-loader!terra-avatar/src/Avatar';

// Example Files

const AvatarExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={AvatarSrc} />
  </div>
);

export default AvatarExamples;
