import { getAllAndById } from '@api/getPosts';

import { PostRender } from './post-render';

const { getPostById, getAllPosts } = getAllAndById();

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPostById(id);
  if (post) {
    return <PostRender post={post} />;
  }
  return <main>Page not found</main>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPostById(id);
  if (post) {
    return {
      title: post.title,
    };
  }
  return { title: 'bob' };
}
