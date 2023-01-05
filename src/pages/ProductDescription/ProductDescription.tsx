/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import DBhandler from '../../api/database';
import Button from '../../components/Button';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import Error404 from '../Page404';
import './ProductDescription.scss';


const ProductDescription = () => {
    const {database} = useContext(StoreContext);
    const [productInfo, setProductInfo] = useState<IProduct>();
    const id = Number(useParams().id);
    const[err, setErr] = useState(false);
    if(id
        && !isNaN(id)
        && id >= 0
        && id <= 100) {
        const data = database.loadOne(new URL('https://dummyjson.com/products/'), id);
        useEffect( () => {
            data.then((readyProduct: IProduct) => {
                setProductInfo(readyProduct);
        }).catch((err: Error) => console.log(err.message));
        }, []);

    } else {
        useEffect(() => {
            setErr(true);
        }, []);
    }

    return (
           <main className="main">
                {err && (<Error404 />) }
                { productInfo && (<div className="product-page">
                    <div className="product-page__path">
                        <Link to="/" className="product-page__link">Store</Link>
                        <a className="product-page__link">{productInfo.category}</a>
                        <a className="product-page__link">{productInfo.brand}</a>
                        <a className="product-page__link">{productInfo.title}</a>
                    </div>
                    <div className="product-page__info">
                        <h2 className="product-page__name">{productInfo.title}</h2>
                        <div className="product-page__data">
                            <div className="product-page__images">
                                <div
                                    className="product-page__main-img"
                                    style={{background: `transparent url(${productInfo.thumbnail.toString()}) no-repeat center`,
                                        backgroundSize: `cover`,
                                        minWidth: `60%`,
                                        minHeight: `80%`}}>
                                </div>
                                <div className="product-page__other-imgs">{productInfo.images.map((el: URL) => 
                                    (<div className='product-page__other-image' style={{backgroundImage: `url(${el.toString()})`}}></div>)
                                )}</div>
                            </div>
                            <div className="product-page__details">
                                <div className="product-page__details-top">
                                    <div className="product-page__category">Category: {productInfo.category}</div>
                                    <div className="product-page__brand">Brand: {productInfo.brand}</div>
                                    <div className="product-page__discount">Discount: {productInfo.discountPercentage}</div>
                                    <div className="product-page__rating">Rating: {productInfo.rating}</div>
                                    <div className="product-page__stock">Stock: {productInfo.stock}</div>
                                    <div className="product-page__description">Description: {productInfo.description}</div>
                                </div>
                                <div className="product-page__details-bottom">
                                    <div className="product-page__price">{productInfo.price}€</div>
                                    <Button name="Add to Cart"></Button>
                                    <Button
                                        name="Buy now"
                                        onClick={() => {
                                            console.log('Buy now');
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </main>
    );
};

export default ProductDescription;
