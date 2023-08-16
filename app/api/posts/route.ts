import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@libs/db';

const routeStrategyMap = {};

export async function POST(request: NextRequest) {
  console.log({ request });
  const body = await request.json();
  const { blocks, time, published } = body;

  const db = await getDB();
  await db
    .run(
      `INSERT INTO Posts (timeStamp, blocks, published) VALUES (:timeStamp, :blocks, :published)`,
      { ':timeStamp': time, ':blocks': blocks, ':published': published }
    )
    .catch((err) => {
      throw Error(err);
    });
  db.close();
  return new Response(JSON.stringify({ status: 201, message: 'YAY' }));
}

export async function GET(request: NextRequest) {
  console.log({ request });
  const body = await request.json();
  console.log({ body });

  const db = await getDB();
  const results = await db.all(`SELECT * FROM Posts`).catch((err) => {
    throw Error(err);
  });

  db.close();

  return new Response(JSON.stringify({ status: 201, message: results }));
}
