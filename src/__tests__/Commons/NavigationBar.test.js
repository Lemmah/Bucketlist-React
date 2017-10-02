import React from 'react';
import renderer from 'react-test-renderer';
import NavigationBar from '../../Components/Commons/NavigationBar';

it('Displays NavigationBar without Crashing', () => {
	const rendered = renderer.create(
		<NavigationBar />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})