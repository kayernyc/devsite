import type { NextRequest } from 'next/server';

function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}

const titleRegEx =
  /<title[a-zA-Z0-9 ,."'=\-\—]*\>(?<titlecapture>[&$@|…a-zA-Z0-9 ,.\-\—"'=]*)\<\/title\>/gm;

const contentRegEx =
  /\<meta[a-zA-Z0-9 -="']*name="description"[a-zA-Z0-9 -="']*content="(?<contentStr>[&a-zA-Z0-9 -="'…]*)"[a-zA-Z0-9 -="']*[\/]*>/gm;

const parseHTML = (str: string) => {
  const parseResults = {
    title: '',
    description: '',
  };

  const [titleMatches] = Array.from(str.matchAll(titleRegEx));
  if (titleMatches.groups) {
    const { groups } = titleMatches;
    parseResults.title = groups.titlecapture;
  }

  const [match] = Array.from(str.matchAll(contentRegEx));

  if (match.groups) {
    const { groups } = match;
    parseResults.description = groups.contentStr;
  }

  return parseResults;
};

const getMeta = async (request: NextRequest) => {
  let url = request.nextUrl.searchParams.get('url');
  if (url) {
    if (!url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const linkResults = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => {
        const document = await data.text();
        const options = parseHTML(document);

        return {
          success: 1,
          meta: { ...options },
        };
      })
      .catch((err) => {
        console.warn(err);
      });

    return new Response(
      JSON.stringify({
        success: 1,
        link: url,
        meta: { ...linkResults },
      })
    );
  }

  return new Response(
    JSON.stringify({
      success: 1,
      link: url,
      meta: {},
    })
  );
};

export { getMeta as GET };
