import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlist from '../../Components/Bucketlists/Bucketlist';

it('Displays Bucketlist without Crashing', () => {
	const rendered = renderer.create(
		<Bucketlist />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})