import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ActionForm from '../../Components/Commons/ActionForm';

configure({ adapter: new Adapter() });

describe('ActionForm test', () => {
  let action = 'Create Resource';
  const wrapper = shallow(
    <ActionForm
      action={action}
      show
      onCreateResource={() => {}}
      onUpdateResource={() => {}}
    />
  );
  const instance = wrapper.instance();

  it('Displays ActionForm without Crashing', () => {
    const rendered = renderer.create(
      <ActionForm action={action} />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('Does Create Resource Action', () => {
  	action = 'Create Bucketlist';
  	wrapper.find('#actionButton').simulate('click');
  });
});
