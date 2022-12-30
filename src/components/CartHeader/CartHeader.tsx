import React, { ChangeEvent, useContext, useState } from 'react';
import { StoreContext } from '../../context';
import './CartHeader.scss';

type CartHeaderType = {
    currentPage: number;
    setCurrentPage: (data: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (data: number) => void;
    totalPages: number;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const CartHeader = (props: CartHeaderType) => {
    const { cart } = useContext(StoreContext);
    const { currentPage, setCurrentPage, itemsPerPage, setItemsPerPage, totalPages, handleChange } = props;

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setItemsPerPage(+event.target.value);
    //     console.log('totalPages', totalPages);
    //     // setCurrentPage(Math.floor(cart.currentProducts.length / itemsPerPage));
    //     console.log('11111', currentPage);
    //     //если меняется значение итемов на странице то надо как-то менять нахождение на текущей странице
    //     if (currentPage > totalPages) {
    //         console.log('inside', totalPages);
    //         setCurrentPage(currentPage - 1);
    //     }
    // };
    const increasePage = () => {
        // console.log('+++');
        if (currentPage < totalPages) {
            console.log('+currentPage', currentPage);
            setCurrentPage(currentPage + 1);
        }
        return false;
    };
    const decreasePage = () => {
        // console.log('---');
        if (currentPage > 1 && currentPage <= totalPages) {
            console.log('-currentPage', currentPage);
            setCurrentPage(currentPage - 1);
        }
        return false;
    };
    return (
        <div className="cart__list-options">
            <h2 className="cart__header">Products in Cart</h2>
            <div className="cart__control">
                <div className="cart__items">
                    Items:
                    <input
                        type="number"
                        className="cart__limit-input"
                        value={itemsPerPage}
                        min={1}
                        max={cart.currentProducts.length === 0 ? 1 : cart.currentProducts.length}
                        onChange={handleChange}
                    />
                </div>
                <div className="cart__pages">
                    Page:
                    <button className="cart__pages-btn" onClick={decreasePage}>
                        &#129120;
                    </button>
                    <span className="cart__pages-number">{currentPage}</span>
                    <button className="cart__pages-btn" onClick={increasePage}>
                        &#129122;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartHeader;
