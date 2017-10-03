import React from 'react';
import renderer from 'react-test-renderer';
import RegistrationForm from '../../Components/Authentication/RegistrationForm';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

const wrapper = shallow(<RegistrationForm />);
const instance = wrapper.instance()

it('Displays RegistrationForm without Crashing', () => {
	const rendered = renderer.create(
		<RegistrationForm />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
})

it('Validates Password Correctly : Strong Password', () => {
	instance.setState({
		password: 'easyPassword'
	});
	let validationState = instance.getValidationState();
	expect(validationState[0]).toContain('success');
})

it('Validates Password Correctly : Soso Password', () => {
	instance.setState({
		password: 'easyPass'
	});
	let validationState = instance.getValidationState();
	expect(validationState[0]).toContain('warning');
})

it('Validates Password Correctly : Weak Password', () => {
	instance.setState({
		password: 'easy'
	});
	let validationState = instance.getValidationState();
	expect(validationState[0]).toContain('error');
})

it('Matches input Passwords : Mismatch', () => {
	instance.setState({
		check_pass: 'easyPassword',
		password: 'misMatchingPassword'
	});
	let checkPassMatch = instance.checkPasswordMatch();
	expect(checkPassMatch[0]).toContain('error');
})

it('Matches input Passwords : Matching', () => {
	instance.setState({
		check_pass: 'easyPassword',
		password: 'easyPassword'
	});
	let checkPassMatch = instance.checkPasswordMatch();
	expect(checkPassMatch[0]).toContain('success');
})