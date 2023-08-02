import { getAllAndById } from '@api/getMdPosts';
import { MainPageLayout } from './components/main-page-layout';

const { getAllPosts } = getAllAndById(['_posts', '_projects']);

export const metadata = {
  title: 'Activity collection',
  description: 'life',
};

export default async function Home() {
  const posts = await getAllPosts();
  return <MainPageLayout posts={posts} />;
}
