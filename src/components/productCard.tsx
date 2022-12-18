import React from 'react';
import '../scss/productCard.scss'
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
        <button className="btn product__btn_add">Add to Cart</button>
        <button className="btn product__btn_details">Details</button>
      </div>
    </div>
  )
}

export default ProductCard;