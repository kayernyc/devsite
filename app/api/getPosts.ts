import { getAllAndById as getAllMDAndById } from '@api/getMdPosts';
import {
  PostListing,
  PublishedPost,
  SourceTypes,
} from '@customTypes/PostTypes';

import { getDBPostById, getDBPosts } from './getDBPosts';

const { getAllPosts: getAllMDPosts, getPostById: getMDPostById } =
  getAllMDAndById(['_posts', '_projects']);

const sourceMap: Record<string, PostListing> = {};

let allPosts: PostListing[];

const initModule = async () => {
  // get all postgres posts
  const allDBPosts = await getDBPosts();
  allDBPosts?.forEach(
    ({
      date,
      post_id,
      post_tags,
      title,
      url,
    }: {
      date: number;
      post_id: string;
      post_tags: string[];
      title: string;
      url: string;
    }) => {
      sourceMap[url] = {
        date,
        id: post_id,
        source: SourceTypes.DB_POST,
        post_tags: [...post_tags, 'post'],
        title,
        url,
      };
    },
  );

  const allMDPosts = await getAllMDPosts();
  allMDPosts.forEach((mdPost) => {
    const { post_id, date, title, post_tags = [] } = mdPost;
    const url = encodeURIComponent(
      title.toLowerCase().replace(/[^a-z0-9 _-]+/gi, '-'),
    );

    const dataNumber = new Date(date).getTime();

    sourceMap[url] = {
      id: post_id,
      source: SourceTypes.MD_POST,
      title,
      url,
      post_tags,
      date: dataNumber,
    };
  });

  allPosts = Object.entries(sourceMap)
    .sort(([, value1], [, value2]) => {
      return value1.date > value2.date ? -1 : 1;
    })
    .map(([_, value]) => value);
};

export function getAllAndById(): {
  getPostById: (id: string) => Promise<PublishedPost | undefined>;
  getAllPosts: () => Promise<PostListing[]>;
} {
  const getAllPosts = async (): Promise<PostListing[]> => {
    if (!allPosts || allPosts.length < 1) {
      await initModule();
    }
    return allPosts;
  };

  const getPostById = async (id: string) => {
    if (!allPosts || allPosts.length < 1) {
      await initModule();
    }

    const obj = sourceMap[id];

    switch (obj.source) {
      case SourceTypes.DB_POST:
        return getDBPostById(obj.id);
      case SourceTypes.MD_POST:
        return getMDPostById(id);
    }

    return {
      html: '<main>bob is palendromic</main>',
      title: 'test bob',
      date: new Date(4982357249068),
      post_tags: Array<string>(),
    } as PublishedPost;
  };

  return { getPostById, getAllPosts };

  // get all til from mongo
  // const getPostById = async (id: string): Promise<MDPost | PublishedPost> => {
  //   // how to know?
  // }
}
