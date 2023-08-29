import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { EditorHeader } from './editorHeader';
import { GET } from '../api/posts/route';

const data = [
  {
    title: 'test 1',
    post_id: 'a2ldfjadlkjf',
  },
  {
    title: 'test 2',
    post_id: 'a2lderoib23dlkjf',
  },
];

const mockSelectPostFunction = (post_id: string) => {};

describe('EditorHeader', () => {
  beforeEach(async () => {
    const postRoute = await import('../api/posts/route');

    function createFetchResponse() {
      return Promise.resolve({ json: () => Promise.resolve(data) });
    }

    // vi.stubGlobal('window.fetch', createFetchResponse);
    postRoute.GET = vi.fn().mockResolvedValue(createFetchResponse);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // const populateSelect = test.extend({
  //   populate: async()
  // })

  test('loads the header', async () => {
    await render(<EditorHeader selectPostToUpdate={mockSelectPostFunction} />);
    // await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    const headline = screen.getByText(/--edit an existing post--/i);

    expect(headline).toBeTruthy();
  });
});
