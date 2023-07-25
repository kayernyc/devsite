import Link from 'next/link';
import { getAllAndById } from '@api/getMdPosts';

const { getAllPosts } = getAllAndById(['_posts', '_projects']);

export const metadata = {
  title: 'Activity collection',
  description: 'life',
};

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <ul>
        {posts.map(({ id, date, title }) => {
          return (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                {date} - {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
