import { appConfig } from '@/constant/app.config';
import { string, z } from 'zod';

const { inputForm } = appConfig;

// This file contains validation schemas for user input forms using Zod
const signupSchema = z.object({
  name: string().min(inputForm.NAME_MIN_LENGTH).max(inputForm.NAME_MAX_LENGTH).toLowerCase().trim(),
  email: string().email().max(inputForm.EMAIL_MAX_LENGTH).toLowerCase().trim(),
  password: string()
    .min(inputForm.PASSWORD_MIN_LENGTH)
    .max(inputForm.PASSWORD_MAX_LENGTH).trim(),
});


// Validation schema for user login
const loginSchema = z.object({
  email: string().toLowerCase().email().max(inputForm.EMAIL_MAX_LENGTH).trim(),
  password: string()
    .min(inputForm.PASSWORD_MIN_LENGTH)
    .max(inputForm.PASSWORD_MAX_LENGTH).trim(),
});



export { signupSchema, loginSchema };
