import React from 'react';
import Badge from 'terra-badge';
import SelectField from 'terra-form/lib/SelectField';
import ThemeProvider from 'terra-theme-provider/src/ThemeProvider';

const defaultTheme = {
  '--terra-Badge-fontSize--tiny': '0.5rem',
  '--terra-Badge-fontSize--small': '0.8rem',
  '--terra-Badge-fontSize--medium': '1rem',
  '--terra-Badge-fontSize--large': '1.4rem',
  '--terra-Badge-fontSize--huge': '1.7rem',
  '--terra-Badge-minWidth': '1.65em',
  '--terra-Badge-child--margin': '0.357em',
  '--terra-Badge-borderRadius': '0.25em',
  '--terra-Badge-display': 'inline-block',
  '--terra-Badge-fontWeight': '700',
  '--terra-Badge-lineHeight': '1',
  '--terra-Badge-paddingBottom': '0.5rem',
  '--terra-Badge-paddingLeft': '0.36rem',
  '--terra-Badge-paddingRight': '0.36rem',
  '--terra-Badge-paddingTop': '0.5rem',
  '--terra-Badge-textTransform': 'none',
  '--terra-Badge-backgroundColor--default': '#bcbfc0',
  '--terra-Badge-color--default': '#383f42',
  '--terra-Badge-backgroundColor--primary': '#004c76',
  '--terra-Badge-color--primary': '#fff',
  '--terra-Badge-backgroundColor--secondary': '#4e832b',
  '--terra-Badge-color--secondary': '#fff',
  '--terra-Badge-backgroundColor--positive': '#4e832b',
  '--terra-Badge-color--positive': '#fff',
  '--terra-Badge-backgroundColor--negative': '#bc0203',
  '--terra-Badge-color--negative': '#fff',
  '--terra-Badge-backgroundColor--warning': '#da3b03',
  '--terra-Badge-color--warning': '#fff',
  '--terra-Badge-backgroundColor--info': '#004c76',
  '--terra-Badge-color--info': '#fff',
};

// Merge with default theme just the properties you want to override
const altTheme = Object.assign({}, defaultTheme, {
  '--terra-Badge-backgroundColor--default': '#373d3f',
  '--terra-Badge-color--default': '#fff',
  '--terra-Badge-backgroundColor--primary': '#b10dc9',
  '--terra-Badge-color--primary': '#fff',
  '--terra-Badge-backgroundColor--secondary': '#0074d9',
  '--terra-Badge-color--secondary': '#fff',
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
    return document.querySelector('link[href*=terra-core]');
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
        </ThemeProvider>
      </div>
    );
  }
}

export default DefaultThemeProvider;
