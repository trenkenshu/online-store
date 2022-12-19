import React from 'react';

function FilterWithList (props:{name: string}) {
  return (
    <div className='filter'>
      <h3 className="filter__name">{props.name}</h3>
      <div className="filter__list">
       {/* map from array for label and checkbox */}
      </div>
    </div>
  )
}
export default FilterWithList;