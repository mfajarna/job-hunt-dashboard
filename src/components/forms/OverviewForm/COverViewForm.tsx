'use client';

import CTitleForm from '@/components/atoms/CTitleForm';
import CCustomUpload from '@/components/organism/CCustomUpload/CCustomUpload';
import CFieldInput from '@/components/organism/CFieldInput/CFieldInput';
import CInputSkill from '@/components/organism/CInputSkill/CInputSkill';
import CKEditor from '@/components/organism/CKEditor/CKEditor';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { EMPLOYEE_OPTIONS, LOCATION_OPTIONS } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { overviewFormSchema } from '@/lib/form-schema';
import { companyOverview, getCompanyIndustry } from '@/lib/http';
import { supabaseUploadFile } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyOverview, Industry } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormType = z.infer<typeof overviewFormSchema>;

type OverviewFormProps = {
  detail: CompanyOverview | undefined;
};

const COverViewForm: FC<OverviewFormProps> = ({ detail }) => {
  const [isEditorLoaded, setIsEditorLoaded] = React.useState<boolean>(false);

  const { data: dataIndustry } = useQuery({
    queryKey: ['Company Industry Data'],
    queryFn: async () => {
      const res = await getCompanyIndustry();

      return res;
    },
  });

  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      dateFounded: detail?.dateFounded,
      description: detail?.description,
      employee: detail?.employee,
      image: detail?.image,
      industry: detail?.industry,
      location: detail?.location,
      companyName: detail?.companyName,
      techStack: detail?.techStack,
      website: detail?.website,
    },
  });

  const mutationOverview = useMutation({
    mutationFn: companyOverview,
    onSuccess: async () => {
      await toast({
        title: 'Success',
        description: 'Edit profile success',
      });

      router.refresh();
    },
    onError: (err) => {
      console.log('err', err);

      toast({
        title: 'Error',
        description: 'Edit profile error',
      });
    },
  });

  const onSubmit = async (val: FormType) => {
    try {
      let fileName = '';

      // Supabase upload file
      if (typeof val.image === 'object') {
        const uploadImg = await supabaseUploadFile(val.image, 'company');
        fileName = uploadImg.fileName;
      } else {
        fileName = val.image;
      }

      const body = {
        ...val,
        image: fileName,
        companyId: session?.user.id,
      };

      mutationOverview.mutate(body);
    } catch (error) {
      await toast({
        title: 'Error',
        description: 'Edit profile error',
      });

      console.log('error edit profile', error);
    }
  };

  React.useEffect(() => {
    setIsEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="my-5">
        <CTitleForm
          title="Basic Information"
          subTitle="This is company information that you can update anytime."
        />
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 mt-5">
          <CFieldInput
            title="Company Logo"
            subTitle="This image will be shown publicly as company logo."
          >
            <div className="space-y-3">
              <CCustomUpload form={form} name="image" />

              <div className="text-sm text-red-500">
                {form.formState.errors.image?.message}
              </div>
            </div>
          </CFieldInput>

          <CFieldInput
            title="Company Details"
            subTitle="Introduce your company core info quickly to users by fill up company details"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="e.g. Twitter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://www.twitter.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[450px]">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {LOCATION_OPTIONS.map((item, index) => (
                          <SelectItem value={item.id} key={index}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4 w-[450px]">
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYEE_OPTIONS.map((item, index) => (
                            <SelectItem value={item.id} key={index}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dataIndustry?.map(
                            (item: Industry, index: number) => (
                              <SelectItem value={item.name} key={index}>
                                {item.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateFounded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Founded</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[450px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CInputSkill
                form={form}
                label="Add Tech Stack"
                name="techStack"
              />
            </div>
          </CFieldInput>

          <CFieldInput
            title="About Company"
            subTitle="Brief description for your company. URLs are hyperlinked."
          >
            <CKEditor
              form={form}
              name={'description'}
              editorLoaded={isEditorLoaded}
            />
          </CFieldInput>

          <div className="flex justify-end">
            <Button type="submit" size={'lg'}>
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default COverViewForm;
