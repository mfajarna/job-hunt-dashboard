import baseService from './base-service';

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  return res.json() as Promise<JSON>;
}

export async function actionSignUp(args: any): Promise<any> {
  return baseService({
    path: '/company/new-user',
    method: 'POST',
    bodyReq: args,
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.data);
}

export function companyOverview(args: any): Promise<any> {
  return baseService({
    path: '/company/overview',
    method: 'POST',
    bodyReq: args,
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.data);
}

export function getCompanyIndustry(): Promise<any> {
  return baseService({
    path: '/company/industry',
    method: 'GET',
  }).then((response) => response);
}

export function companySocialLinks(args: any): Promise<any> {
  return baseService({
    path: '/company/social-links',
    method: 'POST',
    bodyReq: args,
  }).then((response) => response.data);
}

export function companyTeam(args: any): Promise<any> {
  return baseService({
    path: '/company/team',
    method: 'POST',
    bodyReq: args,
  }).then((response) => response.data);
}

export function deleteJob(jobId: string): Promise<any> {
  return baseService({
    path: `/job?id=${jobId}`,
    method: 'DELETE',
  }).then((response) => response.data);
}

export function addJob(args: any): Promise<any> {
  return baseService({
    path: '/job',
    method: 'POST',
    bodyReq: args,
  }).then((response) => response.data);
}

export function updateApplicant(args: any): Promise<any> {
  return baseService({
    path: `/applicant?id=${args.id}`,
    method: 'PUT',
    bodyReq: args,
  }).then((response) => response.data);
}
