'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Code from '@editorjs/code';
import { EditorHeader } from './editorHeader';
import EditorJS from '@editorjs/editorjs';
import { EditorPostOutput } from '@customTypes/editorTypes';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import List from '@editorjs/list';
import MermaidTool from 'editorjs-mermaid';
import { POST_URL } from '@constants/urls';
import { PostMetaData } from './postMetadata';
import Quote from '@editorjs/quote';

import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

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
  const [modifiedPost, setModifiedPost] = useState<
    EditorPostOutput | undefined
  >();
  const [editor, setEditor] = useState<EditorJS | undefined>(undefined);
  const [savable, setSavable] = useState(false);
  const editorRef = useRef(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const isFormSavable = useCallback(() => {
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
  }, []);

  // on load to set up editor object
  useEffect(() => {
    if (editorRef.current) {
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
          image: {
            class: ImageTool,
            config: {
              uploader: {
                /**
                 * Upload file to the server and return an uploaded image data
                 * @param {File} file - file selected from the device or pasted by drag-n-drop
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByFile(file: File) {
                  return new Promise<Response | null>(
                    async (resolve, reject) => {
                      // do some async task
                      let base64File: string = '';
                      const reader = new FileReader();
                      reader.readAsBinaryString(file);

                      reader.onload = async (event) => {
                        if (
                          event.target &&
                          typeof event.target.result === 'string'
                        ) {
                          base64File = `data:${file.type};base64,${window.btoa(
                            event.target.result
                          )}`;
                          const result = await fetch(
                            'http://localhost:8000/api/image',
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                fileName: file.name,
                                fileType: file.type,
                                fileURI: base64File,
                              }),
                            }
                          );

                          resolve(result);
                        }
                      };
                    }
                  ).then(async (data) => {
                    if (data instanceof Response) {
                      const {
                        file: { url },
                      } = await data.json();

                      return {
                        success: 1,
                        file: {
                          url,
                        },
                      };
                    }
                  });
                },

                /**
                 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
                 * @param {string} url - pasted image URL
                 * @return {Promise.<{success, file: {url}}>}
                 */
                uploadByUrl(url: unknown) {
                  // TODO: modify this and BE to handle urls
                  return fetch('http://localhost:8000/api/image', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                    },
                    body: JSON.stringify({ payload: url }),
                  }).then(() => {
                    return {
                      success: 1,
                      file: {
                        url: 'https://codex.so/upload/redactor_images/o_e48549d1855c7fc1807308dd14990126.jpg',
                        // any other image data you want to store, such as width, height, color, extension, etc
                      },
                    };
                  });
                },
              },
              actions: [],
            },
          },
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
    }
  }, [isFormSavable]);

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

  const writeToPosts = async (data: Partial<EditorPostOutput>) => {
    const postData = {
      ...data,
      post_id: modifiedPost?.post_id || uuidv4(),
      time_created: modifiedPost?.time_created || data.time || Date.now(),
      time_modified: data.time || Date.now(),
    };
    await fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  const newPost = () => {
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
      setModifiedPost(postData);

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
      {modifiedPost && PostMetaData(modifiedPost)}
      <EditorWrapper id="editorjs" ref={editorRef}></EditorWrapper>
      {savable &&
        ((post?: EditorPostOutput) => {
          const { post_id: postId = '', published = false } = post || {};

          return published ? (
            ''
          ) : (
            <button
              onClick={() => {
                savePostHandler(false);
              }}
            >
              {postId ? 'update' : 'save'} draft
            </button>
          );
        })(modifiedPost)}

      {savable && (
        <button
          onClick={() => {
            savePostHandler(true);
          }}
        >
          {modifiedPost ? 'update' : 'save'} post
        </button>
      )}
      {modifiedPost && (
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
