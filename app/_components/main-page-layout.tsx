'use client';

import Link from 'next/link';
import { MDPost } from '@api/getMdPosts';

import { formatDate } from './date-tag';
import styled from 'styled-components';

const MainPage = styled.main``;

const PageLi = styled.li`
  margin-block-start: 4rem;
`;

const PostLi = styled(PageLi)``;

const ProjectLi = styled(PageLi)`
  margin-left: 2rem;
`;

const displayTags = (tags?: string[]) => {
  if (!tags) {
    return '';
  }

  return (
    <p>
      {tags.filter((tag) => tag !== 'post' && tag !== 'project').join(', ')}
    </p>
  );
};

const teaserText = (html: string) => {
  return 'why is this a string and not a processed tag?';
};

export const MainPageLayout = ({ posts }: { posts: MDPost[] }) => {
  return (
    <MainPage>
      <ul>
        {posts.map(({ id, date, html, title, tags }, index) => {
          let Tag = tags?.includes('post') ? PostLi : ProjectLi;
          return (
            <Tag key={id}>
              <Link href={`/posts/${id}`}>
                <strong>{title}</strong>
                {formatDate(date)}
                {displayTags(tags)}
                {index === 0 ? teaserText(html) : ''}
              </Link>
            </Tag>
          );
        })}
      </ul>
    </MainPage>
  );
};
