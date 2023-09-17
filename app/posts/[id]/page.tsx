// import { getAllAndById } from '@api/getMdPosts';
// const { getPostById, getAllPosts } = getAllAndById(['_posts']);
// const { getPostById, getAllPosts } = getAllAndById(['_posts', '_projects']);

import { getAllAndById } from '@api/getPosts';
const { getPostById, getAllPosts } = getAllAndById();

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPostById(id);
  if (post) {
    const { html, title, date } = post;
    return (
      <main>
        <h1>{title}</h1>
        <h4>{date.toLocaleString()}</h4>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </main>
    );
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
