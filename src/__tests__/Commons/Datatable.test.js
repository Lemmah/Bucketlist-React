import React from 'react';
import renderer from 'react-test-renderer';
import DataTable from '../../Components/Commons/DataTable';

it('Displays DataTable without Crashing', () => {
	const rendered = renderer.create(
		<DataTable />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})