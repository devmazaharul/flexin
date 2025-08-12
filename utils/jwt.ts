import AppError from '@/server/responce/error';
import { jwtpayload } from '@/types/others';
import jwt from 'jsonwebtoken';

const jwtGenarate = (payload: jwtpayload) => {

  const payloadData: jwtpayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };
  
  return jwt.sign(payloadData, process.env.JWT_SECRET as string);
};


const jwtVerify = (token:string) => {
  try {
   if(jwt.decode(token) === null) {
    throw new AppError({
      message: 'Unauthorized user',
      status: 401,
    });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    throw new AppError({
      message: 'Unauthorized user',
      status: 401,
    });
  }
};


export {
  jwtGenarate,
  jwtVerify
}
