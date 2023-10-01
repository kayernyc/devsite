import { NextApiRequest, NextApiResponse } from 'next';

export enum RestMethod {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
}

export type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextApiResponse;
