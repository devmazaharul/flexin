import { appConfig } from '@/constant/app.config';
import { z } from 'zod';

const { inputForm } = appConfig;

// Signup validation schema
const signupSchema = z.object({
  name: z
    .string()
    .min(inputForm.NAME_MIN_LENGTH, `Name must be at least ${inputForm.NAME_MIN_LENGTH} characters`)
    .max(inputForm.NAME_MAX_LENGTH, `Name must be at most ${inputForm.NAME_MAX_LENGTH} characters`)
    .trim(),
  email: z
    .string()
    .email('Invalid email address')
    .max(inputForm.EMAIL_MAX_LENGTH, `Email must be at most ${inputForm.EMAIL_MAX_LENGTH} characters`)
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(inputForm.PASSWORD_MIN_LENGTH, `Password must be at least ${inputForm.PASSWORD_MIN_LENGTH} characters`)
    .max(inputForm.PASSWORD_MAX_LENGTH, `Password must be at most ${inputForm.PASSWORD_MAX_LENGTH} characters`)
    .trim(),
});

// Login validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .max(inputForm.EMAIL_MAX_LENGTH, `Email must be at most ${inputForm.EMAIL_MAX_LENGTH} characters`)
    .trim()
    .toLowerCase(),
  password: z
    .string().trim().min(1,'Please enter your password')

});


  const changePasswordSchema=z.object({
    oldpass:z.string().trim(),
    newpass:z.string().trim()
  })

  

export { signupSchema, loginSchema,changePasswordSchema };
