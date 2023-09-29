import { ProjectRender } from './project-render';
import { getAllAndById } from '@api/getMdPosts';

const { getPostById, getAllPosts } = getAllAndById(['_projects']);

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPostById(id);
  if (post) {
    return <ProjectRender post={post} />;
  }
  return <main>Page not found</main>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    id: post.post_id,
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
