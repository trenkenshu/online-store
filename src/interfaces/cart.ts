import { CartItemType } from '../api/cart';
import { IProduct } from './products';

export default interface ICart {
    currentProducts: CartItemType[];
    totalSum: number;
    totalProducts: number;
}
