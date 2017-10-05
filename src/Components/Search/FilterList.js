import React, { Component } from 'react';
import List from './List';

class FilteredList extends Component {
  constructor () {
    super();
    this.state = {
      initialItems: [],
      items: []
    }
  }

  filterList = (event) => {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
  }

  displayItems = (bucketlist) => {
    this.props.displayItems(bucketlist);
  }

  componentWillMount(){
    this.setState({
      initialItems: this.props.bucketlists,
    });
  }

  componentDidMount () {
    this.setState({ items: this.state.initialItems })
  }

  render () {
    return (
      <div className="filter-list">
        <form>
          <div className="form-group">
            <input type="text" className="form-control form-control-lg" placeholder="Search" onChange={this.filterList} />
          </div>
        </form>
        <List 
          items={this.state.items}
          displayItems={this.displayItems}
        />
      </div>
    );
  }
}

export default FilteredList;