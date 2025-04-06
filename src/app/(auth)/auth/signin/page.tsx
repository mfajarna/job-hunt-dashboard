'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import { signInFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TFormData = z.infer<typeof signInFormSchema>;

const SignInPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const { navigate } = useRouterNavigation();

  const form = useForm<TFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (form: TFormData) => {
    setIsLoading(true);

    const auth = await signIn('credentials', {
      ...form,
      redirect: false,
    });

    if (auth?.status === 401) {
      setIsLoading(false);

      await toast({
        title: 'Error',
        description: 'Email or password maybe wrong',
      });
    } else {
      setIsLoading(false);
      await navigate('/');
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="shadow border border-border rounded-md p-8">
          <div className="font-semibold text-center text-2xl mb-2">
            Login your account
          </div>
          <div className="text-sm text-gray-500">
            Enter your email to access dashboard
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your email..." {...field} />
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
                    <FormControl>
                      <Input
                        placeholder="Enter your pasword..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" disabled={isLoading}>
                Sign Up
              </Button>

              <div className="text-sm">
                Don{'`'}t have and account? {''}
                <Link href={'/auth/signup'} className="text-blue-500">
                  Sign Up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
