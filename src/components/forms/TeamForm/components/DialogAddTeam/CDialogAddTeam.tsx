import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { teamFormSchema } from '@/lib/form-schema';
import { companyTeam } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TFormData = z.infer<typeof teamFormSchema>;

const CDialogAddTeam = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: companyTeam,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Add team company success',
      });

      await setIsOpen(!open);

      router.refresh();
    },
    onError: (err) => {
      console.log('err', err);

      toast({
        title: 'Error',
        description: 'Add team company error',
      });
    },
  });

  const form = useForm<TFormData>({
    resolver: zodResolver(teamFormSchema),
  });

  const onSubmit = (val: TFormData) => {
    const body = {
      ...val,
      companyId: session?.user.id,
    };

    mutation.mutate(body);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary" onClick={() => setIsOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader onClick={() => setIsOpen(!open)}>
          <DialogTitle>Add new team</DialogTitle>
          <DialogDescription>Fill the field to add new team</DialogDescription>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="Instagram" {...field} />
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
                      <Input placeholder="LinkedIn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CDialogAddTeam;
