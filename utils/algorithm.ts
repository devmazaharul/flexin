import { productItems } from "@/types/product";
import { randomUUID } from "crypto";

function shuffleInProducts(arr:productItems[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    // pick a random index from 0..i
    const j = Math.floor(Math.random() * (i + 1));
    // swap arr[i] and arr[j]
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function imageToBase64(file:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// utils/generateOrderId.ts


 function generateOrderId(): string {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  // ছোট UUID নেবো (প্রথম 6 digit)
  const uniquePart = randomUUID().split("-")[0];

  return `ORD-${year}${month}${day}${uniquePart}`;
}

 function generatePaymentId(paymentMethodName:string="COD"): string {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  // ছোট UUID নেবো (প্রথম 6 digit)
  const uniquePart = randomUUID().split("-")[0];

  return `${paymentMethodName}-${year}${month}${day}${uniquePart}`;
}

// utils/date.ts
 function getEstimatedDelivery(days: number = 3): string {
  const date = new Date();
  date.setDate(date.getDate() + days);

  // Intl.DateTimeFormat দিয়ে weekday + day + month
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Friday
    day: "numeric",  // 29
    month: "long",   // August
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}


export {
  shuffleInProducts,
  imageToBase64,
  generateOrderId,
  getEstimatedDelivery,
  generatePaymentId
}