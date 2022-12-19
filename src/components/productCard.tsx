import React from 'react';
import '../scss/productCard.scss'
import Button from './Button';
function ProductCard () {
  return(
    <div className='product__card'>
      <div className="product__name">name</div>
      <div className="product__img">img</div>
      <div className="product__info">
        <div className="product__category">product__category</div>
        <div className="product__brand">product__brand</div>
        <div className="product__price">product__price</div>
        <div className="product__discount">product__discount</div>
        <div className="product__rating">product__rating</div>
        <div className="product__stock">product__stock</div>
      </div>
      <div className="product__btns">
        <Button name="Add to Cart"></Button>
        <Button name="Details"></Button>
      </div>
    </div>
  )
}

export default ProductCard;