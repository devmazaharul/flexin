import { $Enums } from '@prisma/client';

export interface orderProductState {
  id: string;
  price: number;
  quantity:number
}

export interface orderStateTypes {
  userId: string;
  OrderItems: orderProductState[];
  Payment: $Enums.PaymentMethod;
}


export interface cancelOder{
  orderID:string
}