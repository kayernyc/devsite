'use client';

import Link from 'next/link';

import { formatDate } from '@components/date-tag';
import { PostListing } from '@customTypes/PostTypes';

export const AllPostsByCatRender = ({
  posts,
  directory,
}: {
  posts: PostListing[];
  directory: string;
}) => {
  return (
    <ul>
      {posts.map(({ date, url: id, title, post_tags }) => {
        return (
          <li key={id}>
            <Link href={`/${directory}/${id}`}>
              <h3>{title}</h3>
              {formatDate(date)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
