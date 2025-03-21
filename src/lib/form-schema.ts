import { JOBTYPES } from '@/constants';
import { z } from 'zod';

export const jobFormSchema = z
  .object({
    roles: z
      .string({ required_error: 'Job Title is required' })
      .min(3, { message: 'Job title must be at least 3 characters' }),

    jobType: z.enum(JOBTYPES, { required_error: 'You need select a job type' }),
    salaryFrom: z.string({ required_error: 'Salary from is required' }),
    salaryTo: z.string({ required_error: 'Salary to is required' }),
    categoryId: z.string({ required_error: 'You need to select a category' }),
    requiredSkills: z
      .string()
      .array()
      .nonempty({ message: 'Required skill must be at least 1 skill' }),
    jobDescription: z
      .string({ required_error: 'Job Description is required' })
      .min(10, { message: 'Job Description must at least 10 characters' }),
    responsibility: z
      .string({ required_error: 'Responsibility is required' })
      .min(10, { message: 'Responsibility must at least 10 characters' }),
    needs: z.string({ required_error: 'Needs is required' }),
    dueDate: z.date({ required_error: 'Due date is required' }),
    whoYouAre: z
      .string({ required_error: 'Who You Are is required' })
      .min(10, { message: 'Who You Are must at least 10 characters' }),
    niceToHaves: z
      .string({ required_error: 'Nice to Haves is required' })
      .min(10, { message: 'Nice to Haves must at least 10 characters' }),
    benefits: z
      .object({
        benefit: z.string(),
        description: z.string(),
      })
      .array()
      .nonempty({ message: 'Benefits must at least 1 benefit' }),
  })
  .refine((data) => Number(data.salaryFrom) < Number(data.salaryTo), {
    path: ['salaryFrom'], // Highlight salaryFrom on error
    message: 'Salary From must be less than Salary To',
  })
  .refine((data) => Number(data.salaryFrom) !== Number(data.salaryTo), {
    path: ['salaryTo'], // Highlight salaryTo on error
    message: 'Salary From and Salary To cannot be the same',
  });

export const overviewFormSchema = z.object({
  image: z
    .any()
    .refine((item: any) => item?.name, { message: 'Image is required.' }),
  companyName: z.string({ required_error: 'Name is required' }),
  website: z.string({ required_error: 'Website is required' }),
  location: z.string({ required_error: 'Location is required' }),
  employee: z.string({ required_error: 'Employee is required' }),
  industry: z.string({ required_error: 'Industry is required' }),
  dateFounded: z.date({ required_error: 'Date Found is required' }),
  techStack: z
    .string({ message: 'Tech Stack is required.' })
    .array()
    .nonempty({ message: 'Tech stack must be at least 1 data' }),
  description: z.string({ required_error: 'Description is required' }),
});

export const socialMediaFormSchema = z.object({
  facebook: z.string({ required_error: 'Facebook link is required' }),
  instagram: z.string({ required_error: 'Instagram link is required' }),
  linkedin: z.string({ required_error: 'linkedIn link is required' }),
  twitter: z.string({ required_error: 'Twitter link is required' }),
  youtube: z.string({ required_error: 'Youtube link is required' }),
});

export const teamFormSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  position: z.string({ required_error: 'Position is required. ' }),
  instagram: z.string({ required_error: 'Instagram is required. ' }),
  linkedin: z.string({ required_error: 'LinkedIn is required. ' }),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email is not valid' }),
  password: z.string({ required_error: 'Password is required' }),
});

export const signUpFormSchema = z
  .object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email is not valid' }),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(/^.{8,20}$/, {
        message: 'Minimum 8 and maximum 20 characters.',
      })
      .regex(/(?=.*[A-Z])/, {
        message: 'At least one uppercase character.',
      })
      .regex(/(?=.*[a-z])/, {
        message: 'At least one lowercase character.',
      })
      .regex(/(?=.*\d)/, {
        message: 'At least one digit.',
      })
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
        message: 'At least one special character.',
      }),
    confirm_password: z.string({
      required_error: 'Password confirmation is required',
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
