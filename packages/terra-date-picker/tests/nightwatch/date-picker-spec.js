/* eslint-disable no-unused-expressions */
// eslint-disable-next-line import/no-extraneous-dependencies
const resizeTo = require('terra-toolkit/lib/nightwatch/responsive-helpers').resizeTo;


  'Triggers onClickOutside when clicking outside of the picker to dismiss it': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/on-click-outside`);

    browser.windowSize('width', (result) => {
      if (result.value.width > browser.globals.breakpoints.small[0]) {
        browser.click('[class*="button"]');
        browser.waitForElementVisible('.react-datepicker', 1000);
        browser.click('input[name="terra-date-date-input-onclickoutside"]');

        browser.expect.element('h3').text.to.contain('Picker is dismissed after clicking outside');
      }
    });
  },

  'Displays the DatePicker inside the modal manager and dismisses after selecting a date': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/inside-modal`);

    browser.click('[class*="disclose"]');
    browser.expect.element('[class*="custom-input"] > [class*="button"]').to.be.present;
    browser.click('[class*="custom-input"] > [class*="button"]');

    browser.expect.element('.react-datepicker').to.be.present;

    browser.click('.react-datepicker__today-button');

    browser.expect.element('.react-datepicker').to.not.be.present;
  },

  'Displays the DatePicker inside the modal manager and dismisses when hitting Enter': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/inside-modal`);

    browser.click('[class*="disclose"]');
    browser.expect.element('[class*="custom-input"] > [class*="button"]').to.be.present;
    browser.click('[class*="custom-input"] > [class*="button"]');

    browser.expect.element('.react-datepicker').to.be.present;

    browser.keys(browser.Keys.ENTER);

    browser.expect.element('.react-datepicker').to.not.be.present;
  },

  'Displays the DatePicker inside the modal manager and dismisses when hitting Escape': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/inside-modal`);

    browser.click('[class*="disclose"]');
    browser.expect.element('[class*="custom-input"] > [class*="button"]').to.be.present;
    browser.click('[class*="custom-input"] > [class*="button"]');

    browser.expect.element('.react-datepicker').to.be.present;

    browser.keys(browser.Keys.ESCAPE);

    browser.expect.element('.react-datepicker').to.not.be.present;

    browser.assert.elementPresent('div[role="document"]');

    browser.keys(browser.Keys.ESCAPE);

    browser.assert.elementNotPresent('div[role="document"]');
  },

  'Displays the DatePicker inside the modal manager and dismisses when hitting Tab': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/inside-modal`);

    browser.click('[class*="disclose"]');
    browser.expect.element('[class*="custom-input"] > [class*="button"]').to.be.present;
    browser.click('[class*="custom-input"] > [class*="button"]');

    browser.expect.element('.react-datepicker').to.be.present;

    browser.keys(browser.Keys.TAB);

    browser.expect.element('.react-datepicker').to.not.be.present;
  },

  'Clears the default date and time on calendar button click when the default date is excluded': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/default-date-excluded`);

    browser.click('[class*="button"]');
    browser.expect.element('input[name="terra-date-date-input"]').to.have.attribute('value').equals('');
  },

  'Clears the default date and time on date input focus when the default date is excluded': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/default-date-excluded`);

    browser.click('input[name="terra-date-date-input"]');
    browser.expect.element('input[name="terra-date-date-input"]').to.have.attribute('value').equals('');
  },

  'Clears the default date and time on calendar button click when the default date is out of range': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/default-date-out-of-range`);

    browser.click('[class*="button"]');
    browser.expect.element('input[name="terra-date-date-input"]').to.have.attribute('value').equals('');
  },

  'Clears the default date and time on date input focus when the default date is out of range': (browser) => {
    browser.url(`${browser.launchUrl}/#/tests/date-picker-tests/default-date-out-of-range`);

    browser.click('input[name="terra-date-date-input"]');
    browser.expect.element('input[name="terra-date-date-input"]').to.have.attribute('value').equals('');
  },
});
