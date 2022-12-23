import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import { IProduct } from '../../interfaces/products';
import '../scss/ProductDescriptionPage.scss';

const ProductDescription = (props: IProduct) => {
    console.log('ProductDescriptionPage', props);
    const [cartName, setCartName] = useState('Add to Cart');

    return (
        <main className="main">
            <div className="product-page">
                <div className="product-page__path">
                    <a className="product-page__link">Store</a>
                    <a className="product-page__link">{props.category}</a>
                    <a className="product-page__link">{props.brand}</a>
                    <a className="product-page__link">{props.title}</a>
                </div>
                <div className="product-page__info">
                    <h2 className="product-page__name">{props.title}</h2>
                    <div className="product-page__data">
                        <div className="product-page__images">
                            <div className="product-page__main-img">main-img</div>
                            <div className="product-page__other-imgs">other-imgs</div>
                        </div>
                        <div className="product-page__details">
                            <div className="product-page__details-top">
                                {/* <div className="product-page__item">
                    <h3 className="product-page__title">category</h3>
                    <p className="product-page__value"></p>
                  </div> */}
                                <div className="product-page__category">Category: {props.category}</div>
                                <div className="product-page__brand">Brand: {props.brand}</div>
                                <div className="product-page__discount">Discount: {props.discountPercentage}</div>
                                <div className="product-page__rating">Rating: {props.rating}</div>
                                <div className="product-page__stock">Stock: {props.stock}</div>
                                <div className="product-page__description">Description: {props.description}</div>
                            </div>
                            <div className="product-page__details-bottom">
                                <div className="product-page__price">{props.price}€</div>
                                <Button name="Add to Cart"></Button>
                                <Button
                                    name="Buy now"
                                    onClick={() => {
                                        console.log('111');
                                    }}
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDescription;
