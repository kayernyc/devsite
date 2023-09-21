'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type tagResult = {
  tag_id: string;
  tag_name: string;
};

// create table tags(tag_id UUID, tag_name VARCHAR(255) NOT NULL, key_id SERIAL PRIMARY KEY)
const db_results = [
  { tag_id: 'adlfjwitorhg', tag_name: 'process' },
  { tag_id: '49057hgldkds', tag_name: 'til' },
  { tag_id: '49057hgl255ds', tag_name: 'object oriented management practices' },
  { tag_id: '49057hgld23ttys', tag_name: 'javascript' },
];

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
  callback?: (selected: string[]) => void;
}

export const TagSelector = ({ callback }: TagSelectorProps) => {
  const [availableTags, setAvailableTags] = useState<tagResult[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setAvailableTags(db_results);
  }, []);

  // represent dropdown
  return (
    <TagSelectSection>
      <select
        id="existing-tags"
        multiple
        role="listbox"
        title="existing tags"
        onChange={(evt: ChangeEvent<HTMLSelectElement>) => {
          const newSelectedTags: string[] = Array.from(
            evt.target.options
          ).reduce((acc, { value, selected }) => {
            if (selected) {
              acc.push(value);
            }
            return acc;
          }, [] as string[]);

          if (typeof callback === 'function') {
            callback(newSelectedTags);
          }
        }}
      >
        <option value="" role="option">
          --select an existing tag--
        </option>
        {availableTags.map(({ tag_id, tag_name }) => (
          <option key={tag_id} role="option">
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
      <button
        onClick={() => {
          if (newTag) {
            const newTagObj = { tag_name: newTag, tag_id: uuidv4() };
            const newTags = [...availableTags, newTagObj];
            setAvailableTags(newTags);
            setNewTag('');
          }
        }}
      >
        Commit new tag
      </button>
    </TagSelectSection>
  );
};
