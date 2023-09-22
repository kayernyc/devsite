import { OutputData } from '@editorjs/editorjs';

export interface EditorPostOutput extends OutputData {
  post_id: string;
  published: boolean;
  title: string;
  time_created?: string;
  time_modified?: string;
}

export type TagDBResult = {
  tag_id: string;
  tag_name: string;
  key_id?: string;
};
