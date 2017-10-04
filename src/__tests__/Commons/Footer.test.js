import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../../Components/Commons/Footer';

it('Displays footer without crashing', () => {
  const rendered = renderer.create(
    <Footer />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
