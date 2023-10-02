'use client';

import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';
import '@scss/style.scss';
import StyledComponentsRegistry from '@utilities/registry';

import { Providers } from './provider';

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
