import React from 'react';

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
          key={item}
        >{item}</li>))
    }
  </ul>
);

export default List;
