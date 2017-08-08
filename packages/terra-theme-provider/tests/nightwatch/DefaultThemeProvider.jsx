import React from 'react';

import ThemeProvider from '../../src/ThemeProvider';
import MockThemableComponent from './MockThemableComponent';

export default () => {
  const theme = {
    '--terra-background-color': '#000',
    '--terra-color': '#fff',
    '--terra-display': 'flex',
  };

  return (
    <ThemeProvider id="themeProvider" theme={theme} getThemeableCSS={() => { document.querySelector('link[href*=terra-core]'); }}>
      <MockThemableComponent id="themedComponent">
        Theme Provider Test
      </MockThemableComponent>
    </ThemeProvider>
  );
};
