import React from 'react';
import ThemeProvider from '../../src/ThemeProvider';

describe('ThemeProvider', () => {
  const altTheme = {
    '--terra-Badge-backgroundColor--default': '#373d3f',
    '--terra-Badge-color--default': '#fff',
    '--terra-Badge-backgroundColor--primary': '#b10dc9',
    '--terra-Badge-color--primary': '#fff',
    '--terra-Badge-backgroundColor--secondary': '#0074d9',
    '--terra-Badge-color--secondary': '#fff',
  };

  const defaultRender = (
    <ThemeProvider altTheme={altTheme} getThemeableCSS={() => { document.querySelector('link[href*=terra-core]'); }}>
      <p>Themes inside</p>
    </ThemeProvider>
  );

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });
});
