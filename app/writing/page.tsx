import { getAllAndById } from '@api/getPosts';

import { AllPostsRender } from '../_components/all-posts-render';

export const metadata = {
  title: 'Posts',
  description: 'Random musings and writing practice',
};
const { getAllPosts } = getAllAndById();

const Writing = async () => {
  const posts = await getAllPosts();
  const articles = posts.filter((post) => {
    const { post_tags } = post;
    return !post_tags.includes('project');
  });

  return (
    <main>
      <h1>Writing</h1>
      <section>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti
        debitis laboriosam soluta illum vel aliquam quod, ipsum quaerat
        temporibus culpa similique, eligendi obcaecati! Temporibus dicta velit
        impedit maxime, rem officiis.
      </section>
      <h2>All Writing</h2>
      <AllPostsRender posts={articles} directory="posts" />;
    </main>
  );
};

export default Writing;
