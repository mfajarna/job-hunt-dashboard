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
import { signUpFormSchema } from '@/lib/form-schema';
import { actionSignUp } from '@/lib/http';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TFormData = z.infer<typeof signUpFormSchema>;

const SignUpPage = () => {
  const { navigate } = useRouterNavigation();
  const { toast } = useToast();

  const form = useForm<TFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const mutationSignUp = useMutation({
    mutationFn: actionSignUp,
    onSuccess: () => {
      navigate('/auth/signin');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Email has been taken.',
      });
    },
  });

  const onSubmit = async (val: TFormData) => {
    mutationSignUp.mutate(val);

    form.reset();
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="shadow border border-border rounded-md p-8">
          <div className="font-semibold text-center text-2xl mb-2">Sign Up</div>
          <div className="text-sm text-gray-500">
            Enter your data to access dashboard
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter your name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your confirm pasword..."
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full">Sign In</Button>

              <div className="text-sm">
                Already have an account? {''}
                <Link href={'/auth/signin'} className="text-blue-500">
                  Sign In
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
