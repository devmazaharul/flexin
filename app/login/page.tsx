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
import { loginSchema } from '@/schema/user';
import { loginUser } from '@/server/controllers/user';
import AppError from '@/server/responce/error';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/hook/auth';
import { useNotificationStore } from '@/hook/notification';

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //auth store
  const loginAuth = useAuthStore((item) => item.authAdd);

  const onSubmit = async (values: LoginFormInputs) => {
    try {
      const { email, password } = values;
      const loginAction = await loginUser({ email, password });
      if (loginAction.status !== 200)
        throw new AppError({
          message: loginAction.message,
        });

      toast.success(loginAction.message);
      const items = loginAction.data as {
        name: string;
        email: string;
        isVerified: boolean;
      };
      const loginActionPayload = {
        name: items.name,
        email: items.email,
        isVerified: items.isVerified,
      };
      loginAuth(loginActionPayload);

       useNotificationStore.getState().setNotification({
        title: "Login Successful",
        body: `Welcome back! You have successfully logged in.`,
        href: `/account`,
        read: false,
      });

  
      router.push('/account');
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
    }
  };

  return (
    <div className="mt-10 w-[350px] flex items-center mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  mx-auto p-6 space-y-6 "
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>

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
            {form.formState.isSubmitting ? 'Processing...' : 'Login'}
          </Button>

          {form.formState.errors.root && (
            <p className="text-red-500 text-center">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="text-center text-gray-500">
            Don&lsquo;t have an account?{' '}
            <Link className="text-blue-400" href={'/signup'}>
              Signup
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
