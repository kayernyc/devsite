'use client';

import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TagDBResult } from '@customTypes/editorTypes';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const TagSelectSection = styled.section`
  display: inline-flex;
  gap: 1rem;

  select {
  }

  option {
    padding: 0.25rem;
    padding-right: 1rem;
  }

  option:first-child {
    background-color: pink;
  }

  button,
  label,
  input {
    align-self: start;
  }
`;

interface TagSelectorProps {
  callback?: (selected: TagDBResult[]) => void;
}

export const TagSelector = ({ callback }: TagSelectorProps) => {
  const [availableTags, setAvailableTags] = useState<TagDBResult[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    fetch('./api/tags', { method: 'get' }).then(async (data: Response) => {
      const { tags } = await data.json();
      setAvailableTags(tags);
    });
  }, []);

  const updateTagSelection: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (evt) => {
      const newSelectedTags: TagDBResult[] = Array.from(
        evt.target.options
      ).reduce((acc, { value, selected, dataset: { key = '0', uuid } }) => {
        if (selected) {
          acc.push({
            tag_name: value,
            tag_id: uuid || '',
            key_id: key,
          });
        }
        return acc;
      }, [] as TagDBResult[]);

      if (typeof callback === 'function') {
        callback(newSelectedTags);
      }
    },
    [callback]
  );

  const createNewTag = useCallback(() => {
    if (newTag) {
      const newTagObj = { tag_name: newTag, tag_id: uuidv4() };
      const newTags = [...availableTags, newTagObj];

      fetch('./api/tags', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTagObj),
      }).then(async (response) => {
        const serverResponse = await response.json();
        const { status } = serverResponse;
        if (status > 199 && status < 300) {
          setAvailableTags(newTags);
          setNewTag('');
        } else {
          // ADD TOAST HANDLING HERE
        }
      });
    }
  }, [availableTags, newTag]);

  // represent dropdown
  return (
    <TagSelectSection>
      <select
        id="existing-tags"
        multiple
        role="listbox"
        title="existing tags"
        onChange={updateTagSelection}
      >
        <option value="" role="option">
          --select an existing tag--
        </option>
        {availableTags.map(({ tag_id, tag_name, key_id }) => (
          <option
            key={tag_id}
            role="option"
            data-uuid={tag_id}
            data-key={key_id}
          >
            {tag_name}
          </option>
        ))}
      </select>
      <label htmlFor="new-tag">New tag</label>
      <input
        type="text"
        id="new-tag"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          setNewTag(evt.target.value);
        }}
        value={newTag}
      />
      <button onClick={createNewTag}>Commit new tag</button>
    </TagSelectSection>
  );
};
