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

  componentWillMount(){
    console.log("Will Mount", this.props.bucketlists);
    this.setState({
      initialItems: this.props.bucketlists,
    });
  }

  componentDidMount () {
    console.log("Did Mount", this.state.initialItems);
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
        <List items={this.state.items} />
      </div>
    );
  }
}

export default FilteredList;