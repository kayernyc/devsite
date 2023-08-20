import { ChangeEvent, useEffect, useState } from 'react';

type Post = {
  timeStamp: number;
  title: string;
};

interface EditorHeaderProps {
  selectPostToUpdate: (timeStamp: number) => void;
}

export const EditorHeader = ({ selectPostToUpdate }: EditorHeaderProps) => {
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('./api/posts?timeStamp&title', {
      method: 'get',
    })
      .then((data) => data.json())
      .then((data) => {
        const posts = data.posts as Post[];
        console.log({ posts });
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
            console.log('I am called', evt.target.value);
            selectPostToUpdate(3);
          }}
        >
          <option value="">--edit an existing post--</option>
          {unpublishedPosts.map((post) => (
            <option key={post.timeStamp}>{post.title}</option>
          ))}
        </select>
      )}
    </header>
  );
};
