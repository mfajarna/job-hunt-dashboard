import bcrypt from 'bcryptjs';
import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';
import { supabaseGetPublicUrl } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};

export const dateFormat = (date: any, format: string = 'DD-MM-YYYY') => {
  return moment(date).format(format);
};

export const parseCompany = async (data: any) => {
  let imageCompanyName = data.CompanyOverview[0]?.image;
  let imageCompanyUrl;

  if (imageCompanyName) {
    imageCompanyUrl = await supabaseGetPublicUrl(
      `public/${imageCompanyName}`,
      'company'
    );
  } else {
    imageCompanyUrl = '/images/company.png';
  }

  const companyOverview = data.CompanyOverview[0];
  const companySocialMedia = data.CompanySocialMedia[0];
  const companyTeams = data.CompanyTeam;

  const jobs = data.Job.map((item: any) => {
    const val = {
      ...item,
      image: imageCompanyUrl,
      location: companyOverview.location,
      type: companyOverview.industry,
      category: {
        id: item.CategoryJob.id,
        name: item.CategoryJob.name,
      },
    };

    return val;
  });

  const company = {
    id: data.id,
    name: data.name,
    email: data.email,
    totalJobs: data._count?.Job,
    detail: {
      ...companyOverview,
      image: imageCompanyUrl,
    },
    socialMedia: companySocialMedia,
    teams: companyTeams,
    latestJobs: jobs,
  };

  return company;
};

export const getResumeFileUrl = async (data: any) => {
  const fileNameResource = data[0]?.resume;
  let fileName;

  if (fileNameResource) {
    fileName = await supabaseGetPublicUrl(
      `/public/${fileNameResource}`,
      'applicant'
    ).publicUrl;
  } else {
    fileName = '';
  }

  return fileName;
};
