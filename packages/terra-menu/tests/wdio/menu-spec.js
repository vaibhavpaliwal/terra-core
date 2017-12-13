/* global browser, describe, it, expect, Terra */
const viewports = Terra.viewports('tiny', 'huge');

describe('Menu', () => {
  describe('Default', () => {
    beforeEach(() => {
      browser.url('/#/tests/menu-tests/default');
      browser.click('#default-button');
    });

    Terra.should.beAccessible();
    Terra.should.matchScreenshot({ viewports });
  });
});
