import './scss/style.scss';
import { NavLink } from './components/nav-link';

export const metadata = {
  title: 'Portfolio website',
  description: 'life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className='main-header'>
          <h2>You are here</h2>
          <nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/til">TIL</NavLink>
            <NavLink href="/projects">Projects</NavLink>
          </nav>
        </header>

        {children}

        <footer className='main-footer'>
          I am foot!
        </footer>
      </body>
    </html>
  )
}
