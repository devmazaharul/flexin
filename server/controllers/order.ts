'use server';
import AppError, { handleError } from '../responce/error';
import { cancelOder, orderProductState } from '@/types/order';
import { SuccessResponse } from '../responce/functionRes';

import {
  PrismaClient,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from '@prisma/client';
import { generateOrderId } from '@/utils/algorithm';
import { TotalAddress } from '@/store/useAddressStore';

const cancelOrder = async (
  orderid: string
): Promise<ReturnType<typeof SuccessResponse<cancelOder>>> => {
  try {
    //await currentUserInfo()
    const findOrder = await prisma.order.findUnique({
      where: {
        id: orderid,
      },
      include: {
        Payments: true,
        OrderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!findOrder)
      throw new AppError({
        message: 'Invalid order id',
        status: 400,
      });

    if (findOrder.Payments?.paymentMethod !== 'CASH_ON_DELIVERY')
      throw new AppError({
        message: "You can't cancel this order",
      });

    if (findOrder.status === 'SHIPPED' || findOrder.status == 'DELIVERED')
      throw new AppError({
        message: "You can'not cancel this product",
      });

    await prisma.order.update({
      where: { id: orderid },
      data: { status: 'CANCELLED' },
    });

    return SuccessResponse<cancelOder>({
      message: 'Successfully order cancel',
      status: 200,
      data: {
        orderID: orderid,
      },
    });
  } catch (error) {
    throw handleError(error);
  }
};

// src/services/order.ts

const prisma = new PrismaClient();

type OrderItemInput = {
  id: string; // client পাঠায় product id হিসেবে
  quantity: number;
};

type orderStateTypes = {
  userEmail: string;
  OrderItems: OrderItemInput[];
  address: TotalAddress;
  Payment?: {
    paymentMethod: PaymentMethod;
    transactionId?: string;
  };
};

const orderProcess = async (data: orderStateTypes) => {
  try {
    const { OrderItems, address, Payment, userEmail } = data;

    if (!OrderItems || OrderItems.length === 0) {
      throw new AppError({ message: 'No product found' });
    }

    const findUser=await prisma.user.findUnique({
      where:{email:userEmail}
    })

    if(!findUser) throw new AppError({
      message:"Invalid user "
    })



    // Transaction শুরু
    return await prisma.$transaction(async (tx) => {
      // 1) product ids বের করা
      const productIds = OrderItems.map((i) => i.id);


      // 2) DB থেকে products আনা
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true, name: true, stock: true },
      });

      // 3) validate: সব product পাওয়া গেছে তো?
      if (products.length !== productIds.length) {
        throw new AppError({ message: 'One or more products are invalid' });
      }

      // 4) map বানাও for O(1) lookup
      const productMap = new Map(products.map((p) => [p.id, p]));

      // 5) stock চেক + sanitize order items
      const sanitizedOrderItems = OrderItems.map((it) => {
        if (!it.id) throw new AppError({ message: 'product id is required' });
        if (!Number.isInteger(it.quantity) || it.quantity <= 0)
          throw new AppError({ message: 'Invalid quantity' });

        const prod = productMap.get(it.id);
        if (!prod)
          throw new AppError({ message: `Invalid productId: ${it.id}` });

        if (it.quantity > prod.stock) {
          throw new AppError({
            message: `Stock out for product ${prod.name || prod.id}`,
          });
        }

        return {
          productId: it.id,
          quantity: it.quantity,
          price: prod.price ?? 0,
        };
      });

      // 6) total হিসাব (সঠিক precedence)
      const total = sanitizedOrderItems.reduce(
        (sum, it) => sum + (it.price ?? 0) * it.quantity,
        0
      );

      // 7) Order create (nested OrderItems using checked create with product connect)
      // Build OrderItems create payload as checked create (product: connect)
      const orderItemsCreate = sanitizedOrderItems.map((oi) => ({
        quantity: oi.quantity,
        price: oi.price,
        product: { connect: { id: oi.productId } }, // checked create path
      }));

      const order = await tx.order.create({
        data: {
          userId:findUser.id,
          orderID: generateOrderId(),
          total,
          status: OrderStatus.PROCESSING,
          OrderItems: {
            create: orderItemsCreate,
          },
        },
        select: { id: true, total: true, status: true },
      });

      // 8) Payment create (যদি থাকে অথবা COD placeholder)
      const paymentMethod =
        Payment?.paymentMethod ?? PaymentMethod.CASH_ON_DELIVERY;
      const transactionId =
        paymentMethod === PaymentMethod.CASH_ON_DELIVERY
          ? `COD-${order.id}`
          : Payment?.transactionId ??
            (() => {
              throw new AppError({
                message: 'transactionId required for online payment',
              });
            })();

      await tx.payment.create({
        data: {
          orderId: order.id,
          amount: total,
          paymentMethod,
          status: PaymentStatus.PENDING,
          transactionId,
        },
      });

      // 9) Stock decrement — update each product's stock
      // Note: small loop of updates inside transaction is fine; for large carts consider bulk update.
      for (const oi of sanitizedOrderItems) {
        await tx.product.update({
          where: { id: oi.productId },
          data: {
            stock: { decrement: oi.quantity }, // Prisma supports decrement with number
          },
        });
      }

      // 10) Fetch and return full order with relations
      const fullOrder = await tx.order.findUniqueOrThrow({
        where: { id: order.id },
        include: {
          user: { select: { id: true } },
          OrderItems: {
            include: { product: { select: { id: true, name: true } } },
          },
          Payments: true,
        },
      });

      return SuccessResponse({
        message: 'success',
        status: 200,
        data: fullOrder,
      });
    });
  } catch (error) {
    return handleError(error);
  }
};

const getOrderInfoWithUserId = async (orderId: string) => {
  try {
    if (!orderId)
      throw new AppError({
        message: 'Invalid user id',
      });
    const findOrder = await prisma.order.findUnique({
      where: {
        orderID: orderId,
      },
      include: { Payments: true, user: true },
    });
    if (!findOrder)
      throw new AppError({
        message: 'invalid order ',
      });

    return SuccessResponse({
      message: 'successfully get order info',
      status: 200,
      data: findOrder,
    });
  } catch (error) {
    return handleError(error);
  }
};

export { cancelOrder, orderProcess, getOrderInfoWithUserId };
