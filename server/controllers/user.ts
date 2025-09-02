'use server';
import {
  LoginType,
  resetItem,
  SignupType,
  updateItem,
  userItem,
} from '@/types/user';
import AppError, { handleError } from '../responce/error';
import { SuccessResponse } from '../responce/functionRes';
import bcrypt from 'bcrypt';
import { appConfig } from '@/constant/app.config';
import { genarateEmailToken, jwtGenarate, jwtVerify } from '@/utils/jwt';
import { prisma } from '../config/prisma';
import { cookies } from 'next/headers';
import { currentUserInfo } from '@/authentication/auth';
import { selectResponse } from '@/utils/prisma';
import { queueService } from '../queue/queue';
import { queueJobName } from '@/types/others';
import mailService from '../config/mail';
import { redirect } from 'next/navigation';
import { log } from 'next-axiom';
import { generateLog } from '@/utils';

const createUser = async (
  data: SignupType
): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError({
        message: 'User already exists',
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      data.password,
      appConfig.hashing.SALT_ROUNDS
    );

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
      select: selectResponse,
    });

    const verifyEmailPayload = {
      email: user.email,
      name: user.name,
    };

    const verifyEmailtoken = genarateEmailToken(verifyEmailPayload, '1d');

    await mailService({
      to: data.email,
      subject: 'Welcome to Our Service',
      additionalInfo: {
        toName: data.name,
        fromName: 'Flexin Team',
        bodyHtml: `<p>Once your email is verified, you’ll unlock your full access to Flexin and all its features.</p>
        <br/>`,
        greeting: 'Welcome!',
        reason:
          ' Thank you for signing up to Flexin! We’re really excited to have you join our community.',
        callToActionLink: `${appConfig.hostname.BASE_URL}/verify?token=${verifyEmailtoken}`,
        callToActionText: 'Verify your email',
        subject: 'Welcome to Our Service',
      },
    });

    //  const addQ= await queueService.add(queueJobName.SEND_MAIL,{
    //     to: user.email,
    //     subject: 'Welcome to Our Service',
    //     additionalInfo: {
    //       ,
    //       fromName: 'Flexin Team',
    //       bodyHtml: `<p>Hi ${user.name},</p><p>Thank you for signing up!</p>`,
    //       greeting: 'Welcome!',
    //       reason: 'We are excited to have you on board.',
    //       callToActionLink: `${appConfig.hostname.BASE_URL}/verify-email?token=someToken`,
    //       callToActionText: 'Verify your email',
    //       subject: 'Welcome to Our Service',
    //     },
    //   })

    return SuccessResponse({
      message: 'Account created successfully',
      data: user,
      status: 201,
    });
  } catch (error) {
    return handleError(error); // rethrow so caller can handle
  }
};

const loginUser = async (
  data: LoginType
): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
    // 1. Find user
    const userIfExist = await prisma.user.findFirst({
      where: { email: data.email },
      select: {
        name: true,
        email: true,
        isVerified: true,
        password: true,
        id: true,
        role: true,
      },
    });

    if (!userIfExist) {
      throw new AppError({
        message: 'Invalid user credentials',
        status: 400,
      });
    }

    // 2. Check verification
    if (!userIfExist.isVerified) {
      throw new AppError({
        message: 'Please verify your email',
        status: 400,
      });
    }

    // 3. Password match
    const isPasswordMatch = await bcrypt.compare(
      data.password,
      userIfExist.password
    );

    if (!isPasswordMatch) {
    generateLog('Invalid login attempt due to wrong password', 'warn');
      throw new AppError({
        message: 'Invalid user credentials',
        status: 400,
      });
    }

    const { password, ...safeUser } = userIfExist;

    // 5. Generate JWT token
    const token = jwtGenarate({
      email: safeUser.email,
      id: safeUser.id,
      role: safeUser.role,
    });

    // 6. Set cookie
    const cookie = await cookies();
    cookie.set('authToken', token, {
      httpOnly: true,
      secure: false, // 🔒 in production make this true
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    // 7. Return response
    return SuccessResponse<{
      name: string;
      email: string;
      isVerified: boolean;
    }>({
      message: 'Account login success',
      status: 200,
      data: safeUser,
    });
  } catch (error) {
    return handleError(error);
  }
};

const resetPassword = async (data: {
  email: string;
}): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
    // 1. Find user
    const userIfExist = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (!userIfExist) {
      throw new AppError({
        message: 'Invalid user credentials',
        status: 400,
      });
    }

    //send reset password email

    return SuccessResponse({
      message: 'Reset password email sent successfully',
      status: 200,
      data: {
        email: userIfExist.email,
      },
    });
  } catch (error) {
    throw handleError(error);
  }
};

