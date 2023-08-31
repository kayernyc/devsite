import { ChangeEvent, useEffect, useState } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

export type Post = {
  title: string;
  post_id: string;
};

interface EditorHeaderProps {
  selectPostToUpdate: (post_id: string) => void;
}

export const EditorHeader = ({
  selectPostToUpdate,
}: EditorHeaderProps): ReactElement => {
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('./api/posts?post_id&title&published=FALSE', {
      method: 'get',
    })
      .then((data: Response) => data.json())
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
          onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
            if (evt.target?.value && typeof evt.target?.value === 'string') {
              selectPostToUpdate(evt.target.value);
            }
          }}
          role="listbox"
          title="unpublished posts"
        >
          <option value="" role="option">
            --edit an existing post--
          </option>
          {unpublishedPosts.map((post, index) => (
            <option
              value={post.post_id}
              key={`${post.post_id}-${index}`}
              role="option"
            >
              {post.title}
            </option>
          ))}
        </select>
      )}
    </header>
  );
};
