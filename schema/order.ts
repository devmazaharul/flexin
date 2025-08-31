import { bdPhoneRegex, postCodeRegex } from "@/utils";
import z from "zod";

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(bdPhoneRegex, 'Enter a valid Bangladeshi phone number'),
  shipping: z.enum(['standard', 'express']),
  payment: z.enum(['BKASH', 'CASH_ON_DELIVERY', 'MAZAPAY', 'NAGAD']),
agreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;


export {
  checkoutSchema
}