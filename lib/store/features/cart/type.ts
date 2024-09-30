export interface IProductCart {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  count: number;
}

export interface ICart {
  products: IProductCart[];
  totalProduct: number;
}
