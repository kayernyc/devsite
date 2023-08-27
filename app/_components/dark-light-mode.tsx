import styled from 'styled-components';
import { VisuallyHidden } from './visuallyHidden';

const DLMButton = styled.button`
  border: none;
  background: transparent;
`

export const DarkLightMode = () => {
  return (
    <DLMButton>
      <img src="/moon.png" width={20} alt='Moon'/>
      <VisuallyHidden>Dark/Light</VisuallyHidden>
    </DLMButton>
  )
}
