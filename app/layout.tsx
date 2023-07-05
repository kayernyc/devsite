'use client'

import './scss/style.scss';

import MainHeader from '@components/main-header';
import StyledComponentsRegistry from '@utilities/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <StyledComponentsRegistry>
          <MainHeader />
            {children}
          <footer className='main-footer'>
            I am foot!
          </footer>
          </StyledComponentsRegistry>
      </body>
    </html>
  )
}
