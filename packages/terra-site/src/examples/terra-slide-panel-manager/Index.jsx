/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-terra-slide-panel-manager/docs/README.md';
import { version } from 'terra-terra-slide-panel-manager/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import TerraSlidePanelManagerSrc from '!raw-loader!terra-terra-slide-panel-manager/src/TerraSlidePanelManager';

// Example Files

const TerraSlidePanelManagerExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={TerraSlidePanelManagerSrc} />
  </div>
);

export default TerraSlidePanelManagerExamples;
