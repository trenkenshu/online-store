import React from 'react';
import FiltersBlock from '../components/FiltersBlock/FiltersBlock';
import ProductsBlock from '../components/ProductsBlock/ProductsBlock';
import '../scss/Catalog.scss'
import { IProducts } from '../components/interfaces/products';

const Catalog = (props:IProducts )  => {
  const {products} = props;
  console.log('catalog',props)
  return (
    <main className='main'>
      <div className="catalog">
        <FiltersBlock products={products}/>
        <ProductsBlock products={products}/>
      </div>
    </main>
  )
}

export default Catalog;