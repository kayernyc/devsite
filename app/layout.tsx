'use client';

import '@scss/style.scss';

import { MainHeader } from '@components/main-header';
import StyledComponentsRegistry from '@utilities/registry';
import { MainFooter } from '@components/main-footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <MainHeader />
          {children}
          <MainFooter />
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
