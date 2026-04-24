'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
import { QueryProvider } from '@/providers/QueryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </QueryProvider>
  );
}
