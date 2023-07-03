import Link from "next/link";
import { getAllPosts } from "./api/getMdPosts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main>
      <ul>
        {posts.map(({id, date, title}) => {
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
  )
}
