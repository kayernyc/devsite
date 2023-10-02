import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditorHeader } from './editorHeader';

const data = {
  posts: [
    {
      title: 'test 1',
      post_id: 'a2ldfjadlkjf',
    },
    {
      title: 'test 2',
      post_id: 'a2lderoib23dlkjf',
    },
  ],
};

const mockSelectPostFunction = (post_id: string) => {};

function createFetchResponse() {
  const response = new Response();
  response.json = () => Promise.resolve(data);
  return response;
}

describe('EditorHeader', () => {
  beforeEach(async () => {
    global.fetch = vi.fn();
    vi.mocked(fetch).mockResolvedValue(createFetchResponse());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('loads the header and calls for posts.', async () => {
    await render(<EditorHeader selectPostToUpdate={mockSelectPostFunction} />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  test('loads the header populates options based on the response.', async () => {
    await render(<EditorHeader selectPostToUpdate={mockSelectPostFunction} />);

    await waitFor(
      async () =>
        await waitFor(() =>
          expect(screen.getByText(/test 1/i)).toBeInTheDocument(),
        ),
    );
    const option1: HTMLOptionElement = screen.getByText(/test 1/i);
    const option2: HTMLOptionElement = screen.getByText(/test 2/i);

    expect(option1.innerHTML).toBe('test 1');
    expect(option2.innerHTML).toBe('test 2');
  });

  test('calls the callback on select.', async () => {
    const spy = vi.fn();
    await render(<EditorHeader selectPostToUpdate={spy} />);

    await waitFor(
      async () =>
        await waitFor(() =>
          expect(screen.getByText(/test 1/i)).toBeInTheDocument(),
        ),
    );
    const option1: HTMLOptionElement = screen.getByText(/test 1/i);

    // click option
    await userEvent.selectOptions(
      // Find the select element
      screen.getByRole('listbox'),
      // Find and select the "test 1" option
      screen.getByRole('option', { name: 'test 1' }),
    );

    expect(option1.selected).toBe(true);
    expect(spy).toHaveBeenCalled();
  });
});
