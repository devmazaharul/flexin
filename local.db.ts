 const rawProductproducts = [
  {
    id: '1',
    name: 'Iphone 12 Pro Max',
    price: 17883,
    stock: 120,
    description: 'This is an awesome phone with great performance.',
    imageUrl: 'https://m.media-amazon.com/images/I/715XNT3XEpL._SL1500_.jpg',
    discount: 0,
    isFeatured: true,
    isActive: false,
    category: {
      id: '6',
      name: 'baby',
    },
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    price: 21000,
    stock: 85,
    description: 'Flagship Android phone with amazing camera quality.',
    imageUrl:
      'https://beautysiaa.com/wp-content/uploads/2022/12/Cosrx-Salicylic-Acid-Daily-Gentle-Cleanser-150ml-300x300.jpg',

    discount: 15,
    isFeatured: true,
    isActive: false,
    category: {
      id: '5',
      name: 'electronics',
    },
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    price: 9800,
    stock: 60,
    description: 'Premium noise-cancelling wireless headphones.',
    imageUrl:
      'https://m.media-amazon.com/images/I/71Wbdf1ML-L._UF1000,1000_QL80_.jpg',

    discount: 20,
    isFeatured: true,
    isActive: false,
    category: {
      id: '4',
      name: 'audio',
    },
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    price: 7500,
    stock: 200,
    description: 'Comfortable and stylish sneakers for everyday wear.',
    imageUrl:
      'https://cdn.klassy.com.bd/uploads/products/products/Mistine-Acne-Clear-Face-wash-85g-03ba-products.webp',
    discount: 5,
    isFeatured: true,
    isActive: false,
    category: {
      id: '3',
      name: 'fashion',
    },
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Apple MacBook Air M2',
    price: 28000,
    stock: 40,
    description: "Lightweight laptop with Apple's latest M2 chip.",
    imageUrl:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/him/him50047/y/29.jpg',

    discount: 12,
    isFeatured: true,
    isActive: false,
    category: {
      id: '2',
      name: 'computers',
    },
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Logitech MX Master 3 Mouse',
    price: 4500,
    stock: 5,
    description: 'Ergonomic wireless mouse with precision tracking.',
    imageUrl:
      'https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC82NzcxM1wvNjc3MTMtMS00LTdlM2w0dy5wbmciLCJlZGl0cyI6W119',
    discount: 8,
    isFeatured: true,
    isActive: false,
    updatedAt: new Date(),
    category: {
      id: '1',
      name: 'accessories',
    },
  },
];

export const products=[...rawProductproducts].map((item)=>{
  return {
    ...item,
    slug:item.name.split(" ").join("-").toLocaleLowerCase(),
    attributes: Math.floor(Math.random()*20)%2==0 ? [
        { id: 1, key: 'color', value: 'red' },
        { id: 2, key: 'color', value: 'purple' },
        { id: 3, key: 'color', value: 'orange' },
        { id: 4, key: 'size', value: 'xl' },
        { id: 5, key: 'size', value: '2xl' },
      ]:[]
  }
})