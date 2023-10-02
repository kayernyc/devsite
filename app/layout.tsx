'use client';

import { useEffect, useMemo, useState } from 'react';

import { MainFooter } from '@components/main-footer';
import { MainHeader } from '@components/main-header';
import { DarkModeContext } from '@contexts/dark-mode-context';
import '@scss/style.scss';
import StyledComponentsRegistry from '@utilities/registry';

import { Providers } from './provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const modeValue = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(modeValue);
  }, []);

  const darkModeValue = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <Providers>
          <DarkModeContext.Provider value={darkModeValue}>
            <body className={darkMode ? 'dark' : 'light'}>
              <MainHeader />
              {children}
              <MainFooter />
            </body>
          </DarkModeContext.Provider>
        </Providers>
      </StyledComponentsRegistry>
    </html>
  );
}
