'use client';

import useProfile from '@/hooks/querys/useProfile';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  const { data } = useProfile();
  React.useEffect(() => {
    if (data?.data.color) {
      document.documentElement.style.setProperty('--point', data.data.color);
    }
  }, [data?.data.color]);

  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
