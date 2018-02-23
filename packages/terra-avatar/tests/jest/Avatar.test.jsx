import React from 'react';
import Avatar from '../../src/Avatar';
import exampleProfilePhoto from '../assets/150x150.jpg';

describe('Avatar', () => {
  // Snapshot Tests
  it('should render user avatar when variant is user', () => {
    const avatar = <Avatar variant="user" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render facility avatar when variant is facility', () => {
    const avatar = <Avatar variant="facility" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render intials avatar when initials are passed in', () => {
    const avatar = <Avatar initials="JS" variant="user" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render image avatar when image is passed in', () => {
    const avatar = <Avatar image={exampleProfilePhoto} alt="placeholder" variant="user" />;
    const wrapper = render(avatar);
    expect(wrapper).toMatchSnapshot();
  });
});
