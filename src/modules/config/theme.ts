import { type MantineThemeOverride } from '@mantine/core'

const themeOverride: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: '"DM Sans", sans-serif',
  fontFamilyMonospace: '"DM Mono", monospace',
  primaryColor: 'red',

  headings: {
    sizes: {
      h1: {
        fontSize: '3rem',
        lineHeight: '3rem'
      },
      h2: {
        fontSize: '2.5rem'
      }
    }
  },

  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box'
    },

    body: {
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight
    }
  })
}

export default themeOverride
