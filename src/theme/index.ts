import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primaryRed: '#e61e2a',
    luxuryBlack: '#0a0a0a',
    surfaceBlack: '#141414',
    textMuted: '#a1a1aa',
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Plus Jakarta Sans", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'luxuryBlack',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'primaryRed',
          color: 'white',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: 'widest',
          px: 8,
          py: 6,
          fontSize: 'xs',
          _hover: {
            bg: '#c41922',
          },
        },
      },
    },
  },
});