const verifyAccount = async (token: string) => {
  try {
    const decodeAndVerify = jwtVerify(token);
    if (!decodeAndVerify)
      throw new AppError({
        message: 'Unauthorized',
      });

    const { email, name } = decodeAndVerify as { email: string; name: string };
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser){
    log.warn('Attempt to verify non-existent user', { email });
        throw new AppError({
        message: 'Invalid token',
      });
    }

    if (findUser.isVerified)
      throw new AppError({
        message: 'Already verified account',
      });

    const updateStatus = await prisma.user.update({
      where: { email: email },
      data: { isVerified: true },
    });

    return SuccessResponse({
      message: 'successfully verified',
      status: 200,
      data: {
        name: name,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};

/*
  protected route
  - update user account information
  - only authenticated users can access this route
  protected routes [currentUserInfo,updateAccount,changePassword]
*/

// Update user account information
const updateAccount = async (
  data: updateItem
): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
  
    const authRes = await currentUserInfo();
    if (authRes.status !== 200) {
      log.warn('Unauthorized account update attempt', { userId: authRes.data?.id });
      throw new AppError({
        message: 'Unauthorized user',
        status: 401,
      });
    }
    const updateuser = await prisma.user.update({
      where: { id: authRes.data?.id },
      data: {
        name: data.name,
      },
      select: selectResponse,
    });
    if(!updateuser){
      throw new AppError({  message: 'User not found', status: 404 });
    }

    log.info('User account updated', { userId: updateuser.id });



    return SuccessResponse<userItem>({
      message: 'Account updated successfully',
      data: updateuser,
      status: 200,
    });
  } catch (error) {
    throw handleError(error);
  }
};

const currentUser = async (): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
    const authRes = await currentUserInfo();
    if (authRes.status !== 200) {
      throw new AppError({
        message: 'Unauthorized user',
        status: 401,
      });
    }
    if (!authRes.data) {
      throw new AppError({
        message: 'Invalid user data',
        status: 400,
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: authRes.data.id },
      select: selectResponse,
    });

    if (!user) {
      throw new AppError({
        message: 'User not found',
        status: 404,
      });
    }

    return SuccessResponse<userItem>({
      message: 'Current user fetched successfully',
      status: 200,
      data: user,
    });
  } catch (error) {
    throw handleError(error);
  }
};

const changePassword = async (
  item: resetItem
): Promise<ReturnType<typeof SuccessResponse>> => {
  try {
    const { currentPassword, newPassword } = item;
    const { data: currentUser } = await currentUserInfo();

    if (currentPassword === newPassword) {
      throw new AppError({
        message: 'Current password and new password are the same',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser?.id },
      select: { id: true, password: true, name: true },
    });

    if (!user) {
      throw new AppError({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      log.warn('Invalid current password attempt', { userId: user.id });
      throw new AppError({ message: 'Current password is not valid' });
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      appConfig.hashing.SALT_ROUNDS
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHashedPassword },
    });

    return SuccessResponse<{ name: string }>({
      message: 'Password has been changed',
      status: 200,
      data: {
        name: user.name,
      },
    });
  } catch (error) {
    throw handleError(error);
  }
};

const logout = async () => {
  try {
    const cookie = await cookies();
    const deleteToken = cookie.delete('authToken');
    if (!deleteToken)
      throw new AppError({
        message: 'Error to logout oparation',
      });
    return SuccessResponse({
      message: 'Logout successfull',
      status: 200,
      data: {},
    });
  } catch (error) {
    return handleError(error);
  }
};

const isLoggedInUser = async () => {
  try {
    const cookieObj = await cookies();
    const hasLoggedIn = cookieObj.get('authToken');
    if (!hasLoggedIn)
      throw new AppError({
        message: 'Access denied',
      });

    const token = hasLoggedIn.value;

    const decode = jwtVerify(token) as {
      id: string;
    };
    if (!decode)
      throw new AppError({
        message: 'Access denied',
      });

    const isValidUser = await prisma.user.findUnique({
      where: { id: decode.id },
      select: {
        name: true,
        email: true,
        isVerified: true,
      },
    });
    if (!isValidUser)
      throw new AppError({
        message: 'Access denied',
      });

    return SuccessResponse({
      message: 'Valid user',
      status: 200,
      data: isValidUser,
    });
  } catch (error) {
    return handleError(error);
  }
};

export {
  createUser,
  loginUser,
  updateAccount,
  resetPassword,
  currentUser,
  changePassword,
  verifyAccount,
  logout,
  isLoggedInUser,
};
