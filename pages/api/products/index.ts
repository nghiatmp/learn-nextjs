// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = 'https://js-post-api.herokuapp.com/api/posts';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const posts = await response.json();
  console.log(posts);
  
  res.status(200).json({ data: posts})
}
