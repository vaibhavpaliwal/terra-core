import React from 'react';
import Avatar from '../../src/Avatar';
import IconPerson from '../../../terra-icon/lib/icon/IconPerson';
import exampleProfilePhoto from '../assets/150x150.jpg';

describe('Avatar', () => {
  const defaultRender = <Avatar />;

  // Snapshot Tests
  it('should render a default component', () => {
    const wrapper = shallow(defaultRender);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render intials avatar when initials are passed in', () => {
    const avatar = <Avatar initials="JS" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render icon avatar when icon is passed in', () => {
    const avatar = <Avatar icon={<IconPerson />} />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render image avatar when image is passed in', () => {
    const avatar = <Avatar image={exampleProfilePhoto} alt="placeholder" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });
});
