import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { RestMethod } from '@libs/restMethods';
import { getDB } from '@libs/db';

const routeStrategyMap = {};

export async function POST(request: NextRequest) {
  console.log({ request });
  const body = await request.json();
  console.log({ body });

  const db = getDB();

  return new Response(
    JSON.stringify({ status: 201, message: 'Your email has been sent.' })
  );
}
