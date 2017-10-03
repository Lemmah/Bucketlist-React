import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('Displays App without Crashing', () => {
	const rendered = renderer.create(
		<App />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})