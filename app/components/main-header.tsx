import styled from 'styled-components';

import { NavLink } from '@components/nav-link';
import DarkLightMode from './dark-light-mode';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledNavLink = styled(NavLink)``;

const NavHeader = styled.nav`
  display: flex;
  align-items: baseline;

  ${StyledNavLink} {
    display: inline-block;
    margin-inline: 1rem;
  }

  ${StyledNavLink}:first-of-type {
    background-color: hsl(9.53deg 84.66% 37.68%);
    color: white;
    padding: 0.5rem;
  }
`

const MainHeader = () => (
  <Header>
    <NavHeader>
      <StyledNavLink href="/"><em>&#60;/&#62;</em></StyledNavLink>
      <StyledNavLink href="/blog">Writing</StyledNavLink>
      <StyledNavLink href="/projects">Projects</StyledNavLink>
    </NavHeader>
    <DarkLightMode />
  </Header>
);

export default MainHeader;
