import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import RegistrationForm from '../../Components/Authentication/RegistrationForm';

configure({ adapter: new Adapter() });

const wrapper = shallow(<RegistrationForm />);
const instance = wrapper.instance();

it('Displays RegistrationForm without Crashing', () => {
  const rendered = renderer.create(
    <RegistrationForm />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

it('Validates Password Correctly : Strong Password', () => {
  instance.setState({
    password: 'easyPassword'
  });
  const validationState = instance.getValidationState();
  expect(validationState[0]).toContain('success');
});

it('Validates Password Correctly : Soso Password', () => {
  instance.setState({
    password: 'easyPass'
  });
  const validationState = instance.getValidationState();
  expect(validationState[0]).toContain('warning');
});

it('Validates Password Correctly : Weak Password', () => {
  instance.setState({
    password: 'easy'
  });
  const validationState = instance.getValidationState();
  expect(validationState[0]).toContain('error');
});

it('Matches input Passwords : Mismatch', () => {
  instance.setState({
    check_pass: 'easyPassword',
    password: 'misMatchingPassword'
  });
  const checkPassMatch = instance.checkPasswordMatch();
  expect(checkPassMatch[0]).toContain('error');
});

it('Matches input Passwords : Matching', () => {
  instance.setState({
    check_pass: 'easyPassword',
    password: 'easyPassword'
  });
  const checkPassMatch = instance.checkPasswordMatch();
  expect(checkPassMatch[0]).toContain('success');
});
