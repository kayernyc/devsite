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

import { POST_URL } from '@constants/urls';

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
  const [timeCreated, setTimeCreated] = useState<number | undefined>();
  const [postId, setPostId] = useState<string | undefined>();
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
      console.warn('no current editor ref');
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
    const postData = {
      ...data,
      post_id: postId || uuidv4(),
      time_created: timeCreated || data.time || Date.now(),
      time_modified: data.time || Date.now(),
    };
    console.log({ postData });

    await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  const newPost = () => {
    setPostId(undefined);
    setTimeCreated(undefined);
    if (editor) {
      editor.clear();
    }
    if (titleRef.current) {
      titleRef.current.value = '';
    }
  };

  const selectPostToUpdate = async (post_id: string) => {
    const results = await fetch(`${POST_URL}?post_id=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await results.json();
    const postData = data.posts[0];

    if (postData && editor) {
      const { title, time_created, blocks, post_id } = postData;

      setTimeCreated(parseInt(time_created, 10));
      setPostId(post_id);

      if (titleRef.current) {
        titleRef.current.value = title;
      }

      editor.render({ blocks });
    } else {
      // handle error
    }
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
          newPost();
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
            {postId ? 'update' : 'save'} draft
          </button>
          <button
            onClick={() => {
              savePostHandler(true);
            }}
          >
            {postId ? 'update' : 'save'} post
          </button>
        </>
      )}
      {postId && (
        <button
          onClick={() => {
            newPost();
          }}
        >
          new post (discard edits)
        </button>
      )}
    </main>
  );
};

export default Editor;
