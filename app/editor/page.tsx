'use client';

import Code from '@editorjs/code';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { useEffect, useRef, useState } from 'react';
import Header from '@editorjs/header';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import MermaidTool from 'editorjs-mermaid';

import styled from 'styled-components';
import { EditorHeader } from './editorHeader';
import { v4 as uuidv4 } from 'uuid';

// https://editorjs.io/blocks/#render

const POST_URL = '/api/posts/';

interface EditorPostOutput extends OutputData {
  published: boolean;
  title: string;
}

const EditorWrapper = styled.section`
  border: 1px solid #aaaaaa;
`;

const InputLabel = styled.label`
  display: block;
`;

const TitleInput = styled.input`
  font-family: serif;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
`;

const Editor = () => {
  const [editor, setEditor] = useState<EditorJS | undefined>(undefined);
  const [savable, setSavable] = useState(false);
  const editorRef = useRef(null);
  const titleRef = useRef<HTMLInputElement>(null);

  // on load to set up editor object
  useEffect(() => {
    const neweditor: EditorJS = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: 'editorjs',
      onChange: () => {
        isFormSavable();
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
      })
      .catch((reason) => {
        console.warn(`Editor.js initialization failed because of ${reason}`);
      });

    return () => {
      neweditor.destroy();
    };
  }, []);

  const isDirty = (el: HTMLDivElement) => {
    const editor = el.getElementsByClassName(
      'codex-editor__redactor'
    )[0] as HTMLDivElement;
    if (editor && editor.children) {
      const state = Array.from(editor.children).some((el) => {
        const childrenWithText: HTMLElement[] = (
          Array.from(el.children) as HTMLElement[]
        ).filter((el) => el.innerText.length > 0);
        return childrenWithText.length > 0;
      });

      return state;
    }
    return false;
  };

  const isFormSavable = () => {
    if (!editorRef.current) {
      setSavable(false);
    } else {
      const titleReady = (() => {
        if (
          titleRef.current?.value?.length &&
          titleRef.current?.value?.length > 0
        ) {
          return true;
        }
        return false;
      })();

      const dirty = isDirty(editorRef.current);

      setSavable(titleReady && dirty);
    }
  };

  const writeToPosts = async (data: EditorPostOutput) => {
    const postData = { ...data, post_id: uuidv4() };

    await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  const selectPostToUpdate = (timeStamp: number): void => {
    console.log('I heard the request in the parent', timeStamp);
    return;
  };

  const savePostHandler = (published: boolean) => {
    if (editor) {
      editor
        .save()
        .then(async (outputData) => {
          const data = {
            ...outputData,
            published,
            title: titleRef.current?.value || 'default title',
          };
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
      <EditorHeader selectPostToUpdate={selectPostToUpdate} />
      <InputLabel htmlFor="title-input">Title</InputLabel>
      <TitleInput
        type="text"
        id="title-input"
        maxLength={255}
        ref={titleRef}
        required
        onChange={isFormSavable}
      />
      <EditorWrapper id="editorjs" ref={editorRef}></EditorWrapper>
      {savable && (
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
