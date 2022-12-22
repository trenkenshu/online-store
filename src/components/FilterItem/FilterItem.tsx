import React from 'react';
import IProductCard from '../interfaces/productCard';
import './FilterItem.scss';

const FilterItem = (/*props: IProductCard*/) => {
  // const {product} = props;

  return (
    <div className='filter__item'>
      <input type='checkbox'
      className='filter__checkbox'
      id=''
      ></input>
      <label className='filter__label' htmlFor=""></label>
      {/* {product.category} */}
    </div>
  )
}

export default FilterItem;