import { PostRender } from './post-render';
import { getAllAndById } from '@api/getPosts';

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
    const { title } = post;
    return {
      title,
    };
  }
  return { title: 'bob' };
}
