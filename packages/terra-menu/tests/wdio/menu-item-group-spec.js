/* global browser, describe, it, before, expect, Terra */

describe('Menu Item Group', () => {
  before(() => {
    browser.url('/#/tests/menu-item-group-tests/default');
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu Item Group [${viewport.name}]`, () => {
      before(() => {
        browser.setViewportSize(viewport);
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();

      describe('Menu Item-Selectable Via Click', () => {
        it('selects Item 3', () => {
          browser.click('.TestGroupItem3');
          expect(browser.getText('#selected-index')).to.contain('2');
          Terra.should.beAccessible();
        });
        Terra.should.matchScreenshot('Item 3 Selected');

        it('selects Item 1 and deselects Item 3', () => {
          browser.click('.TestGroupItem1');
          expect(browser.getText('#selected-index')).to.contain('0');
        });
        Terra.should.matchScreenshot('Item 1 Selected');
      });

      describe('Menu Item-Selectable Via Keyboard Navigation', () => {
        it('selects Item 2 on Enter', () => {
          browser.keys(['Tab', 'Enter']);
          expect(browser.getText('#selected-index')).to.contain('1');
        });

        it('selects Item 3 on Space', () => {
          browser.keys(['Tab', 'Space']);
          expect(browser.getText('#selected-index')).to.contain('2');
        });
      });
    });
  });
});
