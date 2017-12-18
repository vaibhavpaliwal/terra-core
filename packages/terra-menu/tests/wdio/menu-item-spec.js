/* global browser, describe, it, before, expect, Terra */
const viewports = Terra.viewports('tiny', 'huge');

describe('Menu Item', () => {
  describe('Menu Item-Default', () => {
    before(() => {
      browser.url('/#/tests/menu-item-tests/default');
    });

    Terra.should.matchScreenshot({ viewports });
    Terra.should.beAccessible({ viewports });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu Item-Selectable [${viewport}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-item-tests/selectable');
        browser.setViewportSize(viewport);
      });

      describe('Menu Item-Selectable Via Click', () => {
        it('is selected', () => {
          browser.click('.TestSelectableItem');
          expect(browser.getText('#isSelected')).to.contain('yes');
        });
        Terra.should.matchScreenshot('selected');
        Terra.should.beAccessible();

        it('is deselected', () => {
          browser.click('.TestSelectableItem');
          expect(browser.getText('#isSelected')).to.contain('no');
        });
        Terra.should.matchScreenshot('deselected');
        Terra.should.beAccessible();
      });

      describe('Menu Item-Selectable Via Enter', () => {
        it('is selected', () => {
          browser.keys('Enter');
          expect(browser.getText('#isSelected')).to.contain('yes');
        });
        Terra.should.matchScreenshot('selected');
        Terra.should.beAccessible();

        it('is deselected', () => {
          browser.keys('Enter');
          expect(browser.getText('#isSelected')).to.contain('no');
        });
        Terra.should.matchScreenshot('deselected');
        Terra.should.beAccessible();
      });
    });
  });

  describe('Menu Item-Disabled', () => {
    before(() => {
      browser.url('/#/tests/menu-item-tests/disabled');
    });

    Terra.should.matchScreenshot({ viewports });
    Terra.should.beAccessible({ viewports });

    // Does not check item when clicked
    browser.click('.TestDisabledItem');
    Terra.should.matchScreenshot({ viewports });
  });

  describe('Menu Item-Submenu Indicator', () => {
    before(() => {
      browser.url('/#/tests/menu-item-tests/submenu');
    });

    Terra.should.matchScreenshot({ viewports });
    Terra.should.beAccessible({ viewports });
  });

  describe('Menu Item-Wrapped Text', () => {
    before(() => {
      browser.url('/#/tests/menu-item-tests/wrapped-text');
    });

    Terra.should.matchScreenshot({ viewports });
    Terra.should.beAccessible({ viewports });
  });

  describe('Menu Item-Triggers onClick Function', () => {
    before(() => {
      browser.url('/#/tests/menu-item-tests/on-click');
    });

    it('starts with click number of 0', () => {
      expect(browser.getText('#clickNumber')).to.contain('0');
    });

    it('increments on Click', () => {
      browser.click('.TestOnClickItem');
      expect(browser.getText('#clickNumber')).to.contain('1');
    });

    it('increments on Enter', () => {
      browser.keys('Enter');
      expect(browser.getText('#clickNumber')).to.contain('2');
    });

    it('increments on Space', () => {
      browser.keys('Space');
      expect(browser.getText('#clickNumber')).to.contain('3');
    });
  });
});
