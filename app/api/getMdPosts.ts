import * as shiki from 'shiki';
import fs from 'fs';
import { getDBPosts } from './getDBPosts';
import { join } from 'path';

import matter from 'gray-matter';
import rehypeShiki from '@leafac/rehype-shiki';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

let parserPre: ReturnType<typeof getParserPre> | undefined;

export type MDPost = {
  title: any;
  id: string;
  date: string;
  tags?: string[];
  html: string;
};

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

const allSources = ['_posts', '_projects'];

const postMap: Record<string, string> = {};

const mapAllPosts = async () => {
  for (let source of allSources) {
    const posts = await Promise.all(
      fs.readdirSync(source).map((id: string) => [id, source])
    );

    posts.forEach(([id, source]) => {
      const realId = id.replace(/\.md$/, '');
      postMap[realId] = source;
    });
  }
};

const isMapReady = () => {
  return Object.keys(postMap).length > 0;
};

export const getAllAndById = (source: string[] = allSources) => {
  getDBPosts();
  let allPosts: MDPost[];
  if (!isMapReady()) {
    mapAllPosts();
  }

  const getPostById = async (id: string): Promise<MDPost> => {
    if (!isMapReady()) {
      await mapAllPosts();
    }
    const dirId = postMap[id];
    const fullPath = join(dirId, `${id}.md`);

    const { data, content } = matter(
      await fs.promises.readFile(fullPath, 'utf8')
    );

    const parser = await getParser();
    const html = await parser.process(content);

    return {
      ...data,
      title: data.title,
      id,
      date: `${data.date?.toISOString().slice(0, 10)}`,
      html: html.value.toString(),
    };
  };

  const getAllPosts = async (): Promise<MDPost[]> => {
    if (!isMapReady) {
      await mapAllPosts();
    }

    if (!allPosts) {
      const allPostIds = Object.entries(postMap)
        .filter(([id, dirId]: [string, string]) => {
          return source.includes(dirId);
        })
        .map(([id]) => id);

      const posts = await Promise.all(allPostIds.map((id) => getPostById(id)));

      allPosts = posts.sort((post1, post2) =>
        post1.date > post2.date ? -1 : 1
      );
    }

    return allPosts;
  };

  return { getPostById, getAllPosts };
};

// CREDIT WHERE CREDIT IS DUE - Based on an example by Colin Diesh : https://cmdcolin.github.io/
