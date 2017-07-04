/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import Badge from 'terra-badge';
import ReadMe from 'terra-theme-adapter/docs/README.md';
import { version } from 'terra-theme-adapter/package.json';
import SelectField from 'terra-form/lib/SelectField';


// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import ThemeAdapterSrc from '!raw-loader!terra-theme-adapter/src/ThemeAdapter';

// Example Files
import ThemeAdapter from 'terra-theme-adapter/src/ThemeAdapter';

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
  '--terra-Badge-backgroundColor--default': '#f00',
  '--terra-Badge-color--default': '#fff',
  '--terra-Badge-backgroundColor--primary': '#0f0',
  '--terra-Badge-color--primary': '#000',
  '--terra-Badge-backgroundColor--secondary': '#00f',
  '--terra-Badge-color--secondary': '#fff',
});

const themes = { defaultTheme, altTheme };

class ThemeAdapterExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'defaultTheme',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
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
        <Badge>Test</Badge>
        <ThemeAdapter variables={themes[this.state.theme]} getThemeableCSS={() => { document.querySelector('link[href*=terra-core]'); }}>
          <Badge>Default Theme</Badge>
          <Badge intent="primary">Primary Badge Theme</Badge>
          <Badge intent="secondary">Secondary Badge Theme</Badge>
        </ThemeAdapter>
      </div>
    );
  }
}

export default ThemeAdapterExamples;
