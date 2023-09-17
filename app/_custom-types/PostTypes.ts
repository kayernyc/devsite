import {
  BlockData,
  BlockType,
  HeaderBlockData,
  ListBlockData,
  QuoteBlockData,
} from '@api/_postHydrators/DBPostTypes';

export type MDPost = {
  title: any;
  id: string;
  date: string;
  tags?: string[];
  html: string;
};

export type Block = {
  data: BlockData | HeaderBlockData | ListBlockData | QuoteBlockData;
  id: string;
  type: BlockType;
};

export type PublishedPostRaw = {
  post_id: string;
  time_created: string;
  time_modified?: string | null;
  blocks: Block[];
  published: boolean;
  title: string;
};

export const isPublishedPostRaw = (x: unknown): x is PublishedPostRaw => {
  if (typeof x === 'object') {
    const { post_id, time_created, title } = x as PublishedPostRaw;
    return (
      typeof post_id === 'string' &&
      post_id.length > 0 &&
      typeof time_created === 'string' &&
      typeof title === 'string' &&
      title.length > 0
    );
  }
  return false;
};

export type PublishedPost = {
  title: string;
  date: Date;
  html: string;
  tags: string[];
};

export enum SourceTypes {
  DB_POST = 'DBPosts',
  MD_POST = 'MDPosts',
}

export type PostListing = {
  date: number;
  id: string;
  source: SourceTypes;
  tags: string[];
  title: string;
  url: string;
};

export type PostMinimalListing = {
  date: number;
  post_id: string;
  title: string;
  url: string;
  tags: string[];
};
