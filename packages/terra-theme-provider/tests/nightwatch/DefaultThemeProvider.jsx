import React from 'react';

import ThemeProvider from '../../src/ThemeProvider';
import MockThemableComponent from './MockThemableComponent';

// eslint-disable-next-line class-methods-use-this
const getThemeableCSS = () => {
  // return document.querySelector('link[href*=terra-core]');
  const styleSheets = document.querySelectorAll('link[rel=stylesheet]');
  const styleSheetsArray = [];
  for (let i = 0; i < styleSheets.length; i += 1) {
    styleSheetsArray.push(styleSheets[i].href);
  }

  return styleSheetsArray;
};

const f = (g) => {
  return g();
}

export default () => {
  const theme = {
    '--terra-background-color': '#000',
    '--terra-color': '#fff',
    '--terra-display': 'flex',
  };

  return (
    <ThemeProvider id="themeProvider" theme={theme} getThemeableCSS={f(getThemeableCSS())}>
      <MockThemableComponent id="themedComponent">
        Theme Provider Test
      </MockThemableComponent>
    </ThemeProvider>
  );
};
