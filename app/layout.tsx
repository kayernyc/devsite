import './globals.css';
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
        <nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/til">TIL</NavLink>
          <NavLink href="/projects">Projects</NavLink>
        </nav>

        {children}

        <footer>
          I am foot!
        </footer>
      </body>
    </html>
  )
}


