/* global before, browser, Terra */

describe('Avatar', () => {
  describe('Default', () => {
    beforeEach(() => browser.url('/#/tests/avatar-tests/default'));

    Terra.should.beAccessible({ selector: '#default-avatar' });
    Terra.should.matchScreenshot({ selector: '#default-avatar' });
    Terra.should.themeEachCustomProperty({
      '--terra-avatar-background-color': 'rgba((85, 26, 139, 0.1)',
      '--terra-avatar-border': '0.07143rem solid rgb(85, 26, 139)',
      '--terra-avatar-box-shadow': 'inset 0 0.07143rem 0.2143rem 0 rgba(85, 26, 139, 0.3)',
      '--terra-avatar-size': '5rem',
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
      '--terra-avatar-icon-color': 'rgb(85,26,139)',
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
      '--terra-avatar-font-color': 'rgb(85,26,139)',
      '--terra-avatar-font-size': '2rem',
      '--terra-avatar-line-height': '5rem',
    });
  });
});
