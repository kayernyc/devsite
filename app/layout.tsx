'use client';

import '@scss/style.scss';

import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';
import { SessionProvider } from 'next-auth/react';
import StyledComponentsRegistry from '@utilities/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <SessionProvider>
          <body>
            <MainHeader />
            {children}
            <MainFooter />
          </body>
        </SessionProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
