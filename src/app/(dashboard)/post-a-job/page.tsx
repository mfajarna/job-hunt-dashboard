'use client';

import CFieldInput from '@/components/organism/CFieldInput/CFieldInput';
import CInputBenefit from '@/components/organism/CInputBenefit/CInputBenefit';
import CInputSkill from '@/components/organism/CInputSkill/CInputSkill';
import CKEditor from '@/components/organism/CKEditor/CKEditor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { JOBTYPES } from '@/constants';
import { useRouterNavigation } from '@/hooks/useRouterNavigation';
import { jobFormSchema } from '@/lib/form-schema';
import { addJob, fetcher } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CategoryJob } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

type PostJobPageProps = {};

type formType = z.infer<typeof jobFormSchema>;

const PostJobPage: FC<PostJobPageProps> = ({}) => {
  const { goBack, navigate } = useRouterNavigation();

  const { toast } = useToast();

  const [isEditorLoaded, setIsEditorLoaded] = React.useState<boolean>(false);

  const { data, error, isLoading } = useSWR<CategoryJob[]>(
    '/api/job/categories',
    fetcher
  );

  const { data: session } = useSession();

  const form = useForm<formType>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      requiredSkills: [],
    },
  });

  const mutation = useMutation({
    mutationFn: addJob,
    onSuccess: async (data: any) => {
      await toast({
        title: 'Success',
        description: 'Success add a new job',
      });

      await navigate('/job-listings');
    },
    onError: (err: any) => {
      toast({
        title: 'Error',
        description: 'Please try again',
      });
    },
  });

  const onSubmit = async (val: formType) => {
    try {
      const bodyArgs: any = {
        applicants: 0,
        benefits: val.benefits,
        categoryId: val.categoryId,
        companyId: (session?.user as any)?.id,
        datePosted: moment().toDate(),
        description: val.jobDescription,
        statusJob: 'live',
        dueDate: val.dueDate,
        jobType: val.jobType,
        needs: Number(val.needs),
        niceToHaves: val.niceToHaves,
        requiredSkills: val.requiredSkills,
        responsibility: val.responsibility,
        roles: val.roles,
        salaryFrom: val.salaryFrom,
        salaryTo: val.salaryTo,
        whoYouAre: val.whoYouAre,
      };

      mutation.mutate(bodyArgs);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Please try again',
      });
    }
  };

  const isLoadingJob = mutation.isPending && !mutation.isSuccess;

  React.useEffect(() => {
    setIsEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="inline-flex items-center gap-2 cursor-pointer hover:text-primary">
        <ArrowLeftIcon className="w-7 h-7" onClick={() => goBack()} />
        <span className="text-2xl font-semibold">Post a Job</span>
      </div>

      <div className="my-5">
        <div className="text-lg font-semibold">Basic Information</div>
        <div className="text-gray-500">List of your top perks and benefits</div>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-5 space-y-6 pt-6"
        >
          {/* Job Roles Form */}
          <CFieldInput
            title="Job Title"
            subTitle="Job titles must be describe one position"
          >
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="e.g. Software Engineer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>At least 80 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CFieldInput>

          {/* Job Types Form */}
          <CFieldInput
            title="Type of Employement"
            subTitle="You can select multiple type of employement"
          >
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {JOBTYPES.map((item: string, i: number) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={i}
                        >
                          <FormControl>
                            <RadioGroupItem value={item} />
                          </FormControl>
                          <FormLabel className="font-normal">{item}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CFieldInput>

          {/* Salary Form */}
          <CFieldInput
            title="Salary"
            subTitle="Please specify the estimated salary range for the role. *You can leave this blank"
          >
            <div className="flex flex-row w-[450px] justify-between items-center">
              <FormField
                control={form.control}
                name="salaryFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Rp. 100.000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span className="text-center">to</span>

              <FormField
                control={form.control}
                name="salaryTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full"
                        placeholder="Rp. 10.000.000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CFieldInput>

          <CFieldInput
            title="Categories"
            subTitle="You can select multiple job categories"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Job Categories</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[450px]">
                        <SelectValue placeholder="Select job categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CFieldInput>

          <CFieldInput title="Needs" subTitle="Add needs for this job">
            <FormField
              control={form.control}
              name="needs"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="w-[450px]"
                      placeholder="e.g. 20"
                      type={'number'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CFieldInput>

          <CFieldInput title="Due Date" subTitle="Due date for this job">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
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
                          date < new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CFieldInput>

          <CFieldInput
            title="Required Skills"
            subTitle="Add required skills for the job"
          >
            <CInputSkill form={form} label="Add Skills" name="requiredSkills" />
          </CFieldInput>

          <CFieldInput
            title="Job Description"
            subTitle="Job titles must be describe one position"
          >
            <CKEditor
              form={form}
              name="jobDescription"
              editorLoaded={isEditorLoaded}
            />
          </CFieldInput>

          <CFieldInput
            title="Responsibilities"
            subTitle="Outline the core Responsibilities of the position"
          >
            <CKEditor
              form={form}
              name="responsibility"
              editorLoaded={isEditorLoaded}
            />
          </CFieldInput>

          <CFieldInput
            title="Who You Are"
            subTitle="Add your preferred candidates qualifications"
          >
            <CKEditor
              form={form}
              name="whoYouAre"
              editorLoaded={isEditorLoaded}
            />
          </CFieldInput>

          <CFieldInput
            title="Nice to Haves"
            subTitle="Add nice-to-haves skills and qualifications for the role to encourage a more diverse set of cadidates to apply"
          >
            <CKEditor
              form={form}
              name="niceToHaves"
              editorLoaded={isEditorLoaded}
            />
          </CFieldInput>

          <CFieldInput
            title="Perks and Benefit"
            subTitle="Encourage more poeple to apply by sharing the attractive rewards and benefits you offer your employees"
          >
            <CInputBenefit form={form} />
          </CFieldInput>

          <div className="flex justify-end">
            <Button size={'lg'} disabled={isLoadingJob}>
              Do a Review
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostJobPage;
