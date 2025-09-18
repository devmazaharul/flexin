import AppError from '@/server/responce/error';
import { jwtpayload } from '@/types/others';
import jwt from 'jsonwebtoken';

const jwtGenarate = (payload: jwtpayload,time:string='7d') => {

  const payloadData: jwtpayload = {
    id: payload.id,
    email: payload.email,
    role: payload.role,
  };
  
  return jwt.sign(
    payloadData,
    process.env.JWT_SECRET as string,
    { expiresIn: time } as jwt.SignOptions
  );
};


const jwtVerify = (token:string) => {
  try {

   if(jwt.decode(token) === null) {
    throw new AppError({
      message: 'Unauthorized',
      status: 401,
    });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    
    return new AppError({
      message: 'Unauthorized',
      status: 401,
    });
  }
};



interface mailToken {
  email:string;
  name:string
}

const genarateEmailToken = (data: mailToken, time: string) => {
    const payloadData = {
    email: data.email,
    name: data.name,
  };

 return jwt.sign(
    payloadData,
    process.env.JWT_SECRET as string,
    { expiresIn: time } as jwt.SignOptions
  );

}


export {
  jwtGenarate,
  jwtVerify,
  genarateEmailToken
}
