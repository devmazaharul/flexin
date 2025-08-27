export const selectResponse = {
  id: true,
  name: true,
  email: true,
  role: true,
  isVerified: true,
  createdAt: true,
};

export const productResponceDB = {
  id: true,
  name: true,
  slug:true,
  description: true,
  price: true,
  imageUrl: true,
  stock: true,
  discount: true,
  updatedAt: true,
  isFeatured: true,
  isActive: true,
  attributes:true,
  category: {
    select: {
      id: true,
      name: true,
    },
  },
};
