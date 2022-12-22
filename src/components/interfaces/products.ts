export interface IProduct extends Record<string, number | string | URL | URL[]> {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: URL;
  images: URL[];
}

export interface IProducts {
  products: IProduct[];
}