// products.ts (50 products, static attributes array)
const staticAttributes = [
  { id: 1, key: 'color', value: 'red' },
  { id: 2, key: 'color', value: 'blue' },
  { id: 3, key: 'color', value: 'black' },
  { id: 4, key: 'color', value: 'white' },
  { id: 5, key: 'size', value: 's' },
  { id: 6, key: 'size', value: 'm' },
  { id: 7, key: 'size', value: 'l' },
  { id: 8, key: 'size', value: 'xl' },
];

const categories = [
  { id: '1', name: 'accessories' },
  { id: '2', name: 'computers' },
  { id: '3', name: 'fashion' },
  { id: '4', name: 'audio' },
  { id: '5', name: 'electronics' },
  { id: '6', name: 'baby' },
  { id: '7', name: 'home' },
  { id: '8', name: 'outdoor' },
];

const templates = [
  { name: 'Iphone 12 Pro Max', baseImg: 1011 },
  { name: 'Samsung Galaxy S23 Ultra', baseImg: 1025 },
  { name: 'Sony WH-1000XM5 Headphones', baseImg: 1033 },
  { name: 'Nike Air Max 270', baseImg: 1042 },
  { name: 'Apple MacBook Air M2', baseImg: 1050 },
  { name: 'Logitech MX Master 3 Mouse', baseImg: 1066 },
  { name: 'Canon EOS R6 Camera', baseImg: 1074 },
  { name: 'Dyson V11 Vacuum', baseImg: 1082 },
  { name: 'Bose QuietComfort Earbuds', baseImg: 1099 },
  { name: 'Fitbit Charge 5', baseImg: 1108 },
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rawProductproducts = Array.from({ length: 50 }).map((_, idx) => {
  const t = templates[idx % templates.length];
  const cat = categories[idx % categories.length];
  const id = (idx + 1).toString();
  const name = `${t.name} ${Math.ceil((idx + 1) / templates.length)}`; // make names varied
  const price = Math.round(randomInt(3000, 30000) / 100) * 100; // round to 100
  const stock = randomInt(0, 300);
  const discount = [0, 5, 8, 10, 12, 15, 20][randomInt(0, 6)];
  // picsum.photos with seed id to have stable images
  const imageUrl = `https://picsum.photos/seed/product-${id}-${t.baseImg}/800/800`;

  return {
    id,
    name,
    price,
    stock,
    description: `High quality ${t.name.toLowerCase()} — reliable, tested, and ready to use.`,
    imageUrl,
    discount,
    isFeatured: idx % 7 === 0,
    isActive: true,
    category: cat,
    updatedAt: new Date(),
    slug: name.split(' ').join('-').toLocaleLowerCase(),
    // static attributes array (same for every product)
    attributes: staticAttributes.map((a) => ({ ...a })),
  };
});

export const products = rawProductproducts;
