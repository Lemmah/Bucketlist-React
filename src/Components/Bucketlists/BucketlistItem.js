import React, { Component } from 'react'
import ActionForm from './../Commons/ActionForm'
import DataTable from './../Commons/DataTable'


class BucketlistItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      formShow: false,
      action: "Default Form",
      value: "",
      itemOnFocus: null,
      updatingResource: null,
    }

    this.formClose = this.formClose.bind(this);
    this.formOpen = this.formOpen.bind(this);
    this.createBucketlistItem = this.createBucketlistItem.bind(this);
    this.deleteBucketlist = this.deleteBucketlist.bind(this);
    this.deleteItem = this.deleteBucketlistItem.bind(this);
    this.editItem = this.editBucketlistItem.bind(this);
    this.updateBucketlistItem = this.updateBucketlistItem.bind(this);
    this.editBucketlist = this.editBucketlist.bind(this)
    this.checkResourceUpdate = this.checkResourceUpdate.bind(this)
  }

  formClose(){
    this.setState({
      formShow: false,
    })
  }

  formOpen(action){
    this.setState({
      action: action,
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

  editBucketlistItem(item){
    let action = "Update " + item.name
    this.setState({
      value: item.name,
      itemOnFocus: item,
      updatingResource: "bucketlistItem",
    })
    this.formOpen(action)
  }

  checkResourceUpdate(details){
    let resourceType = this.state.updatingResource;
    if(resourceType === "bucketlistItem"){
      this.updateBucketlistItem(details)
    } else {
      console.log("Bucketlist Update: ", details)
    }
  }

  updateBucketlistItem(details){
    const itemOnFocus = this.state.itemOnFocus
    this.props.updateBucketlistItem(details, itemOnFocus)
    this.formClose()
    this.setState({
      value: "",
      updatingResource: null,
    })
  }

  editBucketlist(){
    const bucketlist = this.props.bucketlist
    let action = "Update " + bucketlist.name
    this.setState({
      value: bucketlist.name,
    })
    this.formOpen(action)
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
    return (
      <DataTable 
        {...this.props} 
        formOpen={this.formOpen}
        deleteBucketlist={this.deleteBucketlist}
        deleteItem={this.deleteItem}
        editItem={this.editItem}
        editBucketlist={this.editBucketlist}
      />
    )
  }

  render () {
    return (
      <div>
        {this.displayBucketlistItem()}
        <ActionForm
          value={this.state.value}
          action={this.state.action} 
          show={this.state.formShow} 
          onHide={this.formClose}
          onCreateResource={this.createBucketlistItem}
          onUpdateResource={this.checkResourceUpdate}
        />
      </div>
    )
  }
}

export default BucketlistItem
