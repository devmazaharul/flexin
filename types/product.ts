export interface productItems {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  discount: number;
  updatedAt: Date;
  isFeatured: boolean;
  isActive: boolean;
  slug:string;
  category: {
    id: string;
    name: string;
  };
  attributes: {
      id:number;
      key:string;
      value:string
    }[]
}
export interface addProductKeys {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  discount?: number;
  categoryId: string;
}


export interface addToCartitems {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  discount: number;
  updatedAt: Date;
  isFeatured: boolean;
  isActive: boolean;
  quantity:number;
  slug:string;
  category: {
    id: string;
    name: string;
  };
  size?:string,
  color?:string

}