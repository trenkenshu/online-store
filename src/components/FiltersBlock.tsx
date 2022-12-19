import React from 'react';
import Button from './Button';
import FilterWithList from './FilterWithList';
import FilterWithRange from './FilterWithRange';
import '../scss/FilterBlock.scss'

function FiltersBlock () {
  return (
    <div className='filters'>
      <div className='filters__btns'>
        <Button name='Reset'></Button>
        <Button name='Copy link'></Button>
      </div>
      <FilterWithList name='Category'/>
      <FilterWithList name='Brand'/>
      <FilterWithRange name='Price'/>
      <FilterWithRange name='Stock'/>
  </div>
  )
}

export default FiltersBlock;