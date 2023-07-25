import { getAllAndById } from '@api/getMdPosts';
const { getPostById, getAllPosts } = getAllAndById(['_projects']);

export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { html, title, date } = await getPostById(slug);
  return (
    <main>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
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
  const { title } = await getPostById(id);
  return {
    title,
  };
}
