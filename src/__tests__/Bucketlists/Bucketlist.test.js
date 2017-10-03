import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlist from '../../Components/Bucketlists/Bucketlist';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

const sampleBucketlists = [
      {
          "created_by": 1,
          "date_created": "Mon, 02 Oct 2017 20:10:40 GMT",
          "date_modified": "Mon, 02 Oct 2017 20:10:40 GMT",
          "id": 138,
          "name": "Lemmah"
      },
      {
          "created_by": 1,
          "date_created": "Mon, 02 Oct 2017 20:10:48 GMT",
          "date_modified": "Mon, 02 Oct 2017 20:10:48 GMT",
          "id": 139,
          "name": "Lemmah22"
      },
      null
  ]

describe("<Bucketlist />", () => {
	const wrapper = shallow(
		<Bucketlist 
			createBucketlist={() => {}}
			getAllBucketlistItems={() => {}}
			bucketlists={sampleBucketlists}
		/>
		);
	const instance = wrapper.instance();
	const empty = shallow(
		<Bucketlist
			bucketlists={null}
		/>
		);
	const emptyInstance = empty.instance();

	it('Displays Bucketlist without Crashing', () => {
		const rendered = renderer.create(
			<Bucketlist />,
			);
		expect(rendered.toJSON()).toMatchSnapshot();
	})

	it('Displays Bucketlist Items', () => {
		instance.displayItems('Lemmah')
	})

	it('Conditionally Renders Bucketlists', () => {
		instance.displayBucketlists();
		emptyInstance.displayBucketlists();
	})

	it('Opens the Modal for an Action', () => {
		instance.setState({
			formShow: false,
		});
		instance.formOpen();
		expect(instance.state.formShow).toBe(true);
	})

	it('Form Close actually closes the Modal,', () => {
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
		instance.createBucketlist('Lemmah');
		expect(instance.state.formShow).toBe(false);
	})
})



