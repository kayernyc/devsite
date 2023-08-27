import { OutputData } from '@editorjs/editorjs';

export interface EditorPostOutput extends OutputData {
  post_id: string;
  published: boolean;
  title: string;
  time_created?: string;
  time_modified?: string;
}
