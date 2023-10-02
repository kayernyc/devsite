import { useContext } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { DarkModeContext } from '@contexts/dark-mode-context';

import { VisuallyHidden } from './visuallyHidden';

const VertContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

const ToggleButton = styled.label<{ darkMode?: boolean }>`
  --slide-dim: 1.5rem;
  --slide-radius: calc(var(--slide-dim) / 2);
  --slide-small-dim: calc(var(--slide-dim) * 0.66);

  align-items: center;
  border: ${({ darkMode }) =>
    darkMode ? 'solid 1px #757577' : 'solid 1px var(--accent-1-600)'};
  border-radius: var(--slide-radius);
  cursor: pointer;
  display: flex;
  height: var(--slide-dim);
  padding-left: 2px;
  position: relative;
  transition: 0.4s;
  width: calc(2 * var(--slide-dim));

  input {
    position: absolute;
    right: -20px;
    visibility: hidden;
  }

  .thumb {
    background-color: var(--background-color);
    border-radius: 1rem;
    box-shadow: inset 0.25rem -2px 0px 0px #fff;
    height: var(--slide-small-dim);
    width: var(--slide-small-dim);
    transition: 0.3s;
  }

  input:checked ~ .thumb {
    background-color: orange;
    box-shadow: 0 0 3px 2px #f9f4a9;
    height: var(--slide-small-dim);
    transform: translateX(var(--slide-dim));
    width: var(--slide-small-dim);
    /* left: calc(100% - 1.4rem); */
  }
`;

export const DarkLightMode = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <VertContainer>
      <ToggleButton htmlFor="light-dark-toggle" darkMode={darkMode}>
        <input
          type="checkbox"
          id="light-dark-toggle"
          onChange={() => {
            const newMode = !darkMode;
            setDarkMode(newMode);
          }}
          checked={!darkMode}
        />
        <VisuallyHidden>Dark/Light</VisuallyHidden>
        <div className="thumb" />
      </ToggleButton>
    </VertContainer>
  );
};
