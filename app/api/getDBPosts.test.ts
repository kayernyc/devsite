import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { PublishedPostRaw } from '@customTypes/PostTypes';
import { processPost } from './getDBPosts';

describe('processPosts', () => {
  test('transforms simple post', () => {
    const input = {
      post_id: '65e8e91a-20de-4f63-9b95-c5ca07d23f38',
      time_created: '1692626095383',
      time_modified: null,
      blocks: [
        {
          data: { text: 'aslfjad;lsfj' },
          id: '5uECzZ4QLo',
          type: 'paragraph',
        },
      ],
      published: true,
      title: 'This might work 4',
    } as PublishedPostRaw;
    const result = processPost(input);
    const expected = {
      date: '2023-08-21',
      html: '<p key=5uECzZ4QLo>aslfjad;lsfj</p>',
      title: 'This might work 4',
    };

    expect(result).toStrictEqual(expected);
  });

  test('transforms simple post with header', () => {
    const input = {
      post_id: '65e8e91a-20de-4f63-9b95-c5ca07d23f38',
      time_created: '1692626095383',
      time_modified: null,
      blocks: [
        {
          id: 'qYIGsjS5rt',
          type: 'header',
          data: {
            text: 'Key features',
            level: 3,
          },
        },
        {
          data: { text: 'this is a paragraph' },
          id: '5uECzZ4QLo',
          type: 'paragraph',
        },
      ],
      published: true,
      title: 'This might work 4',
    } as PublishedPostRaw;
    const result = processPost(input);
    const expected = {
      date: '2023-08-21',
      html: '<h3 key=qYIGsjS5rt>Key features</h3><p key=5uECzZ4QLo>this is a paragraph</p>',
      title: 'This might work 4',
    };

    expect(result).toStrictEqual(expected);
  });

  test('transforms simple post with header and list', () => {
    const input = {
      post_id: '65e8e91a-20de-4f63-9b95-c5ca07d23f38',
      time_created: '1692626095383',
      time_modified: null,
      blocks: [
        {
          id: 'qYIGsjS5rt',
          type: 'header',
          data: {
            text: 'Key features',
            level: 3,
          },
        },
        {
          data: { text: 'this is a paragraph' },
          id: '5uECzZ4QLo',
          type: 'paragraph',
        },
        {
          id: 'XV87kJS_H1',
          type: 'list',
          data: {
            style: 'unordered',
            items: [
              'It is a block-styled editor',
              'It returns clean data output in JSON',
              'Designed to be extendable and pluggable with a simple API',
            ],
          },
        },
      ],
      published: true,
      title: 'This might work 4',
    } as PublishedPostRaw;

    const result = processPost(input);

    const expected = {
      date: '2023-08-21',
      html: `<h3 key=qYIGsjS5rt>Key features</h3><p key=5uECzZ4QLo>this is a paragraph</p><ul>
        <li key=XV87kJS_H10>It is a block-styled editor</li><li key=XV87kJS_H11>It returns clean data output in JSON</li><li key=XV87kJS_H12>Designed to be extendable and pluggable with a simple API</li>
      </ul>`,
      title: 'This might work 4',
    };

    expect(result).toStrictEqual(expected);
  });

  test('transforms simple post with quote', () => {
    const input = {
      post_id: '65e8e91a-20de-4f63-9b95-c5ca07d23f38',
      time_created: '1692626095383',
      time_modified: null,
      blocks: [
        {
          data: { text: 'this is a paragraph' },
          id: '5uECzZ4QLo',
          type: 'paragraph',
        },
        {
          id: 'XV87kJS_H1',
          type: 'quote',
          data: {
            caption: 'Socratic',
            alignment: 'left',
          },
        },
      ],
      published: true,
      title: 'This might work 4',
    } as PublishedPostRaw;

    const result = processPost(input);

    const expected = {
      date: '2023-08-21',
      html: '<p key=5uECzZ4QLo>this is a paragraph</p><blockquote class=left>Socratic</blockquote>',
      title: 'This might work 4',
    };

    expect(result).toStrictEqual(expected);
  });
});
