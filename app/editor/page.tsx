'use client';

import Code from '@editorjs/code';
import EditorJS, { BlockChangedEvent, OutputData } from '@editorjs/editorjs';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import MermaidTool from 'editorjs-mermaid';

import styled from 'styled-components';
import { RestMethod } from '@libs/restMethods';

const POST_URL = '/api/posts/';

const EditorWrapper = styled.section`
  border: 1px solid #aaaaaa;
`;

const isDirty = (el: HTMLDivElement) => {
  const editor = el.getElementsByClassName(
    'codex-editor__redactor'
  )[0] as HTMLDivElement;
  if (editor && editor.children) {
    return editor.children?.length > 0;
  }
  return false;
};

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
      onChange: () => {
        if (editorRef.current) {
          setEditorIsDirty(isDirty(editorRef.current));
        }
      },
      tools: {
        code: Code,
        header: Header,
        list: List,
        quote: Quote,
        mermaidTool: MermaidTool,
        image: Image,
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

  const writeToPosts = async (data: OutputData) => {
    await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

  const savePostHandler = (published: boolean) => {
    if (editor) {
      editor
        .save()
        .then(async (outputData) => {
          const data = { ...outputData, published };
          await writeToPosts(data);
          editor.clear();
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
          <button
            onClick={() => {
              savePostHandler(false);
            }}
          >
            save draft
          </button>
          <button
            onClick={() => {
              savePostHandler(true);
            }}
          >
            save post
          </button>
        </>
      )}
    </main>
  );
};

export default Editor;

/*
{
    "time": 1692212855483,
    "blocks": [
        {
            "id": "YDzLm63DSl",
            "type": "paragraph",
            "data": {
                "text": "hello"
            }
        },
        {
            "id": "xvTWTWZEqi",
            "type": "header",
            "data": {
                "text": "HEAD",
                "level": 2
            }
        }
    ],
    "version": "2.27.2"
}
*/
