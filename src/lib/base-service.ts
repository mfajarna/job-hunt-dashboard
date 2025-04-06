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
  // const url: string = process.env.NEXT_PUBLIC_BASE_URL + path;

  const url = path;

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
      return res.data;
    });
}
