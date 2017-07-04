# Terra Theme Provider

This component provides a theme to all React components underneath itself via CSS custom properties. In the render tree all terra components will have access to the provided theme, even in legacy browsers that do not support CSS custom properties.

## What is a theme?
It is a plain javascript object which contains key / value pairs of CSS custom properties.

```js
const customTheme = {
  '--terra-Badge-backgroundColor--default': '#373d3f',
  '--terra-Badge-color--default': '#fff',
  '--terra-Badge-backgroundColor--primary': '#b10dc9',
  '--terra-Badge-color--primary': '#fff',
  '--terra-Badge-backgroundColor--secondary': '#0074d9',
  '--terra-Badge-color--secondary': '#fff',
};
```


## Getting Started

- Install with [npmjs](https://www.npmjs.com):
  - `npm install terra-theme-provider`

## Usage

```jsx
import React from 'react';
import ThemeProvider from 'terra-theme-provider';

const altTheme = {
  '--terra-Badge-backgroundColor--default': '#373d3f',
  '--terra-Badge-color--default': '#fff',
  '--terra-Badge-backgroundColor--primary': '#b10dc9',
  '--terra-Badge-color--primary': '#fff',
  '--terra-Badge-backgroundColor--secondary': '#0074d9',
  '--terra-Badge-color--secondary': '#fff',
};

<ThemeProvider theme={altTheme} getThemeableCSS={() => { document.querySelector('link[href*=terra-core]'); }}>
  <Badge>Default Theme</Badge>
  {' '}
  <Badge intent="primary">Primary Badge Theme</Badge>
  {' '}
  <Badge intent="secondary">Secondary Badge Theme</Badge>
</ThemeProvider>

```

## Component Features

* [Cross-Browser Support](https://github.com/cerner/terra-core/wiki/Component-Features#cross-browser-support)
* [Mobile Support](https://github.com/cerner/terra-core/wiki/Component-Features#mobile-support)
