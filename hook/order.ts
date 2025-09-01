import { create } from "zustand";


export const useOrderStore = create<{orderID:string,setOrderID:(id:string)=>void}>((set) => ({
  orderID:"",
  setOrderID:(id)=>set({orderID:id})
}));





