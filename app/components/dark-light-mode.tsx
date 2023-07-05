import styled from 'styled-components';
import VisuallyHidden from './visuallyHidden';

const DarkLightMode = () => {
  return (
    <button>
      <img src="/moon.png" width={20} alt='Moon'/>
      <VisuallyHidden>Dark/Light</VisuallyHidden>
    </button>
  )
}

export default DarkLightMode;