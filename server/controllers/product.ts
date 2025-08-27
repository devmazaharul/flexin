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
  filter?: partialType
): Promise<ReturnType<typeof SuccessResponse<productItems[]>>> => {
  try {
    const whereCondition: any = {
      isActive: true,
    };

    if (filter?.isDiscount) {
      whereCondition.discount = { gt: 0 };
    }

    if (filter?.isFeature) {
      whereCondition.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where: whereCondition && whereCondition,
      select: productResponceDB,
    });
    console.log(products);

    return SuccessResponse<any>({
      message: 'All filtered products',
      status: 200,
      data: products,
    });
  } catch (error) {
    throw handleError(error);
  }
};

const findProductWithSlug = async (
  slug: string
): Promise<ReturnType<typeof SuccessResponse<productItems>>> => {
  try {
    // find the product
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      select: {
        ...productResponceDB,
        attributes: true,
      },
    });

    if (!product || !product.isActive) {
      throw new AppError({
        message: 'No product found or product is inactive',
        status: 404,
      });
    }

    // Map attributes to match productItems type
    const mappedProduct = {
      ...product,
      slug: product.slug ?? '', // Ensure slug is always a string
      attributes: product.attributes.map((attr: any) => ({
        id: Number(attr.id),
        key: attr.key,
        value: attr.value,
      })),
    };

    return SuccessResponse<productItems>({
      message: 'Get product success',
      status: 200,
      data: mappedProduct,
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

export { allProduct, findProductWithSlug, craereProduct };
