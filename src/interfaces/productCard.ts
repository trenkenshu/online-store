import CartClass from '../api/cart';
import { IProduct } from './products';

interface IProductCard {
    product: IProduct;
    key: number;
    // cart?: CartClass;
    isInCart: boolean;
    // setTotalProducts: (number: number) => void;
}
export default IProductCard;
