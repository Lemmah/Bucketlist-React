import React, { Component } from 'react';
import List from './List';

class FilteredList extends Component {
  constructor () {
    super();
    this.state = {
      initialItems: [
        "Apples",
        "Broccoli",
        "Chicken",
        "Duck",
        "Eggs",
        "Fish",
        "Granola",
        "Hash Browns",
        "aaaapp"
      ],
      items: []
    }
  }

  filterList = (event) => {
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ items: updatedList });
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
        <List items={this.state.items} />
      </div>
    );
  }
}