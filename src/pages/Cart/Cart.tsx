import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import CartHeader from '../../components/CartHeader';
import CartItem from '../../components/CartItem';
import CartSummary from '../../components/CartSummary';
import Modal from '../../components/Modal';
import { StoreContext } from '../../context';
import './Cart.scss';

const Cart = () => {
    const { cart, setTotalProducts, setTotalSum, isOrderSumbitted, modal } = useContext(StoreContext);
    // const [timeLeft, setTimeLeft] = useState(3);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        getCartQueryParams();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    // const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const totalPages = Math.ceil(cart.currentProducts.length / itemsPerPage);
    const currentCartList = cart.currentProducts.slice(indexOfFirstItem, indexOfLastItem);
    console.log('currentCartList', cart.currentProducts);

    useEffect(() => {
        console.log('useEffect on itemsPerPage', itemsPerPage);
        if (currentPage > totalPages && currentPage > 1) {
            // console.log('inside', totalPages);
            setCurrentPage(Math.ceil(cart.currentProducts.length / itemsPerPage));
        }
    }, [itemsPerPage]);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTimeLeft((prev) => prev - 1);
    //         console.log(timeLeft);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);
    useEffect(() => {
        console.log('setQuery');
        setCartQueryParams('itemsPerPage', String(itemsPerPage));
        setCartQueryParams('currentPage', String(currentPage));
    }, [itemsPerPage, currentPage]);

    const setCartQueryParams = (name: string, value: string) => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set(name, value);
        window.history.replaceState(null, '', newUrl);
    };

    const getCartQueryParams = () => {
        const url = new URL(window.location.href);
        for (const [key, value] of url.searchParams.entries()) {
            console.log('getQuery', key, '=>', value);
            if (key === 'itemsPerPage') {
                setItemsPerPage(+value);
            }
            if (key === 'currentPage') {
                setCurrentPage(+value);
            }
        }
    };

    const increaseAmount = (id: number) => {
        const cartItem = cart.currentProducts.find((el) => el.product.id === id);
        const cartItemIndex = cart.currentProducts.findIndex((el) => el.product.id === id);
        if (cartItem && cartItem?.amount > 0 && cartItem?.amount < cartItem.product.stock) {
            cart.currentProducts[cartItemIndex].amount += 1;
            setTotalProducts(cart.getTotalProducts());
            setTotalSum(cart.calculateTotalSum());
            localStorage.setItem('cartCurrentProducts', JSON.stringify(cart.currentProducts));
        }
    };
    const decreaseAmount = (id: number) => {
        const cartItem = cart.currentProducts.find((el) => el.product.id === id);
        const cartItemIndex = cart.currentProducts.findIndex((el) => el.product.id === id);
        if (cartItem && cartItem?.amount > 0 && cartItem?.amount <= cartItem.product.stock) {
            cart.currentProducts[cartItemIndex].amount -= 1;
            setTotalProducts(cart.getTotalProducts());
            setTotalSum(cart.calculateTotalSum());
            localStorage.setItem('cartCurrentProducts', JSON.stringify(cart.currentProducts));
        }
        if (cart.currentProducts[cartItemIndex].amount === 0) {
            const id = cart.currentProducts[cartItemIndex].product.id;
            console.log('remove ID', id);
            cart.remove(id);
            localStorage.setItem('cartCurrentProducts', JSON.stringify(cart.currentProducts));
            if (cart.currentProducts.length % itemsPerPage === 0 && currentPage === totalPages) {
                setCurrentPage(currentPage - 1);
            }
        }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        if (value < 1) {
            value = 1;
        }
        setItemsPerPage(value);
        // setCartQueryParams('itemsPerPage', String(itemsPerPage));
    };

    return (
        <>
            {cart.currentProducts.length === 0 && !isOrderSumbitted && (
                <div className="cart__empty">Cart is empty ☹️</div>
            )}
            {isOrderSumbitted && (
                <div className="order-ready">
                    <div className="order-ready__content">
                        Thanks for your order. Redirect to the catalog after 3 sec
                    </div>
                </div>
            )}
            {!isOrderSumbitted && cart.currentProducts.length > 0 && (
                <div className="cart">
                    <div className="cart__list">
                        <CartHeader
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                            totalPages={totalPages}
                            handleChange={handleChange}
                        />
                        {currentCartList.map((item, index) => (
                            <CartItem
                                product={item.product}
                                amount={item.amount}
                                index={index + 1}
                                key={index}
                                increaseAmount={increaseAmount}
                                decreaseAmount={decreaseAmount}
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                            />
                        ))}
                    </div>
                    <CartSummary />
                    {modal && <Modal />}
                </div>
            )}
        </>
    );
};

export default Cart;
