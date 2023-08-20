import { ChangeEvent, useEffect, useState } from 'react';

type Post = {
  title: string;
  post_id: string;
};

interface EditorHeaderProps {
  selectPostToUpdate: (timeStamp: number) => void;
}

export const EditorHeader = ({ selectPostToUpdate }: EditorHeaderProps) => {
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('./api/posts?post_id&title&published=false', {
      method: 'get',
    })
      .then((data) => data.json())
      .then((data) => {
        const posts = data.posts as Post[];
        setUnpublishedPosts(data.posts || []);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <header>
      <h2>I AM PERRY WHiTE</h2>
      {unpublishedPosts && (
        <select
          id="bob"
          title="unpublished posts"
          onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
            selectPostToUpdate(3);
          }}
        >
          <option value="">--edit an existing post--</option>
          {unpublishedPosts.map((post, index) => (
            <option key={`${post.post_id}-${index}`}>{post.title}</option>
          ))}
        </select>
      )}
    </header>
  );
};
