import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import DataTable from '../../Components/Commons/DataTable';

configure({ adapter: new Adapter() });

const dummyItems = [
  {
    belongs_to: 138,
    date_created: 'Mon, 02 Oct 2017 20:14:10 GMT',
    date_modified: 'Mon, 02 Oct 2017 20:14:10 GMT',
    id: 119,
    name: 'Lemmah22'
  },
  {
    belongs_to: 138,
    date_created: 'Mon, 02 Oct 2017 20:14:17 GMT',
    date_modified: 'Mon, 02 Oct 2017 20:14:17 GMT',
    id: 120,
    name: 'Lemmah'
  }, null
];

it('Displays DataTable without Crashing', () => {
  const rendered = renderer.create(
    <DataTable />,
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});

describe('Displays Items on DataTable', () => {
  const wrapper = shallow(
    <DataTable
      items={dummyItems}
      formOpen={() => {}}
      deleteBucketlist={() => {}}
      deleteItem={() => {}}
      editItem={() => {}}
      editBucketlist={() => {}}
    />
  );
  const instance = wrapper.instance();

  it('Opens Action Form', () => {
    instance.formOpen('Create Bucketlist');
  });

  it('Deletes Bucketlist', () => {
    instance.deleteBucketlist();
  });

  it('Edits Bucketlist', () => {
    instance.editBucketlist();
  });

  it('Deletes Item', () => {
    instance.deleteItem(120);
  });

  it('Edits Item', () => {
    instance.editItem(119);
  });
})
;
