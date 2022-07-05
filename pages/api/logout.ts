// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

export const config = {
  api: {
    bodyParser: false
  }
}

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'method not supported'})
  }
  const cookies = new Cookies(req, res);
  cookies.set('accessToken');
  res.status(200).json({message: 'logout success'});
}
