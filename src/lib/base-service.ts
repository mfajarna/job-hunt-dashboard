import axios, { Method } from 'axios';

type BaseServiceType = {
  path: string;
  method: Method;
  bodyReq?: {};
  headers?: {};
  signal?: AbortSignal;
  timeout?: number;
};

const instance = axios.create({
  timeout: 20000,
});

export default function baseService({
  path,
  method,
  bodyReq,
  headers,
  signal,
  timeout,
}: BaseServiceType) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const url: string = (baseUrl ?? '') + path;
  const url = '/api' + path;

  console.log('url', url);

  return instance
    .request({
      method,
      url,
      headers,
      data: bodyReq,
      signal,
      timeout,
    })
    .then((res) => {
      // console.log('Data Response', res);

      return res.data;
    });
}
