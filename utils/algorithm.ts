import { productItems } from "@/types/product";

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

export {
  shuffleInProducts,
  imageToBase64
}