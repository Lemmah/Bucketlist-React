import React from 'react';
import uuid from 'uuid';

/*
 * Will receive items in the props
*/
const List = props => (
  <ul className="list-group">
    {
      props.items.map(item =>
        (<li
          className="list-group-item"
          data-category={item}
          key={uuid.v4()}
        >{item.name}</li>))
    }
  </ul>
);

export default List;
