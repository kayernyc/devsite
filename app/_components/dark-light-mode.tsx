import { useContext } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { DarkModeContext } from '@contexts/dark-mode-context';

import { VisuallyHidden } from './visuallyHidden';

const DLMButton = styled.button<{ darkMode?: boolean }>`
  border: ${({ darkMode }) => (darkMode ? '1px solid #FFFFFF' : 'none')};
  background: transparent;
  cursor: pointer;
`;

export const DarkLightMode = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <DLMButton
        darkMode={darkMode}
        onClick={() => {
          const newMode = !darkMode;
          setDarkMode(newMode);
        }}
      >
        <Image src="/moon.png" height={20} width={20} alt="Moon" />
        <VisuallyHidden>Dark/Light</VisuallyHidden>
      </DLMButton>
    </>
  );
};
