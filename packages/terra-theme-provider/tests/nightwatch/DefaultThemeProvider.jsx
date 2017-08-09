import React from 'react';
import ThemeProvider from '../../src/ThemeProvider';
import MockThemableComponent from './MockThemableComponent';

const defaultTheme = {
  '--terra-background-color': '#000',
  '--terra-color': '#fff',
  '--terra-display': 'table',
  '--terra-font-size': '3rem',
};


// Merge with default theme just the properties you want to override
const altTheme = Object.assign({}, defaultTheme, {
  '--terra-background-color': '#f00',
  '--terra-color': '#0f0',
  '--terra-display': 'inline',
  '--terra-font-size': '4rem',
});

const themes = { defaultTheme, altTheme };

class DefaultThemeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'defaultTheme',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getThemeableCSS = this.getThemeableCSS.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  getThemeableCSS() {
    // return document.querySelector('link[href*=terra-core]');
    const styleSheets = document.querySelectorAll('link[rel=stylesheet]');
    const styleSheetsArray = [];
    for (let i = 0; i < styleSheets.length; i += 1) {
      styleSheetsArray.push(styleSheets[i].href);
    }

    return styleSheetsArray;
  }

  handleSelectChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <form>
          <label htmlFor="theme">Theme Switcher</label>
          <select id="theme" name="theme" value={this.state.theme} onChange={this.handleSelectChange}>
            <option value="defaultTheme">Default Theme</option>
            <option value="altTheme">Alt Theme</option>
          </select>
        </form>
        <ThemeProvider id="themeProvider" theme={themes[this.state.theme]} getThemeableCSS={this.getThemeableCSS}>
          <MockThemableComponent id="themedComponent">
            Theme Provider Test
          </MockThemableComponent>
        </ThemeProvider>
      </div>
    );
  }
}

export default DefaultThemeProvider;
