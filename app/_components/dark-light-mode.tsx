import styled from 'styled-components';

import Image from 'next/image';

import { VisuallyHidden } from './visuallyHidden';

const DLMButton = styled.button`
  border: none;
  background: transparent;
`;

export const DarkLightMode = () => {
  return (
    <DLMButton>
      <Image src="/moon.png" height={20} width={20} alt="Moon" />
      <VisuallyHidden>Dark/Light</VisuallyHidden>
    </DLMButton>
  );
};
