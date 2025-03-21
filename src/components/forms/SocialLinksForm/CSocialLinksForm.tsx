'use client';

import CFieldInput from '@/components/organism/CFieldInput/CFieldInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { socialMediaFormSchema } from '@/lib/form-schema';
import { companySocialLinks } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanySocialMedia } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TFormData = z.infer<typeof socialMediaFormSchema>;

type CSocialLinksFormProps = {
  detail: CompanySocialMedia | undefined;
};

const CSocialLinksForm: React.FC<CSocialLinksFormProps> = ({ detail }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<TFormData>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      instagram: detail?.instagram,
      facebook: detail?.facebook,
      twitter: detail?.twitter,
      linkedin: detail?.linkedin,
      youtube: detail?.youtube,
    },
  });

  const mutatiion = useMutation({
    mutationFn: companySocialLinks,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Edit social link success',
      });

      router.refresh();
    },
    onError: (err) => {
      console.log('err', err);

      toast({
        title: 'Error',
        description: 'Edit social link error',
      });
    },
  });

  const onSubmit = (val: TFormData) => {
    const body = {
      ...val,
      companyId: session?.user.id,
    };

    mutatiion.mutate(body);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <CFieldInput
          title="Basic Information"
          subTitle="Add elsewhere links to your company profile. You can add only username without full https links. "
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.facebook.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.instagram.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.linkedIn.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.twitter.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="https://www.youtube.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CFieldInput>

        <div className="flex justify-end">
          <Button size={'lg'}>Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default CSocialLinksForm;
