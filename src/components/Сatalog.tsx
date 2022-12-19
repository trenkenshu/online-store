import React from 'react';
import FiltersBlock from './FiltersBlock';
import ProductsBlock from './ProductsBlock';
import '../scss/Catalog.scss'

function Catalog() {
  return (
    <main className='main'>
      <div className='main__container container'>
        <FiltersBlock/>
        <ProductsBlock/>
      </div>
    </main>
  )
}

export default Catalog;