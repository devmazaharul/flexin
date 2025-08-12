import AppError, { handleError } from '../responce/error';
import { cancelOder, orderStateTypes } from '@/types/order';
import { prisma } from '../config/prisma';
import { currentUserInfo } from '@/authentication/auth';
import { SuccessResponse } from '../responce/functionRes';

const createOrder = async (data: orderStateTypes) => {
  try {
      //await currentUserInfo()
    const { OrderItems, userId, Payment } = data;
    const totalPrice = OrderItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    const trxID = 'trx_' + Math.random().toString(36).substring(2, 15); // Random trx id

    // First create the order and order items
    const orderNow = await prisma.order.create({
      data: {
        total: totalPrice,
        userId,
        OrderItems: {
          create: OrderItems.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.id, // assuming item.id is productId
          })),
        },
      },
      include: {
        OrderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    // Then create payment entry depending on method
    let createdPayment;

    if (Payment === 'CASH_ON_DELIVERY') {
      createdPayment = await prisma.payment.create({
        data: {
          orderId: orderNow.id,
          amount: totalPrice,
          paymentMethod: Payment,
          transactionId: trxID,
        },
      });
    } else if (Payment === 'BKASH') {
      createdPayment = await prisma.payment.create({
        data: {
          orderId: orderNow.id,
          amount: totalPrice,
          paymentMethod: Payment,
          transactionId: trxID,
        },
      });
    } else if (Payment === 'MAZAPAY') {
      createdPayment = await prisma.payment.create({
        data: {
          orderId: orderNow.id,
          amount: totalPrice,
          paymentMethod: Payment,
          transactionId: trxID,
        },
      });
    }

    return {
      message: 'Order created successfully',
      status: 201,
      data: {
        ...orderNow,
        payment: createdPayment,
      },
    };
  } catch (error) {
    throw handleError(error);
  }
};

const cancelOrder = async (
  orderid: string
): Promise<ReturnType<typeof SuccessResponse<cancelOder>>> => {
  try {
      //await currentUserInfo()
    const findOrder = await prisma.order.findUnique({
      where: {
        id: orderid,
      },
     include:{
      Payments:true,
      OrderItems:{
        include:{
          product:true
        }
      }
     }
    });
    if (!findOrder)
      throw new AppError({
        message: 'Invalid order id',
        status: 400,
      });

      if(findOrder.Payments?.paymentMethod!=="CASH_ON_DELIVERY") throw new AppError({
        message:"You can't cancel this order"
      })
    
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

export { cancelOrder, createOrder };
