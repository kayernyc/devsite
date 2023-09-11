import Link from 'next/link';
import { headers } from 'next/headers';

export default function NotFound() {
  const headersList = headers();
  // const domain = headersList.get('host');

  return (
    <main>
      <h2>Not Found:</h2>
      <p>Could not find requested resource</p>
      <p>
        Return <Link href="/">home</Link>
      </p>
    </main>
  );
}