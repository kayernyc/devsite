import {
  BlockData,
  BlockType,
  HeaderBlockData,
  ListBlockData,
  QuoteBlockData,
  blockTypeGuard,
} from './_postHydrators/DBPostTypes';
import { Client } from 'pg';

type Block = {
  data: BlockData | HeaderBlockData | ListBlockData | QuoteBlockData;
  id: string;
  type: BlockType;
};

export type PublishedPostRaw = {
  post_id: string;
  time_created: string;
  time_modified?: string | null;
  blocks: Block[];
  published: boolean;
  title: string;
};

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

    console.log('HEREKKKKKK');

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

export const processPost = (rawPost: PublishedPostRaw) => {
  console.log({ rawPost });
  const { blocks, title, time_created } = rawPost;

  const dateCreated = new Date(parseInt(time_created, 10));

  const html: string = blocks.reduce((acc: string, block: Block) => {
    const { type: blockType, data, id } = block;
    if (typeof tagDictionary[blockType] === 'function') {
      acc += tagDictionary[blockType](data, id);
    }
    return acc;
  }, '');

  /*
      title
      date (as string)
      html
    */

  return {
    title,
    date: `${dateCreated.toISOString().slice(0, 10)}`,
    html,
  };
};

export const getDBPosts = async () => {
  const client = new Client(process.env.DB_URL);
  await client.connect();

  const queryString = `select * from posts where published is true`;

  try {
    const results = await client.query(queryString);
    const posts = results.rows.map((post: PublishedPostRaw) =>
      processPost(post)
    );
  } catch (err) {
    console.warn(err);
  } finally {
    client.end();
  }
};
