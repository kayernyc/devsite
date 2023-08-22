import { ChangeEvent, useEffect, useState } from 'react';

type Post = {
  title: string;
  post_id: string;
};

interface EditorHeaderProps {
  selectPostToUpdate: (post_id: string) => void;
}

export const EditorHeader = ({ selectPostToUpdate }: EditorHeaderProps) => {
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch('./api/posts?post_id&title&published=FALSE', {
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
      <h2>
        I AM PERRY WH<span style={{ textTransform: 'lowercase' }}>i</span>TE
      </h2>
      {unpublishedPosts && (
        <select
          id="existing_posts"
          title="unpublished posts"
          onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
            if (evt.target?.value && typeof evt.target?.value === 'string') {
              selectPostToUpdate(evt.target.value);
            }
          }}
        >
          <option value="">--edit an existing post--</option>
          {unpublishedPosts.map((post, index) => (
            <option value={post.post_id} key={`${post.post_id}-${index}`}>
              {post.title}
            </option>
          ))}
        </select>
      )}
    </header>
  );
};
