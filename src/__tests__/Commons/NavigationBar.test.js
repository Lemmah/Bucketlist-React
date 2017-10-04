import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import NavigationBar from '../../Components/Commons/NavigationBar';

configure({ adapter: new Adapter() });

const dummyAuthenticationInfo = {
  message: {
    access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDcwMDkyMTcsImlhdCI6MTUwNzAwNTYxNywic3ViIjoxfQ.idObEdx7BfAOeKGmh8w80wk-hx5J-JhUgWbiYDqb1fE',
    info: 'You logged in successfully.',
    user: 'jnlemayian@gmail.com'
  }
};

it('Displays NavigationBar without Crashing', () => {
  const rendered = renderer.create(
    <NavigationBar />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

describe('<NavigationBar /> while Authenticated', () => {
  const wrapper = shallow(
    <NavigationBar
      authenticated={dummyAuthenticationInfo}
      onLogin={() => {}}
      loginError={() => {}}
      onLogout={() => {}}
    />
  );
  const instance = wrapper.instance();

  it('Logs out User', () => {
    instance.logout();
  });
});

describe('<NavigationBar /> with a login Error', () => {
  const wrapper = shallow(
    <NavigationBar
      authenticated={false}
      onLogin={() => {}}
      loginError={'Wrong Username or Password'}
      onLogout={() => {}}
    />
  );
  const instance = wrapper.instance();

  it('Logs in User', () => {
    // instance.loginUser();
  });
});
