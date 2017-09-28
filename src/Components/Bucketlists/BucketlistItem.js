import React, { Component } from 'react'
import ActionForm from './../Commons/ActionForm'
import DataTable from './../Commons/DataTable'


class BucketlistItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      formShow: false,
    }

    this.formClose = this.formClose.bind(this);
    this.formOpen = this.formOpen.bind(this);
    this.createBucketlistItem = this.createBucketlistItem.bind(this);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.deleteItem = this.deleteBucketlistItem.bind(this);
  }

  formClose(){
    this.setState({
      formShow: false,
    })
  }

  formOpen(){
    this.setState({
      formShow: true,
    })
  }

  deleteBucketlist(){
    const bucketlistId = this.props.bucketlist.id
    this.props.deleteBucketlist(bucketlistId)
  }

  deleteBucketlistItem(id){
    this.props.deleteBucketlistItem(id)
  }

  createBucketlistItem(name){
    const resourceUrl = "/bucketlists/"+this.props.bucketlist.id+"/items"
    let details = {
      "name": name,
    }
    this.props.createBucketlistItem(resourceUrl, details)
    this.setState({
      formShow: false,
    })
  }

  displayBucketlistItem () {
    return <DataTable 
              {...this.props} 
              formOpen={this.formOpen}
              deleteBucketlist={this.deleteBucketlist}
              deleteItem={this.deleteItem}
            />
  }

  render () {
    return (
      <div>
        {this.displayBucketlistItem()}
        <ActionForm
          action='Add Activity' 
          show={this.state.formShow} 
          onHide={this.formClose}
          onCreateResource={this.createBucketlistItem}
        />
      </div>
    )
  }
}

export default BucketlistItem
