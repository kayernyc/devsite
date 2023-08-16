'use client';

import EditorJS, { BlockChangedEvent } from '@editorjs/editorjs';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';

import styled from 'styled-components';
import { RestMethod } from '@/api/libs/restMethods';

const POST_URL = '/api/posts/';

const EditorWrapper = styled.section`
  border: 1px solid #aaaaaa;
`;

const Editor = () => {
  const [editor, setEditor] = useState<EditorJS | undefined>(undefined);
  const [editorIsDirty, setEditorIsDirty] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const editorRef = useRef(null);

  // on load to set up editor object
  useEffect(() => {
    const neweditor: EditorJS = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: 'editorjs',
      onChange: (_, event: BlockChangedEvent) => {
        if (event && event.detail?.target !== undefined) {
          const target = event.detail.target;
          setEditorIsDirty(!target.isEmpty);
        } else {
          console.log({ event });
        }

        console.log(editorReady, editorIsDirty);
        console.log("Now I know that Editor's content changed!", event);
      },
      tools: {
        code: Code,
        header: Header,
        list: List,
        quote: Quote,
      },
    });

    neweditor.isReady
      .then(() => {
        setEditor(neweditor);
        setEditorReady(true);
      })
      .catch((reason) => {
        console.warn(`Editor.js initialization failed because of ${reason}`);
      });

    return () => {
      neweditor.destroy();
    };
  }, []);

  const savePostHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    if (editor) {
      editor
        .save()
        .then(async (outputData) => {
          await fetch(POST_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(outputData),
          });
          editor.clear();
          console.log('Article data: ', outputData);
        })
        .catch((error) => {
          console.warn('Saving failed: ', error);
        });
    }
  };

  const saveDraftHandler = (evt: MouseEvent<HTMLButtonElement>) => {
    if (editor) {
      editor
        .save()
        .then((outputData) => {
          console.log('Article data: ', outputData);
        })
        .catch((error) => {
          console.warn('Saving failed: ', error);
        });
    }
  };

  return (
    <main>
      I AM PERRY WHiTE
      <EditorWrapper id="editorjs" ref={editorRef}></EditorWrapper>
      {editorReady && editorIsDirty && (
        <>
          <button onClick={saveDraftHandler}>save draft</button>
          <button onClick={savePostHandler}>save post</button>
        </>
      )}
    </main>
  );
};

export default Editor;
