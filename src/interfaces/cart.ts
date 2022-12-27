import { ICartItem } from '../api/cart';
import { IProduct } from './products';

export default interface ICart {
    currentProducts: ICartItem[];
    totalSum: number;
    totalItems: number;
}
