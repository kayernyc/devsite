import { Github, Instagram, Linkedin } from '@styled-icons/boxicons-logos';
import styled from 'styled-components';
import { NavLink } from './nav-link';
import { VisuallyHidden } from './visuallyHidden';

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  margin-inline: 1rem;
`;

const StyledGithub = styled(Github)`
  height: 1.5rem;
  margin-inline: 0.1rem;
`;

const StyledInstagram = styled(Instagram)`
  height: 1.6rem;
`

const StyledLinkedin = styled(Linkedin)`
  height: 1.25rem;
`;

const Footer = styled.footer`
  align-items: center;
  display: flex;
  height: 2rem;
  padding-inline: 1rem;

  ${StyledNavLink}:first-child {
    margin-left: 0;
    margin-top: 0.25rem;
  }
  
  ${StyledNavLink}.last-navlink {
    margin-right: auto;
  }
`

export const MainFooter = () => (
  <Footer>
    <StyledNavLink href="personal-details" className='last-navlink'>personal details</StyledNavLink>
    <NavLink href='https://github.com/kayernyc'>
      <StyledGithub />
      <VisuallyHidden>Github account</VisuallyHidden>
    </NavLink>
    <NavLink href='https://www.linkedin.com/in/gypsykat/'>
      <StyledLinkedin />
      <VisuallyHidden>LinkedIn account</VisuallyHidden>
    </NavLink>
    <NavLink href='https://instagram.com/kathrinayer'>
      <StyledInstagram />
      <VisuallyHidden>Instagram account</VisuallyHidden>
    </NavLink>
  </Footer>
);