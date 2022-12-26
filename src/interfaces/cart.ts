import { IProduct } from './products';

export default interface ICart {
    currentProducts: [item: IProduct, amount: number][];
    subtotal: number;
    itemsCount: number;
}
