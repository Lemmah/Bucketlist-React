import React from 'react';
import renderer from 'react-test-renderer';
import ActionForm from '../../Components/Commons/ActionForm';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';


describe('ActionForm test', () => {
	let action = 'Create Resource';
	const wrapper = shallow(
		<ActionForm
			action={action}
			show={true}
			onCreateResource={() => {}}
			onUpdateResource={() => {}} 
		/>
		);
	const instance = wrapper.instance();

  it('Displays ActionForm without Crashing', () => {
	const rendered = renderer.create(
		<ActionForm action={action}/>,
		);
	expect(rendered.toJSON()).toMatchSnapshot(); 
  });	

  it('Does Create Resource Action', () => {
  	action = "Create Bucketlist";
  	wrapper.find('#actionButton').simulate('click');
  })
});
