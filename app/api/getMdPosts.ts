import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import * as shiki from 'shiki';
import { unified } from 'unified';

import { PostMinimalListing, PublishedPost } from '@customTypes/PostTypes';
import rehypeShiki from '@leafac/rehype-shiki';

let parserPre: ReturnType<typeof getParserPre> | undefined;

const getParserPre = async () => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'poimandres' }),
    })
    .use(rehypeStringify)
    .use(rehypeSlug);
};

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
const getParser = () => {
  if (!parserPre) {
    parserPre = getParserPre().catch((err: Error) => {
      parserPre = undefined;
      throw err;
    });
  }
  return parserPre;
};

// CREDIT WHERE CREDIT IS DUE - Based on an example by Colin Diesh : https://cmdcolin.github.io/

const allSources = ['_posts', '_projects'];

// url
const postMap: Record<string, string> = {};

const titleMap: Record<string, [string, string]> = {};

const postByIdForMap = async (id: string): Promise<PostMinimalListing> => {
  const dirId = postMap[id];
  const fullPath = join(dirId, `${id}.md`);

  const { data, content } = matter(
    await fs.promises.readFile(fullPath, 'utf8'),
  );

  const url = encodeURIComponent(
    data.title.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-'),
  );

  titleMap[url] = [id, dirId];

  return {
    post_id: id,
    post_tags: data.tags || Array<string>(),
    title: data.title,
    date: new Date(data.date).getTime(),
    url,
  };
};

const createTitleMap = async (postMap: Record<string, string>) => {
  const allPostIds = Object.entries(postMap).map(([id]) => id);

  await Promise.all(
    allPostIds
      .map((id) => postByIdForMap(id))
      .map((thing) => {
        return thing;
      }),
  );
};

const mapAllPosts = async () => {
  for (let source of allSources) {
    const posts = await Promise.all(
      fs.readdirSync(source).map((id: string) => [id, source]),
    );

    posts.forEach(([id, source]) => {
      const realId = id.replace(/\.md$/, '');
      postMap[realId] = source;
    });

    await createTitleMap(postMap);
  }
};

const isMapReady = () => {
  return Object.keys(postMap).length > 0 && Object.keys(titleMap).length > 0;
};

export const getAllAndById = (source: string[] = allSources) => {
  let allPosts: PostMinimalListing[];
  if (!isMapReady()) {
    mapAllPosts();
  }

  const getPostById = async (id: string): Promise<PublishedPost> => {
    if (!isMapReady()) {
      await mapAllPosts();
    }

    const [mdPath, dirId] = titleMap[id];
    const fullPath = join(dirId, `${mdPath}.md`);

    const { data, content } = matter(
      await fs.promises.readFile(fullPath, 'utf8'),
    );

    const parser = await getParser();
    const html = await parser.process(content);

    return {
      title: data.title,
      date: new Date(data.date),
      html: html.value.toString(),
      post_tags: data.tags,
    };
  };

  const sortAllPosts = async () => {
    if (!allPosts) {
      const allPostIds = Object.entries(postMap)
        .filter(([_, dirId]: [string, string]) => {
          return source.includes(dirId);
        })
        .map(([id]) => id);

      const posts = await Promise.all(
        allPostIds
          .map((id) => postByIdForMap(id))
          .map((thing) => {
            return thing;
          }),
      );

      allPosts = posts.sort((post1, post2) =>
        post1.date > post2.date ? -1 : 1,
      );
    }
  };

  const getAllPosts = async (): Promise<PostMinimalListing[]> => {
    if (!isMapReady) {
      await mapAllPosts();
    }

    if (!allPosts) {
      await sortAllPosts();
    }

    return allPosts;
  };

  return { getPostById, getAllPosts };
};
