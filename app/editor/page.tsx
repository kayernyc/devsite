import { authOptions } from '@api/auth/[...nextauth]/route';
import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth/next';

const EditorNoSSR = dynamic(() => import('./editorPage'), { ssr: false });

const EditorPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {session && (
        <div>
          <p>Signed in as {session.user && session.user.name}</p>
          <a href="/api/auth/signout">Sign out by link</a>
        </div>
      )}
      <EditorNoSSR />
    </>
  );
};

export default EditorPage;

// CREDIT WHERE CREDIT IS DUE: https://stackoverflow.com/a/73589166
