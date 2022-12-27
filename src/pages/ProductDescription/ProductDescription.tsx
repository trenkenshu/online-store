import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DBhandler from '../../api/database';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import { IProduct } from '../../interfaces/products';
import './ProductDescription.scss';


const ProductDescription = () => {
    // const [searchParams] = useSearchParams();
    // console.log('ProductDescription', useParams(), searchParams.entries(), parseInt(useParams().id));
    // let arr = [];
    // for (const entry of searchParams.entries()) {
    //     const [par, val] = entry;
    //     arr.push({
    //         name: par,
    //         value: val,
    //     });
    //   }
    //   console.table(arr);
    // const [cartName, setCartName] = useState('Add to Cart');
    const [productInfo, setProductInfo] = useState<IProduct>();
    const navigate = useNavigate();
    const id: number = Number(useParams().id);
    if(id && !isNaN(id) && id > 0 && id <= 100) {
        const db = new DBhandler;
        const data = db.loadOne(new URL('https://dummyjson.com/products/'), id);

        useEffect( () => {
            data.then((readyProduct: IProduct) => {
                setProductInfo(readyProduct);
                console.log(productInfo);
        });
        }, []);

    } else {
        useEffect(() => {
            return navigate('/notfound');
        }, []);
    }

    return (
        <Layout>
            <main className="main">
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
                                    style={{background: `transparent url(${productInfo.thumbnail}) no-repeat center`,
                                        backgroundSize: `cover`,
                                        minWidth: `60%`,
                                        minHeight: `80%`}}>
                                </div>
                                <div className="product-page__other-imgs">other-imgs</div>
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
                                            console.log('111');
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </main>
        </Layout>
    );
};

export default ProductDescription;
