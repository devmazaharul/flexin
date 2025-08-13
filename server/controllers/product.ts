'use server';
import { productResponceDB } from '@/utils/prisma';
import { prisma } from '../config/prisma';
import AppError, { handleError } from '../responce/error';
import { SuccessResponse } from '../responce/functionRes';
import { addProductKeys, productItems } from '@/types/product';

interface partialType {
  isFeature?: boolean;
  isDiscount?: boolean;
}

const allProduct = async (
  filter: partialType
): Promise<ReturnType<typeof SuccessResponse<productItems[]>>> => {
  try {
    const whereCondition: any = {
      isActive: true,
    };

    if (filter.isDiscount) {
      whereCondition.discount = { gt: 0 };
    }

    if (filter.isFeature) {
      whereCondition.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where: whereCondition,
      select: productResponceDB,
    });

    return SuccessResponse<any>({
      message: 'All filtered products',
      status: 200,
      data: products,
    });
  } catch (error) {
    throw handleError(error);
  }
};

const singleProduct = async (
  productid: string
): Promise<ReturnType<typeof SuccessResponse<productItems>>> => {
  try {
    const findSingleProduct = await prisma.product.findUnique({
      where: { id: productid },
      select: productResponceDB,
    });
    if (!singleProduct)
      throw new AppError({
        message: 'No product found',
        status: 400,
      });
    if (!findSingleProduct?.isActive)
      throw new AppError({
        message: 'Invalid product id',
      });

    return SuccessResponse<any>({
      message: 'Get product success',
      status: 200,
      data: findSingleProduct,
    });
  } catch (error) {
    throw handleError(error);
  }
};

const craereProduct = async (
  data: addProductKeys
): Promise<ReturnType<typeof SuccessResponse<productItems>>> => {
  const { name, description, price, stock, imageUrl, discount, categoryId } =
    data;
  try {
    const addProduct = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
        stock,
        discount,
        categoryId,
      },
      select: productResponceDB,
    });

    if (!addProduct)
      throw new AppError({
        message: 'invalid add product',
      });

    return SuccessResponse<any>({
      message: 'Add product successfull',
      status: 200,
      data: addProduct,
    });
  } catch (error) {
    throw handleError(error);
  }
};

export { allProduct, singleProduct, craereProduct };
