import React from 'react';

const Item = ({
  match: {
    params: {id},
  },
}) => (
  <div className="Item">
    <h1>Item {id}</h1>
  </div>
);

export default Item;
