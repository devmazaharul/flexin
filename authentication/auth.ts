'use server';
import { prisma } from '@/server/config/prisma';
import AppError, { handleError } from '@/server/responce/error';
import { SuccessResponse, SuccessResponseinternal } from '@/server/responce/functionRes';
import { jwtpayload } from '@/types/others';
import { jwtVerify } from '@/utils/jwt';
import { cookies } from 'next/headers';

export const currentUserInfo = async ():Promise<SuccessResponseinternal<{id:string}>> => {
  try {
    const gettoken = (await cookies()).get(process.env.TOKEN_NAME || 'flexin_token' );
    if (!gettoken) {
      throw new AppError({
        message: 'Unauthorized user',
        status: 401,
      });
    }
    const token = gettoken.value;
    // Verify the token
    const verifiedToken = jwtVerify(token);


    const tokenItem = verifiedToken as jwtpayload;
    //check token user exists in database
    const user = await prisma.user.findUnique({
      where:{id: tokenItem.id}
    })
    if (!user) {
      throw new Error('Unauthorized user');
    }

    // Return user information
    return  new SuccessResponseinternal<{id:string}>({
      message: 'User information retrieved successfully',
      status: 200,
      data: {
        id: user.id,
      }
      })


  } catch (error) {
    throw handleError(error);
  }
};
