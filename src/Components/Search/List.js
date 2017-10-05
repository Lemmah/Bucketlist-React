import React from 'react';
import uuid from 'uuid';

/*
 * Will receive items in the props
*/
class List extends React.Component {
  
  displayItems = (item) => {
    this.props.displayItems(item);
  }
  render() {
    return (<ul className="list-group">
      {
        this.props.items.map(item =>
          (<li
            className="list-group-item bucketlist"
            style={{ cursor: 'pointer' }}
            data-category={item}
            key={uuid.v4()}
            onClick={this.displayItems.bind(this, item)}
          >{item.name}</li>))
      }
    </ul>);
  }
}

export default List;
