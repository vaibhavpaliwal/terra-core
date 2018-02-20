/* global before, browser, Terra */

describe('Avatar', () => {
  describe('Default', () => {
    beforeEach(() => browser.url('/#/tests/avatar-tests/default'));

    Terra.should.beAccessible({ selector: '#default-avatar' });
    Terra.should.matchScreenshot({ selector: '#default-avatar' });
    Terra.should.themeEachCustomProperty({
      '--terra-avatar-background-color': 'rgba(0, 0, 0, 0.1)',
      '--terra-avatar-border': '0.07143rem solid rgb(28, 31, 33)',
      '--terra-avatar-box-shadow': 'inset 0 0.07143rem 0.2143rem 0 rgba(0, 0, 0, 0.3)',
      '--terra-avatar-font-size': '1.571rem',
      '--terra-avatar-size': '3.429rem',
      '--terra-avatar-line-height': '3.286rem',
    });

    it('Expect default to have avatar class', () => {
      expect(browser.getAttribute('#default-avatar', 'class')).contains('avatar');
    });
  });

  describe('Icon', () => {
    before(() => browser.url('/#/tests/avatar-tests/icon'));

    Terra.should.beAccessible({ selector: '#icon-avatar' });
    Terra.should.matchScreenshot({ selector: '#icon-avatar' });
    Terra.should.themeEachCustomProperty({
      '--terra-avatar-icon-color': 'rgb(0, 0, 0)',
    });
  });

  describe('Image', () => {
    before(() => browser.url('/#/tests/avatar-tests/image'));

    Terra.should.beAccessible({ selector: '#image-avatar' });
    Terra.should.matchScreenshot({ selector: '#image-avatar' });
  });

  describe('Initials', () => {
    before(() => browser.url('/#/tests/avatar-tests/initials'));

    Terra.should.beAccessible({ selector: '#initials-avatar' });
    Terra.should.matchScreenshot({ selector: '#initials-avatar' });
    Terra.should.themeEachCustomProperty({
      '--terra-avatar-font-color': 'rgb(0, 0, 0)',
    });
  });
});
