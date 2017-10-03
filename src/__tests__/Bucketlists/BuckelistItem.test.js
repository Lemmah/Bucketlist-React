import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItem from '../../Components/Bucketlists/BucketlistItem';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

const dummyBucketlist = {
    "created_by": 1,
    "date_created": "Mon, 02 Oct 2017 20:10:40 GMT",
    "date_modified": "Mon, 02 Oct 2017 20:10:40 GMT",
    "id": 138,
    "name": "Lemmah"
}

const dummyItems = [
    {
        "belongs_to": 138,
        "date_created": "Mon, 02 Oct 2017 20:14:10 GMT",
        "date_modified": "Mon, 02 Oct 2017 20:14:10 GMT",
        "id": 119,
        "name": "Lemmah22"
    },
    {
        "belongs_to": 138,
        "date_created": "Mon, 02 Oct 2017 20:14:17 GMT",
        "date_modified": "Mon, 02 Oct 2017 20:14:17 GMT",
        "id": 120,
        "name": "Lemmah"
    }
]

const initialAppState = {
  formShow: false,
  action: "Default Form",
  value: "",
  itemOnFocus: null,
  updatingResource: null,
}


describe("<BucketlistItem />", () => {
	const wrapper = mount(
		<BucketlistItem 
			bucketlist={dummyBucketlist}
			items={dummyItems
		}
			createBucketlistItem={() => {}}
  		deleteBucketlist={() => {}}
  		deleteBucketlistItem={() => {}}
  		updateBucketlistItem={() => {}}
  		updateBucketlist={() => {}}
		/>
		);
	const instance = wrapper.instance();
	const empty = shallow(
		<BucketlistItem
			bucketlist={null}
			items={null}
		/>
		);
	const emptyInstance = empty.instance();

	it('Displays BucketlistItem without Crashing', () => {
		const rendered = renderer.create(
			<BucketlistItem />,
			);
		expect(rendered.toJSON()).toMatchSnapshot();
	})

	it('Conditionally Renders Bucketlist Items', () => {
		instance.displayBucketlistItem();
		emptyInstance.displayBucketlistItem();
	})

	it('Opens the Modal for an Action', () => {
		instance.setState({
			formShow: false,
		});
		instance.formOpen();
		expect(instance.state.formShow).toBe(true);
	})

	it('Form Close actually closes the Modal', () => {
		instance.setState({
			formShow: true,
		});
		instance.formClose();
		expect(instance.state.formShow).toBe(false);
	})

	it('Closes the Modal form after Action', () => {
		instance.setState({
			formShow: true,
		});
		instance.createBucketlistItem('Lemmah');
		expect(instance.state.formShow).toBe(false);
	})

	it('Deletes a Bucketlist Item onDelete', () => {
		instance.deleteBucketlistItem(120);
	})

	it('Deletes a Bucketlist onDelete', () => {
		instance.deleteBucketlist();
	})

	it('Edits a bucketlist item', () => {
		const item = dummyItems[0];
		instance.editBucketlistItem(item);
		const details = "Europe";
		instance.checkResourceUpdate(details);
	})

	it('Edits a bucketlist', () => {
		const bucketlist = dummyBucketlist;
		instance.editBucketlist(bucketlist);
		const details = "Travel";
		instance.checkResourceUpdate(details);
	})
})



