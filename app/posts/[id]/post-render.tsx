'use client';

import { PublishedPost } from '@customTypes/PostTypes';
import { formatDate } from '@components/date-tag';

export const PostRender = ({ post }: { post: PublishedPost }) => {
  const { html, title, date, post_tags } = post;

  return (
    <main>
      <h1>{title}</h1>
      {formatDate(date.getTime())}
      <h4>{post_tags.join(', ')}</h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};
