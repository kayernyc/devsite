'use client';

import '@scss/style.scss';

import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';
import { Providers } from './provider';
import StyledComponentsRegistry from '@utilities/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <Providers>
          <body>
            <MainHeader />
            {children}
            <MainFooter />
          </body>
        </Providers>
      </StyledComponentsRegistry>
    </html>
  );
}
