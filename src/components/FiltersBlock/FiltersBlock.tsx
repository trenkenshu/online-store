import React from 'react';
import Button from '../Button/Button';
import DualSlider from '../DualSlider';
import Filter from '../Filter';
import FilterItem from '../FilterItem';
import { IProducts } from '../interfaces/products';

import './FilterBlock.scss'

const FiltersBlock = (props: IProducts) => {
  const {products} = props;

  return (
    <div className='filters'>
      <div className='filters__btns'>
        <Button name='Reset'></Button>
        <Button name='Copy link'></Button>
      </div>
      <Filter name='Category'>
        <div className="filter__list">
          {/* {products.map((product):React.ReactNode => <FilterItem product={product} key={product.id}/>)} */}
        </div>
      </Filter>
      <Filter name='Brand'>
        <div className="filter__list">
        {/* {products.map((product):React.ReactNode => <FilterItem product={product} key={product.id}/>)} */}
        </div>
      </Filter>
      <Filter name='Price'>
        <DualSlider min={0} max={100}/>
      </Filter>
      <Filter name='Stock'>
        <DualSlider min={0} max={100}/>
      </Filter>
  </div>
  )
}

export default FiltersBlock;