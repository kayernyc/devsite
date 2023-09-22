import { Client } from 'pg';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { tag_name, tag_id } = body;

  const client = new Client(process.env.DB_URL);
  await client.connect();

  try {
    const queryString = `INSERT INTO tags(tag_id, tag_name) VALUES('${tag_id}', '${tag_name}')`;
    await client.query(queryString);

    return new Response(
      JSON.stringify({
        status: 201,
        message: `${tag_name} successfully inserted.`,
      })
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error.';
    return new Response(
      JSON.stringify({
        status: 400,
        message: `Error inserting ${tag_name}. ${message}`,
      })
    );
  } finally {
    client.end();
  }
}

export async function GET(request: NextRequest) {
  const queryString = `SELECT * FROM tags`;

  const client = new Client(process.env.DB_URL);
  await client.connect();

  try {
    const results = await client.query(queryString);
    return new Response(JSON.stringify({ status: 201, tags: results.rows }));
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
