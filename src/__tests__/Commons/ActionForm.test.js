import React from 'react';
import renderer from 'react-test-renderer';
import ActionForm from '../../Components/Commons/ActionForm';

global.split = () => {};
describe('ActionForm test', () => {
	const action = '';
  it('Displays ActionForm without Crashing', () => {
	const rendered = renderer.create(
		<ActionForm action={action}/>,
		);
	expect(rendered.toJSON()).toMatchSnapshot(); 
  });	
});
