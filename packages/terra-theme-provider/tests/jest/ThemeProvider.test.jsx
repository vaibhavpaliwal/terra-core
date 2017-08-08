import React from 'react';
import ThemeProvider from '../../src/ThemeProvider';

describe('ThemeProvider', () => {
  const theme = {
    '--terra-badge-background-color-default': '#373d3f',
    '--terra-badge-color-default': '#fff',
    '--terra-badge-background-color-primary': '#b10dc9',
    '--terra-badge-color-primary': '#fff',
    '--terra-badge-background-color-secondary': '#0074d9',
    '--terra-badge-color-secondary': '#fff',
  };

  const defaultRender = (
    <ThemeProvider theme={theme} getThemeableCSS={() => { document.querySelector('link[href*=terra-core]'); }}>
      <p>Child content</p>
    </ThemeProvider>
  );

  // Snapshot Tests
  it('should shallow render a theme provider component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a theme provider component', () => {
    const wrapper = render(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });
});
