import { TotalAddress } from "@/hook/useAddressStore";
import { PaymentMethod } from "@prisma/client";

type OrderItemInput = {
  id: string; // client পাঠায় product id হিসেবে
  quantity: number;
};

export type orderStateTypes = {
  userInfo: {
    email: string;
    name?: string;
    phone?: string;
  };
  OrderItems: OrderItemInput[];
  address: TotalAddress;
  Payment?: {
    paymentMethod: PaymentMethod;
    transactionId?: string;
  };
};