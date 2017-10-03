import React from 'react';
import renderer from 'react-test-renderer';
import PageLayout from '../../Components/Commons/PageLayout';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

const dummyCredentials = {
	"email" : "jnlemayian@gmail.com",
	"password": "easyPassword", 
}

const dummyAuthenticationInfo = {
    "message": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDcwMDkyMTcsImlhdCI6MTUwNzAwNTYxNywic3ViIjoxfQ.idObEdx7BfAOeKGmh8w80wk-hx5J-JhUgWbiYDqb1fE",
        "info": "You logged in successfully.",
        "user": "jnlemayian@gmail.com"
    }
}

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

const sampleItems = [
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

const dummyProps = {
	newBucketlist: sampleBucketlists[1],
	newBucketlistItem: sampleItems[1],
	authenticated: dummyAuthenticationInfo,
	registrationError: null, 
}

const dummyEmptyProps = {
	newBucketlist: null,
	newBucketlistItem: null,
	authenticated: dummyAuthenticationInfo,
	registrationError: null, 
}

it('Displays PageLayout without Crashing', () => {
	const rendered = renderer.create(
		<PageLayout />,
		);
	expect(rendered.toJSON()).toMatchSnapshot();
});

describe('Shows Dashboard if logged in', () => {
	const wrapper = mount(
		<PageLayout
	      newBucketlist={null}
	      newBucketlistItem={null}
	      authenticated={dummyAuthenticationInfo}
	      onRegister={()=> {}}
	      registrationError={()=> {}}
	      onCreateBucketlist={()=> {}}
	      onCreateBucketlistItem={()=> {}}
	  />
	);
	const instance = wrapper.instance();

	it('Does Set state when it Receives Props', () => {
		instance.componentWillReceiveProps(dummyProps);
		instance.componentWillReceiveProps(dummyEmptyProps);
	})

	/* Set mock Mounted state */
	instance.setState({
		token: dummyAuthenticationInfo.message.access_token,
		user: dummyAuthenticationInfo.message.user,
		bucketlists: sampleBucketlists,
		items: sampleItems,
		bucketlistOnFocus: sampleBucketlists[0],
		firstFocus: false,
	});

	it('Registers new User using Credentials', () => {
		instance.registerUser(dummyCredentials);
	});

	it('Creates Bucketlists', () => {
		const resourceUrl = '/bucketlists';
		const details = {
			'name' : 'Travel Round the World',
		}
		instance.createBucketlist(resourceUrl, details);
	})

	it('Creates Bucketlist Items', () => {
		const resourceUrl = '/bucketlists/138/items';
		const details = {
			'name' : 'Travel to Russia',
		}
		instance.createBucketlistItem(resourceUrl, details);
	})

	it('Updates Bucketlist item', () => {
		const details = "Travel to England";
		const itemOnFocus = sampleItems[0];
		instance.updateBucketlistItem(details, itemOnFocus);
	});

	it('Updates Bucketlist', () => {
		const details = "Travelling Round the World";
		instance.updateBucketlist(details);
	});

	it('Gets all Bucketlist items', () =>{
		const bucketlist = sampleBucketlists[0];
		instance.getAllBucketlistItems(bucketlist);
	})

	it('Deletes Bucketlist Item using Id', () => {
		instance.deleteBucketlistItem(119);
	});


	it('Deletes Bucketlist using Id', () => {
		instance.deleteBucketlist(139);
	});


})