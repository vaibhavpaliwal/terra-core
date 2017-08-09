import React from 'react';
import ThemeProvider from '../../src/ThemeProvider';

describe('ThemeProvider', () => {
  const theme = {
    '--terra-badge-background-color-default': '#373d3f',
    '--terra-badge-color-default': '#fff',
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

  // Error Handling Test
  it('should throw error for required children', () => {
    try {
      shallow(<ThemeProvider />);
    } catch (e) {
      expect(e.message).toContain('The prop `children` is marked as required');
    }
  });

  it('should throw error for required getThemeableCSS', () => {
    try {
      shallow(<ThemeProvider>test</ThemeProvider>);
    } catch (e) {
      expect(e.message).toContain('The prop `getThemeableCSS` is marked as required');
    }
  });
});
