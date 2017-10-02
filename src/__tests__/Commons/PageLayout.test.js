import React from 'react';
import renderer from 'react-test-renderer';
import PageLayout from '../../Components/Commons/PageLayout';

it('Displays PageLayout without Crashing', () => {
	const rendered = renderer.create(
		<PageLayout />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})