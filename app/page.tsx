import { MainPageLayout } from '@components/main-page-layout';
import { getAllAndById as getAllAndByIdTest } from '@api/getPosts';

export const metadata = {
  title: 'Activity collection',
  description: 'life',
};
const { getAllPosts } = getAllAndByIdTest();

export default async function Home() {
  const posts = await getAllPosts();
  return <MainPageLayout posts={posts} />;
}
