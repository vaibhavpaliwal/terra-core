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

  'Displays a themable component with themed color': (browser) => {
    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/theme-provider-tests/default`);
    browser
      .assert.visibileElementsCount('div', 2)

    // browser.pause(1000);

    // console.log(window);
    // console.log(window.document);
    // console.log(document);

    // const elem1 = window.document.getElementById('themedComponent');
    // const style = window.getComputedStyle(elem1, null);

    // expect(2).to.equal(2);
    // expect(3).to.equal(2);

    //browser.assert.cssProperty('#themedComponent', 'display', 'flex'); // Browser computes #fff to rgba(255, 255, 255, 1)
  },

  // 'Displays a themable component with themed background color': (browser) => {
  //   browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/#/tests/theme-provider-tests/default`);
  //   browser.assert.cssProperty('#themedComponent', 'background-color', 'rgba(0, 0, 0, 1)'); // Browser computes #000 to rgba(0, 0, 0, 1)
  // },
};
