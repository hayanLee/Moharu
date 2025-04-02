'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
