import CartClass from '../api/cart';
import { IProduct } from './products';

export type CartItemType = {
    product: IProduct;
    amount: number;
    index: number;
    increaseAmount: (id: number) => void;
    decreaseAmount: (id: number) => void;
    currentPage: number;
    itemsPerPage: number;
};

export type CurrentProductsType = {
    product: IProduct;
    amount: number;
};

export type MinmaxType = {
    min: number;
    max: number;
};

export type UniqueFiltersType = {
    category?: string;
    brand?: string;
    maxAmount: number;
    currentAmount: number;
}[];

export type rangesType = 'both' | 'stock' | 'price' | 'none';

export type AddDropCartType = {
    product: IProduct;
    cart: CartClass;
    setIncart: (data: boolean) => void;
    setTotalProducts: (data: number) => void;
    setTotalSum: (data: number) => void;
};
