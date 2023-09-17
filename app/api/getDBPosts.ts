import {
  Block,
  PostMinimalListing,
  PublishedPost,
  PublishedPostRaw,
  isPublishedPostRaw,
} from '@customTypes/PostTypes';
import {
  BlockData,
  HeaderBlockData,
  ListBlockData,
  QuoteBlockData,
  blockTypeGuard,
} from './_postHydrators/DBPostTypes';
import { Client } from 'pg';

const tagDictionary = {
  paragraph: (data: BlockData, id: string) => `<p key=${id}>${data.text}</p>`,
  header: (data: BlockData, id: string) => {
    if (blockTypeGuard<HeaderBlockData>(data, 'HeaderBlockData')) {
      const { level = 1, text = '' } = data;
      return `<h${level} key=${id}>${text}</h${level}>`;
    }
    return '';
  },
  list: (data: BlockData, id: string) => {
    if (blockTypeGuard<ListBlockData>(data, 'ListBlockData')) {
      const { style, items } = data;
      const tag = style === 'ordered' ? 'ol' : 'ul';
      return `<${tag}>
        ${items
          ?.map((item, index) => `<li key=${id + index}>${item}</li>`)
          .join('')}
      </${tag}>`;
    }

    return '';
  },
  quote: (data: BlockData, id: string) => {
    if (blockTypeGuard<QuoteBlockData>(data, 'QuoteBlockData')) {
      const { caption, alignment } = data;
      return `<blockquote class=${alignment}>${caption}</blockquote>`;
    }

    return '';
  },
  mermaid: (data: BlockData, id: string) => {
    console.log('FIGURE OUT MERMAID');
    // https://nextjournal.com/avidrucker/mermaidjs-dynamic-render
    // https://markdownmonster.west-wind.com/docs/_5ef0x96or.htm
    return '';
  },
};

export const processPost = (rawPost: PublishedPostRaw): PublishedPost => {
  const { blocks, title, time_created, post_tags } = rawPost;

  const dateCreated = new Date(parseInt(time_created, 10));

  const html: string = blocks.reduce((acc: string, block: Block) => {
    const { type: blockType, data, id } = block;
    if (typeof tagDictionary[blockType] === 'function') {
      acc += tagDictionary[blockType](data, id);
    }
    return acc;
  }, '');

  return {
    title,
    date: new Date(dateCreated),
    html,
    post_tags: post_tags || new Array<string>(),
  };
};

export const getDBPostById = async (
  id: string
): Promise<PublishedPost | undefined> => {
  // const queryString = `select * from posts where post_id = '${id}' limit 1`;
  const queryString = `SELECT posts.*, ARRAY_AGG(tags.tag_name) AS post_tags
	FROM posts
	LEFT JOIN posts_tags ON posts.post_id = posts_tags.post_key
	LEFT JOIN tags ON posts_tags.tag_key = tags.key_id
	WHERE posts.post_id = '${id}'
	GROUP BY posts.post_id`;

  const client = new Client(process.env.DB_URL);
  await client.connect();

  try {
    const results = (await client.query(queryString)).rows[0];

    if (isPublishedPostRaw(results)) {
      return processPost(results);
    } else {
      throw Error(`${id} did not return valid post object`);
    }
  } catch (err) {
    console.warn(err);
  } finally {
    client.end();
  }
};

export const getDBPosts = async (): Promise<
  PostMinimalListing[] | undefined
> => {
  const client = new Client(process.env.DB_URL);
  await client.connect();

  const queryString = `SELECT posts.post_id, posts.title, posts.time_created, posts.time_modified, ARRAY_AGG(tags.tag_name) AS post_tags
	FROM posts
	LEFT JOIN posts_tags ON posts.post_id = posts_tags.post_key
	LEFT JOIN tags ON posts_tags.tag_key = tags.key_id
	WHERE published = true
	GROUP BY posts.post_id
  ORDER BY time_created DESC`;

  try {
    const results = await client.query(queryString);
    return results.rows.map(
      ({
        post_id,
        post_tags,
        title,
        time_created,
        time_modified = '0',
      }: {
        post_id: string;
        post_tags: string[];
        title: string;
        time_created: string;
        time_modified: string;
      }) => {
        const dc = parseInt(time_created, 10);
        const dm = parseInt(time_modified, 10) || 0;

        const date = dc > dm ? dc : dm;
        return {
          date,
          post_id,
          post_tags,
          title,
          url: encodeURIComponent(
            title.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-')
          ),
        };
      }
    );
  } catch (err) {
    console.warn(err);
  } finally {
    client.end();
  }
};
