import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

const routeStrategyMap = {};

export type PostDataType = {
  blocks: JSON;
  post_id: string;
  published: boolean;
  time_created: number;
  time_modified?: number;
  title: string;
};

const termsMap: Record<string, (match: any) => string> = {
  published: (match: boolean) => `published = ${match}`,
  time_created: (match: number) => `time_created = ${match}`,
  time_modified: (match: number) => `time_modified = ${match}`,
  post_id: (match: string) => `post_id = '${match}'`,
  title: (match: string) => `title = '${match}'`,
};

const postQuery = (postData: PostDataType) => {
  const { blocks, post_id, published, time_created, time_modified, title } =
    postData;

  if (!time_modified || time_created === time_modified) {
    const terms = ['post_id', 'time_created', 'blocks', 'published', 'title'];
    const values = [
      `'${post_id}'`,
      time_created,
      `'${JSON.stringify(blocks)}'`,
      published,
      `'${title}'`,
    ];

    if (time_modified) {
      terms.push('time_modified');
      values.push(time_modified);
    }

    return `insert into posts(${terms.join(', ')}) values(${values.join(
      ', '
    )})`;
  } else {
    const updateValues = [
      termsMap.time_modified(time_modified),
      `blocks = '${JSON.stringify(blocks)}'`,
      termsMap.title(title),
      termsMap.published(published),
    ];

    return `update posts set ${updateValues.join(
      ', '
    )} where post_id = '${post_id}'`;
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  // conform to type
  const postData = { ...body, time_created: body.time_created };
  delete postData.time;

  const queryString = postQuery(postData);

  const client = new Client(process.env.DB_URL);
  await client.connect();

  try {
    const results = await client.query(queryString);
    return new Response(
      JSON.stringify({
        status: 201,
        message: `${body.title} was successfully inserted.`,
      })
    );
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

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const conditions = {
    columns: new Array<string>(),
    clauses: new Array<string>(),
  };

  const searchTerms = Array.from(searchParams).reduce((acc, param) => {
    const [term, match] = param;

    if (match.length > 0) {
      acc.clauses.push(termsMap[term](match));
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
