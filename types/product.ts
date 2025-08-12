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
  category: {
    id: string;
    name: string;
  };
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
  category: {
    id: string;
    name: string;
  };

}