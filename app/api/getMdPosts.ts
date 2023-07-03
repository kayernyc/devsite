import fs from 'fs'
import { join } from 'path'

import matter from 'gray-matter';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeShiki from '@leafac/rehype-shiki';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import * as shiki from 'shiki';
import { unified } from 'unified';

let parserPre: ReturnType<typeof getParserPre> | undefined;

export type MDPost = {
  title: any;
  id: string;
  date: string;
  html: string;
};

let allPosts: MDPost[];

const getParserPre = async () => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'poimandres' }),
    })
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      content: arg => ({
        type: 'element',
        tagName: 'a',
        properties: {
          href: '#' + arg.properties?.id,
          style: 'color: purple; margin-right: 10px;',
        },
        children: [{ type: 'text', value: '#' }],
      }),
    });
}

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
const getParser = () => {
  if (!parserPre) {
    parserPre = getParserPre().catch((err: Error) => {
      parserPre = undefined
      throw err
    });
  }
  return parserPre;
}

export const getPostById = async (id: string): Promise<MDPost> => {
  const realId = id.replace(/\.md$/, '');
  const fullPath = join('_posts', `${realId}.md`);
  const { data, content } = matter(await fs.promises.readFile(fullPath, 'utf8'));

  const parser = await getParser();
  const html = await parser.process(content);

  return {
    ...data,
    title: data.title,
    id: realId,
    date: `${data.date?.toISOString().slice(0, 10)}`,
    html: html.value.toString(),
  };
}

export const getAllPosts = async ():Promise<MDPost[]> => {
  if (!allPosts) {
    const posts = await Promise.all(
      fs.readdirSync('_posts').map(id => getPostById(id)),
    )
    allPosts = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  }

  return allPosts;
}

// CREDIT WHERE CREDIT IS DUE - Based on an example by Colin Diesh : https://cmdcolin.github.io/