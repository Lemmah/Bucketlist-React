import React, { Component } from 'react';
import ActionForm from './../Commons/ActionForm';
import FilteredList from './../Search/FilterList';


class Bucketlist extends Component {
  constructor() {
    super();
    this.state = {
      formShow: false,
    };

    this.formClose = this.formClose.bind(this);
    this.formOpen = this.formOpen.bind(this);
    this.createBucketlist = this.createBucketlist.bind(this);
    this.displayItems = this.displayItems.bind(this);
  }

  formClose() {
    this.setState({
      formShow: false,
    });
  }

  formOpen() {
    this.setState({
      formShow: true,
    });
  }

  displayItems(bucketlist) {
    this.props.getAllBucketlistItems(bucketlist);
  }

  createBucketlist(name) {
    const resourceUrl = '/bucketlists';
    const details = {
      name,
    };
    this.props.createBucketlist(resourceUrl, details);
    this.setState({
      formShow: false,
    });
  }

  displayBucketlists() {
    if (!this.props.bucketlists) {
      return (
        <table className="table table-hover table-sm table-striped">
          <thead>
            <tr>
              <th>Your Bucketlists</th>
              <th>
                <button
                  className="btn btn-success btn-xs"
                  onClick={this.formOpen}
                >Create New
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No Bucketlists -</td>
              <td>Start by creating some.
              </td>
            </tr>
            <tr>
              <td><br /></td>
              <td><br /></td>
            </tr>
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Your Bucketlists</th>
              <th>
                <button
                  className="btn btn-success btn-xs"
                  onClick={this.formOpen}
                >Create New
                </button>
              </th>
            </tr>
          </thead>
          <tbody />
        </table>
        <FilteredList
          formOpen={this.formOpen}
          bucketlists={this.props.bucketlists}
          displayItems={this.displayItems}
        />
      </div>
    );
  }


  render() {
    return (
      <div>
        {this.displayBucketlists()}
        <ActionForm
          action="Create Bucketlist"
          show={this.state.formShow}
          onHide={this.formClose}
          onCreateResource={this.createBucketlist}
        />
      </div>
    );
  }
}

export default Bucketlist;
