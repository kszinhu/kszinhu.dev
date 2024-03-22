import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: '"Inter", sans-serif',
  fontFamilyMonospace: '"DM Mono", monospace',
  primaryColor: 'red',

  headings: {
    sizes: {
      h1: {
        fontSize: '3rem',
        lineHeight: '3rem',
        fontWeight: '700',
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: '600',
      },
    },
  },

  fontSmoothing: true,
});
