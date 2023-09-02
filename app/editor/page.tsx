import dynamic from 'next/dynamic';

const EditorNoSSR = dynamic(() => import('./editorPage'), { ssr: false });

const EditorPage = () => {
  return (
    <>
      <EditorNoSSR />
    </>
  );
};

export default EditorPage;

// CREDIT WHERE CREDIT IS DUE: https://stackoverflow.com/a/73589166
