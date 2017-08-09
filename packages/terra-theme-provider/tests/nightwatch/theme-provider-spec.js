/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const screenshot = require('terra-toolkit').screenshot;

module.exports = {
  before: (browser, done) => {
    browser.resizeWindow(browser.globals.width, browser.globals.height, done);
  },

  afterEach: (browser, done) => {
    screenshot(browser, 'terra-theme-provider', done);
  },

  'Displays a default theme-provider': (browser) => {
    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/theme-provider-tests/default`);
    browser.assert.elementPresent('#themeProvider');
    browser.assert.elementPresent('#themedComponent');
  },

  'Displays a themed component': (browser) => {
    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/theme-provider-tests/default`)
      .assert.cssProperty('#themedComponent', 'background-color', 'rgba(0, 0, 0, 1)') // Browser computes #000 to rgba(0, 0, 0, 1)
      .assert.cssProperty('#themedComponent', 'color', 'rgba(255, 255, 255, 1)') // Browser computes #000 to rgba(0, 0, 0, 1)
      .assert.cssProperty('#themedComponent', 'display', 'table') // Browser computes #000 to rgba(0, 0, 0, 1)
      .assert.cssProperty('#themedComponent', 'font-size', '48px');
  },

  'Displays an updated themed component': (browser) => {
    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/theme-provider-tests/default`)
      .click('select[id="theme"] option[value="altTheme"]')
      .assert.cssProperty('#themedComponent', 'background-color', 'rgba(255, 0, 0, 1)') // Browser computes #f00 to rgba(255, 0, 0, 1)
      .assert.cssProperty('#themedComponent', 'color', 'rgba(0, 255, 0, 1)') // Browser computes #0f0 to rgba(0, 255, 0, 1)
      .assert.cssProperty('#themedComponent', 'display', 'inline')
      .assert.cssProperty('#themedComponent', 'font-size', '64px');
  },
};
