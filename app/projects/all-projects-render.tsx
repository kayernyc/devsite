'use client';

import Link from 'next/link';

import { formatDate } from '@components/date-tag';
import { PostListing } from '@customTypes/PostTypes';

export const AllProjectsRender = ({ posts }: { posts: PostListing[] }) => {
  return (
    <main>
      <h2>All Projects</h2>
      <ul>
        {posts.map(({ date, url: id, title, post_tags }) => {
          return (
            <li key={id}>
              <Link href={`/projects/${id}`}>
                <h3>{title}</h3>
                {formatDate(date)}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
