import React from 'react';

function FilterWithRange (props:{name: string}) {
  return (
    <div className='filter'>
      <h3 className="filter__name">{props.name}</h3>
          <div className="filter__data price__data">
            <div className="price__from"></div>
            <div className="price__to"></div>
          </div>
          <div className="price__input">

          </div>
    </div>
  )
}
export default FilterWithRange;