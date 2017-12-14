/* global browser, before, Terra */

const ignoredA11y = {
  // https://github.com/cerner/terra-core/issues/1058
  'button-name': { enabled: false },
  // https://github.com/cerner/terra-core/issues/1068
  'color-contrast': { enabled: false },
  // https://github.com/cerner/terra-core/issues/1068
  label: { enabled: false },
};

describe('Date Picker', () => {
  Terra.viewports('tiny', 'medium').forEach((viewport) => {
    describe('default', () => {
      beforeEach(() => {
        browser.url('/#/tests/date-picker-tests/default');
        browser.setViewportSize(viewport);
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
      });

      // NOTE: We can't take a screenshot of default value because it defaults
      // to todays date which means the screenshots will always differ.
      Terra.should.beAccessible({ rules: ignoredA11y });

      it('should default to today', () => {
        browser.keys('Enter');
        const defaultValue = browser.getValue('[name="terra-date-date-input"]');
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
        browser.click('.react-datepicker__today-button');
        const todayValue = browser.getValue('[name="terra-date-date-input"]');
        expect(defaultValue).to.equal(todayValue);
      });
    });

    describe('excluded dates', () => {
      before(() => {
        browser.url('/#/tests/date-picker-tests/exclude-dates');
        browser.setViewportSize(viewport);
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
      });

      Terra.should.beAccessible({ rules: ignoredA11y });
      Terra.should.matchScreenshot({ selector: 'body' });
    });

    describe('included dates', () => {
      before(() => {
        browser.url('/#/tests/date-picker-tests/exclude-dates');
        browser.setViewportSize(viewport);
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
      });

      Terra.should.beAccessible({ rules: ignoredA11y });
      Terra.should.matchScreenshot({ selector: 'body' });
    });

    describe('filtered dates', () => {
      before(() => {
        browser.url('/#/tests/date-picker-tests/filter-dates');
        browser.setViewportSize(viewport);
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
      });

      Terra.should.beAccessible({ rules: ignoredA11y });
      Terra.should.matchScreenshot({ selector: 'body' });
    });

    describe('date range', () => {
      before(() => {
        browser.url('/#/tests/date-picker-tests/min-max');
        browser.setViewportSize(viewport);
        browser.click('button').waitForExist('[name="terra-date-date-input"]');
      });

      Terra.should.beAccessible({ rules: ignoredA11y });
      Terra.should.matchScreenshot({ selector: 'body' });
    });

    describe('inside modal', () => {
      before(() => {
        browser.url('/#/tests/date-picker-tests/inside-modal');
        browser.setViewportSize(viewport);
        browser.click('#openDisclosure');
      });
    });
  });
 /*
  describe('onClickOutside', () => {
    before(() => {
      browser.url('/#/tests/date-picker-tests/on-click-outside');
      browser.setViewportSize(Terra.viewports('medium')[0]);
      browser.click('button').waitForExist('[name="terra-date-date-input"]');
    });

    it('should trigger an event when closed from clicking outside datepicker', () => {
      expect(browser.getText('#message')).to.equal('');
      browser.click('input[name="terra-date-date-input-onclickoutside"]');
      expect(browser.getText('#message')).to.equal('Picker is dismissed after clicking outside');
    });
  });*/

  describe('onChange', () => {
    before(() => browser.url('/#/tests/date-picker-tests/on-change'));

    it('Triggers onChange when a date value is cleared', () => {
      browser.setValue('input[name="terra-date-date-input-onchange"]', '07/12/2017');
      expect(browser.getText('#dateDisplay')).to.equal('2017-07-12T00:00:00+00:00');

      // Manually clear the date input -- clearValue command successfully clears the input value,
      // however chromedriver does not trigger the change event.
      browser.keys(Array.from(Array(10).keys()).map(() => 'Backspace'));

      expect(browser.getValue('input[name="terra-date-date-input-onchange"]')).to.equal('');
      expect(browser.getText('#dateDisplay')).to.equal('');
    });
  });

  describe('onChangeRaw', () => {
    before(() => browser.url('/#/tests/date-picker-tests/on-change-raw'));

    it('Triggers onChangeRaw when a date input value is changed', () => {
      browser.click('input[name="terra-date-date-input-onchangeraw"]').keys('07/12'.split());
      expect(browser.getText('#dateDisplay')).to.equal('07/12');

      browser.keys('/2017'.split());
      expect(browser.getText('#dateDisplay')).to.equal('07/12/2017');
    });
  });

  describe('onSelect', () => {
    before(() => browser.url('/#/tests/date-picker-tests/on-select'));

    it('Triggers onSelect when a date is selected from the picker', () => {
      browser.setValue('input[name="terra-date-date-input-onselect"]', '07/12/2017');
      expect(browser.getText('#dateDisplay')).to.equal('');

      browser.click('button');
      browser.click('[aria-label="day-12"]');

      expect(browser.getText('#dateDisplay')).to.equal('2017-07-12T00:00:00+00:00');
    });
  });
});
