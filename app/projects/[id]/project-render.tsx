'use client';

import { formatDate } from '@components/date-tag';
import { PublishedPost } from '@customTypes/PostTypes';

export const ProjectRender = ({ post }: { post: PublishedPost }) => {
  const { html, title, date, post_tags } = post;

  return (
    <main>
      <h2>{title} - Project</h2>
      {formatDate(date.getTime())}
      <h4>{post_tags.join(', ')}</h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
};
