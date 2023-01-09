import React, { ChangeEvent, useContext } from 'react';
import { StoreContext } from '../../context';
import './CartHeader.scss';

type CartHeaderType = {
    currentPage: number;
    setCurrentPage: (data: number) => void;
    itemsPerPage: number;
    setItemsPerPage: (data: number) => void;
    totalPages: number;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setIsClicked: (data: boolean) => void;
};
const CartHeader = (props: CartHeaderType) => {
    const { cart } = useContext(StoreContext);
    const { currentPage, setCurrentPage, itemsPerPage, totalPages, handleChange, setIsClicked } = props;

    const increasePage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setIsClicked(true);
        }
        return false;
    };
    const decreasePage = () => {
        if (currentPage > 1 && currentPage <= totalPages) {
            setCurrentPage(currentPage - 1);
            setIsClicked(true);
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
