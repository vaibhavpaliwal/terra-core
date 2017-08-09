import React from 'react';
import Badge from 'terra-badge';
import SelectField from 'terra-form/lib/SelectField';
import ThemeProvider from '../../src/ThemeProvider';
import MockThemableComponent from './MockThemableComponent';


const defaultTheme = {
  '--terra-badge-font-size-tiny': '0.5rem',
  '--terra-badge-font-size-small': '0.8rem',
  '--terra-badge-font-size-medium': '1rem',
  '--terra-badge-font-size-large': '1.4rem',
  '--terra-badge-font-size-huge': '1.7rem',
  '--terra-badge-min-width': '1.65em',
  '--terra-badge-child-margin': '0.357em',
  '--terra-badge-border-radius': '0.25em',
  '--terra-badge-display': 'inline-block',
  '--terra-badge-font-weight': '700',
  '--terra-badge-line-height': '1',
  '--terra-badge-padding-bottom': '0.5rem',
  '--terra-badge-padding-left': '0.36rem',
  '--terra-badge-padding-right': '0.36rem',
  '--terra-badge-padding-top': '0.5rem',
  '--terra-badge-text-transform': 'none',
  '--terra-badge-background-color-positive': '#4e832b',
  '--terra-badge-color-positive': '#fff',
  '--terra-badge-background-color-negative': '#bc0203',
  '--terra-badge-color-negative': '#fff',
  '--terra-badge-background-color-warning': '#da3b03',
  '--terra-badge-color-warning': '#fff',
  '--terra-badge-background-color-info': '#004c76',
  '--terra-badge-color-info': '#fff',
  '--terra-background-color': '#000',
  '--terra-color': '#fff',
  '--terra-display': 'block',
};

// Merge with default theme just the properties you want to override
const altTheme = Object.assign({}, defaultTheme, {
  '--terra-badge-background-color-default': '#f00',
  '--terra-badge-color-default': '#fff',
  '--terra-badge-background-color-primary': '#0f0',
  '--terra-badge-color-primary': '#fff',
  '--terra-badge-background-color-secondary': '#00f',
  '--terra-badge-color-secondary': '#fff',
  '--terra-background-color': '#f00',
  '--terra-color': '#0f0',
  '--terra-display': 'flex',
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
          <SelectField
            choices={['defaultTheme', 'altTheme']}
            name="theme"
            label="Theme Switcher"
            value={this.state.theme}
            onChange={this.handleSelectChange}
          />
        </form>
        <ThemeProvider theme={themes[this.state.theme]} getThemeableCSS={this.getThemeableCSS}>
          <Badge>Default Theme</Badge>
          {' '}
          <Badge intent="primary">Primary Badge Theme</Badge>
          {' '}
          <Badge intent="secondary">Secondary Badge Theme</Badge>
          <MockThemableComponent id="themedComponent">
            Theme Provider Test
          </MockThemableComponent>
        </ThemeProvider>
      </div>
    );
  }
}

export default DefaultThemeProvider;
