'use server';
import AppError, { handleError } from '../responce/error';
import { orderStateTypes } from '@/types/order';
import { SuccessResponse } from '../responce/functionRes';

import {
  PrismaClient,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from '@prisma/client';
import { generateOrderId, generatePaymentId } from '@/utils/algorithm';
import { TotalAddress } from '@/hook/useAddressStore';
import { log } from 'next-axiom';
import { generateLog } from '@/utils';
import mailService from '../config/mail';
const prisma = new PrismaClient();

const orderProcess = async (data: orderStateTypes) => {
  try {
    const { OrderItems, address, Payment, userInfo } = data;
    if(Payment?.paymentMethod!=="CASH_ON_DELIVERY") throw new AppError({message:"Only COD payment method is allowed in this version"})
    if (!userInfo?.email) {
      throw new AppError({ message: 'User email is required' });
    }

    // 1) Validate
    if (!OrderItems || OrderItems.length === 0) {
      throw new AppError({ message: 'No product found' });
    }
    if (!Object.values(address).every(Boolean)) {
      throw new AppError({ message: 'Invalid address' });
    }

    const findUser = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!findUser) {
      log.error(`[login]:Invalid user with email: ${userInfo.email}`);
      throw new AppError({
        message: 'Invalid user ',
      });
    }

    // 2) Transaction
    return await prisma.$transaction(async (tx) => {
      const productIds = OrderItems.map((i) => i.id);

      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, price: true, name: true, stock: true },
      });

      if (products.length !== productIds.length) {
       generateLog('One or more products are invalid', 'error');
        throw new AppError({ message: 'One or more products are invalid' });
      }

      const productMap = new Map(products.map((p) => [p.id, p]));

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

      const total = sanitizedOrderItems.reduce(
        (sum, it) => sum + (it.price ?? 0) * it.quantity,
        0
      );

      const orderItemsCreate = sanitizedOrderItems.map((oi) => ({
        quantity: oi.quantity,
        price: oi.price,
        product: { connect: { id: oi.productId } },
      }));

      // 3) Create Order + OrderInfo
      const order = await tx.order.create({
        data: {
          userId: findUser.id,
          orderID: generateOrderId(),
          total,
          status: OrderStatus.PROCESSING,
          OrderItems: { create: orderItemsCreate },
          orderInfo: {
            create: {
              division: address.division,
              district: address.district,
              upazila: address.upazila,
              union: address.union,
              note: address.note || '',
              name: userInfo.name!,
              email: userInfo.email,
              phone: userInfo?.phone!,
            },
          },
        },
        include: {
          OrderItems: { include: { product: true } },
          orderInfo: true,
        },
      });

      // 4) Payment create
      const paymentMethod =
        Payment?.paymentMethod ?? PaymentMethod.CASH_ON_DELIVERY;
      const transactionId =
        paymentMethod === PaymentMethod.CASH_ON_DELIVERY
          ? `${generatePaymentId()}`
          : Payment?.transactionId ??
            (() => {
              generateLog('transactionId required for online payment', 'error');
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

      // 5) Update product stock
      for (const oi of sanitizedOrderItems) {
        await tx.product.update({
          where: { id: oi.productId },
          data: { stock: { decrement: oi.quantity } },
        });
      }

     generateLog(`Order ${order.orderID} created successfully`, 'info');

     //send mail to user
      mailService({
        to: userInfo.email!,
        subject: `Order ${order.orderID} Confirmation`,
        additionalInfo:{
          toName:userInfo.name!,
          subject:`Order ${order.orderID} Confirmation`,
          reason:"Order Confirmation",
          greeting:`Hi `,
          bodyHtml:`<p>Thank you for your order! We're excited to let you know that we've received your order <strong>${order.orderID}</strong> and it's currently being processed.</p>
          <p>We'll send you another email once your order has shipped. In the meantime, if you have any questions or need assistance, feel free to reach out to our customer support team.</p>
          <p>Thank you for choosing Flexin!</p>`,
          callToActionLink:`https://flexin.shop/order/status/${order.orderID}`,
          callToActionText:"View Order Status"
        }
     }).catch((error) => {
        generateLog(`Failed to send order confirmation email: ${error}`, 'error');
      });

      return SuccessResponse({
        message: 'success',
        status: 200,
        data: order,
      });
    });
  } catch (error) {
    return handleError(error);
  }finally {
    await prisma.$disconnect();
  }
};

const getorderDatawithOrderId = async (orderID: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { orderID },
      include: {
        orderInfo: true,
        Payments: true,
      },
    });
    if (!order) {
      throw new AppError({ message: 'No order found', status: 404 });
    }
    return SuccessResponse({
      message: 'success',
      status: 200,
      data: order,
    });
  } catch (error) {
    return handleError(error);
  }
};






export { orderProcess, getorderDatawithOrderId };
