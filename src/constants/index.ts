import { EnumValues } from 'zod';

export type TOption = {
  id: string;
  label: string;
};

export const JOBTYPES: EnumValues = [
  'Full-Time',
  'Part-Time',
  'Remote',
  'Internship',
];

export const JOB_LISTING_COLUMNS: string[] = [
  'Roles',
  'Status',
  'Date Posted',
  'Due Date',
  'Job Type',
  'Applicants',
  'Needs',
];

export const JOB_LISTING_ALL_ALPLICANTS: string[] = [
  'Name',
  'Email',
  'Phone',
  'Job Status',
  'Job Position',
];

export const JOB_APPLICANT_COLUMNS: string[] = [
  'Name',
  'Email',
  'Phone',
  'Previous Job',
  'Status',
];

export const JOB_APPLICANT_DATA = [
  {
    name: 'John Doe',
    appliedDate: '23 Aug 2023',
  },
];

export const JOB_LISTING_DATA = [
  {
    id: 1,
    roles: 'Software Engineer',
    status: 'Live',
    datePosted: '12 Aug 2023',
    dueDate: '12 Sep 2023',
    jobType: 'Full-Time',
    applicants: 1,
    needs: 10,
  },
];

export const LOCATION_OPTIONS: TOption[] = [
  {
    id: 'Indonesia',
    label: 'Indonesia',
  },
];

export const EMPLOYEE_OPTIONS: TOption[] = [
  {
    id: '1-50',
    label: '1-50',
  },
  {
    id: '51-150',
    label: '51-150',
  },
  {
    id: '151-250',
    label: '151-250',
  },
  {
    id: '251-500',
    label: '251-500',
  },
  {
    id: '501-1000',
    label: '501-1000',
  },
  {
    id: '501-Above',
    label: '501-Above',
  },
];
