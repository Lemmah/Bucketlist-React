import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItem from '../../Components/Bucketlists/BucketlistItem';

it('Displays BucketlistItem without Crashing', () => {
	const rendered = renderer.create(
		<BucketlistItem />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})