import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@libs/db';
import { Client } from 'pg';

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
  const { searchParams } = request.nextUrl;
  console.log('search params', searchParams.entries());
  const conditions = {
    columns: new Array<string>(),
    clauses: new Array<string>(),
  };
  const searchTerms = Array.from(searchParams).reduce((acc, param) => {
    const [term, match] = param;

    if (match.length > 0) {
      acc.clauses.push(`${term} is ${match}`);
    } else {
      acc.columns.push(term);
    }

    return acc;
  }, conditions);

  const columns = searchTerms.columns.join(', ');
  let clauses: string = '';

  if (searchTerms.clauses.length > 0) {
    clauses = `WHERE ${searchTerms.clauses.join(' AND ')}`;
  }

  const queryString = `SELECT ${columns || '*'} FROM posts ${clauses}`;
  const client = new Client(process.env.DB_URL);

  await client.connect();

  try {
    const results = await client.query(queryString);
    return new Response(JSON.stringify({ status: 201, posts: results.rows }));
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) {
      message = err.message;
    }
    console.error('error executing query:', err);
    return new Response(JSON.stringify({ status: 400, message }));
  } finally {
    client.end();
  }
}
