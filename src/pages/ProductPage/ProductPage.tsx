import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { StoreContext } from '../../context';
import { IProduct } from '../../interfaces/products';
import Error404 from '../Page404';
import './ProductPage.scss';

const ProductPage = () => {
    const { cart, database, setModal, addToCart, dropFromCart, setTotalProducts, setTotalSum } =
        useContext(StoreContext);
    const [product, setProduct] = useState<IProduct>();
    const [gal, setGal] = useState<string[]>([]);
    const id = Number(useParams().id);
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    if (id && !isNaN(id) && id >= 0 && id <= 100) {
        const data = database.loadOne(new URL('https://dummyjson.com/products/'), id);
        useEffect(() => {
            data.then((readyProduct: IProduct) => {
                const allImgsPromices: Promise<Response>[] = [];
                for (let i = 0; i < readyProduct.images.length; i++) {
                    allImgsPromices.push(fetch(readyProduct.images[i]));
                }
                setProduct(readyProduct);
                return Promise.all(allImgsPromices);
            })
                .then((imgsLoaded: Response[]) => {
                    //console.log(imgsLoaded.toString());
                    const uniqueImgs: string[] = [];
                    const uniqueHeaders: string[] = [];
                    imgsLoaded.forEach((el) => {
                        const header = el.headers.get('content-length');
                        if (header && !uniqueHeaders.includes(header.toString())) {
                            uniqueHeaders.push(header.toString());
                            uniqueImgs.push(el.url);
                        }
                        setGal(uniqueImgs);
                    });
                })
                .catch((err: Error) => console.log(err.message));
        }, []);
    } else {
        useEffect(() => {
            setErr(true);
        }, []);
    }
    const [inCart, setIncart] = useState(cart.currentProducts.some((el) => el.product.id === id));
    // const thumbnail = product?.thumbnail.toString() as string;
    const [mainImage, setMainImage] = useState(product?.images[0].toString());
    console.log('boolean', Boolean(product?.id));
    useEffect(() => {
        setMainImage(product?.images[0].toString());
    }, [product]);

    const changeMainImg = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const imgUrl = target.style.backgroundImage.slice(5, -2);
        console.log(imgUrl);
        setMainImage(imgUrl);
    };
    return (
        <>
            {err && <Error404 />}
            {product && (
                <div className="product-page">
                    <div className="product-page__path">
                        <Link to="/" className="product-page__link">
                            Store
                        </Link>
                        <a className="product-page__link">{product.category}</a>
                        <a className="product-page__link">{product.brand}</a>
                        <a className="product-page__link">{product.title}</a>
                    </div>
                    <div className="product-page__info">
                        <h2 className="product-page__name">{product.title}</h2>
                        <div className="product-page__data">
                            <div className="product-page__images">
                                <div
                                    className="product-page__main-img"
                                    style={{
                                        backgroundImage: `url(${mainImage || ''})`,
                                    }}
                                ></div>
                                <div className="product-page__other-imgs">
                                    {gal.map((el: string, index) => (
                                        <div
                                            className="product-page__other-image"
                                            style={{ backgroundImage: `url(${el})` }}
                                            onClick={changeMainImg}
                                            key={index}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="product-page__details">
                                <div className="product-page__details-top">
                                    <div className="product-page__category">Category: {product.category}</div>
                                    <div className="product-page__brand">Brand: {product.brand}</div>
                                    <div className="product-page__discount">Discount: {product.discountPercentage}</div>
                                    <div className="product-page__rating">Rating: {product.rating}</div>
                                    <div className="product-page__stock">Stock: {product.stock}</div>
                                    <div className="product-page__description">Description: {product.description}</div>
                                </div>
                                <div className="product-page__details-bottom">
                                    <div className="product-page__price">€{product.price}</div>
                                    <Button
                                        name={inCart ? 'Drop from Cart' : 'Add to Cart'}
                                        onClick={
                                            inCart
                                                ? () =>
                                                      dropFromCart({
                                                          product,
                                                          cart,
                                                          setIncart,
                                                          setTotalProducts,
                                                          setTotalSum,
                                                      })
                                                : () =>
                                                      addToCart({
                                                          product,
                                                          cart,
                                                          setIncart,
                                                          setTotalProducts,
                                                          setTotalSum,
                                                      })
                                        }
                                    ></Button>
                                    <Button
                                        name="Buy now"
                                        onClick={() => {
                                            console.log('Buy now');
                                            if (!cart.currentProducts.some((el) => el.product.id === id)) {
                                                addToCart({
                                                    product,
                                                    cart,
                                                    setIncart,
                                                    setTotalProducts,
                                                    setTotalSum,
                                                });
                                            }
                                            navigate('/cart');
                                            setModal(true);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductPage;
