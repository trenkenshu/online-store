import CartClass from '../api/cart';
import { IProduct } from './products';

interface IProductCard {
    product: IProduct;
    key: number;
    cart?: CartClass;
    // onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    setTotalItems?: (number: number) => void;
}
export default IProductCard;
