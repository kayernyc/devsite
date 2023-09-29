'use client';

import Link from 'next/link';
import { PostListing } from '@customTypes/PostTypes';
import { formatDate } from './date-tag';

import styled from 'styled-components';

const MainPage = styled.main``;

const PageLi = styled.li`
  margin-block-start: 4rem;
`;

const PostLi = styled(PageLi)``;

const ProjectLi = styled(PageLi)`
  margin-left: 2rem;

  &::before {
    content: 'project';
    background: hsl(9.53deg 84.66% 37.68%);
    color: white;
    position: absolute;
    transform: rotate(-90deg);
    left: -3.75rem;
    top: 2.4rem;
    padding: 0.15rem 0.6rem 0.35rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  max-width: fit-content;

  > * {
    display: inline-block;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    text-transform: uppercase;
  }
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

export const MainPageLayout = ({ posts }: { posts: PostListing[] }) => {
  return (
    <MainPage>
      <ul>
        {posts.map(({ date, url: id, source, title, post_tags }, index) => {
          let Tag = PostLi;
          let linkDirectory = 'posts';
          if (post_tags?.includes('project')) {
            Tag = ProjectLi;
            linkDirectory = 'projects';
          }
          return (
            <Tag key={id}>
              <StyledLink href={`/${linkDirectory}/${id}`}>
                <h3>{title}</h3>
                {formatDate(date)}
                {displayTags(post_tags)}
                {/* {index === 0 ? teaserText(html) : ''} */}
              </StyledLink>
            </Tag>
          );
        })}
      </ul>
    </MainPage>
  );
};
