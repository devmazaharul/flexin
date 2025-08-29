'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; 

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { signupSchema } from '@/schema/user';
import { createUser } from '@/server/controllers/user';
import AppError from '@/server/responce/error';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type SignUpFormInputs = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignUpFormInputs) => {
    const { name, email, password } = values;

    try {
      const signipAction = await createUser({ name, email, password });
      console.log(signipAction);
      if (signipAction.status !== 201)
        throw new AppError({
          message: signipAction.message,
        });

      toast.success(signipAction.message);
      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof AppError) {
        form.setError('root', { message: error.message });
      }
      // If error is from fetch or any other source
      else if (error instanceof Error) {
        form.setError('root', { message: error.message });
      }
      // fallback for unknown error types
      else {
        form.setError('root', { message: 'Something went wrong' });
      }
    } finally {
      form.reset();
    }
  };
  return (
    <div className="w-[350px] mx-auto flex items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mx-auto p-6 space-y-6 bg-white rounded-md shadow-2xl shadow-gray-100 border border-gray-100"
        >
          <h1 className="text-2xl font-semibold text-center">Singup</h1>
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label>Name</Label>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label>Email</Label>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label>Password</Label>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            {form.formState.isSubmitting ? 'Processing...' : 'Sign Up'}
          </Button>

          {form.formState.errors.root && (
            <p className="text-red-500 text-center">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="text-center text-gray-500">
            Already have and account{' '}
            <Link className="text-blue-400" href={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
