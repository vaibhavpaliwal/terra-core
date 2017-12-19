/* global browser, describe, it, before, expect, Terra */

describe('Menu', () => {
  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Default [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/default');
        browser.setViewportSize(viewport);
      });
      browser.click('#trigger-menu-button');

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Bounded [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/bounded');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      // Terra.should.beAccessible();

      it('opens submenu', () => {
        browser.click('.TestNestedMenu');
      });
      Terra.should.matchScreenshot('submenu');
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Small Height [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/small');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Medium Height [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/medium');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Large Height [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/large');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      // Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Non-Selectable [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/non-selectable');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Selectable [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/selectable');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
        browser.click('.TestGroupItem3');
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();
    });
  });

  Terra.viewports('tiny', 'huge').forEach((viewport) => {
    describe(`Menu-Selectable with Varying Items [${viewport.name}]`, () => {
      before(() => {
        browser.url('/#/tests/menu-tests/selectable-and-unselectable');
        browser.setViewportSize(viewport);
        browser.click('#trigger-menu-button');
      });

      Terra.should.matchScreenshot();
      Terra.should.beAccessible();

      it('maintains selection after menu has been reopened an item', () => {
        browser.click('.TestSelectableItem');
        browser.click('#trigger-menu-button');
      });
      Terra.should.matchScreenshot('selected item');
    });
  });

  });
});
