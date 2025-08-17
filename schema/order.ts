import { bdPhoneRegex, postCodeRegex } from "@/utils";
import z from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(bdPhoneRegex, 'Enter a valid Bangladeshi phone number'),
  street: z.string().min(5, 'Street address is too short'),
  city: z.string().min(2, 'City is required'),
  postCode: z.string().regex(postCodeRegex, 'Post code must be 4–5 digits'),
  country: z.string().min(2, 'Country is required'),
  shipping: z.enum(['standard', 'express']),
  payment: z.enum(['bkash', 'cod', 'card', 'mazapay']),
agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;


export {
  checkoutSchema
}