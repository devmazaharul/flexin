import { loginSchema, signupSchema } from '@/schema/user';
import z from 'zod';

//use infer to extract signup type from zod schema
export type SignupType = z.infer<typeof signupSchema>;

// Use infer to extract login type from zod schema
export type LoginType = z.infer<typeof loginSchema>;

//resonce user information

export interface userItem {
  id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface updateItem {
  name: string;
}

export interface resetItem{
  currentPassword:string,
  newPassword:string
}