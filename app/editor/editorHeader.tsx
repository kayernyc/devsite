import { useEffect, useState } from 'react';

type Post = {
  timeStamp: number;
  blob: unknown;
};

export const EditorHeader = () => {
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('./api/posts', {
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
      <select id="bob" title="unpublished posts">
        {unpublishedPosts.map((post) => (
          <option key={post.timeStamp}>{post.timeStamp}</option>
        ))}
      </select>
    </header>
  );
};
