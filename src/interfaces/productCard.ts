import { IProduct } from './products';

interface IProductCard {
    product: IProduct;
    key: number;
    dataId: number;
    // onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
export default IProductCard;
