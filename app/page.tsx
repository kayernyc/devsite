import { getAllAndById } from '@api/getPosts';
import { MainPageLayout } from '@components/main-page-layout';

export const metadata = {
  title: 'Activity collection',
  description: 'life',
};
const { getAllPosts } = getAllAndById();

export default async function Home() {
  const posts = await getAllPosts();
  return <MainPageLayout posts={posts} />;
}
