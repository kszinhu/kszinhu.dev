import { type MantineThemeOverride } from "@mantine/core";

const themeOverride: MantineThemeOverride = {
  colorScheme: "dark",
  fontFamily: '"Inter", sans-serif',
  fontFamilyMonospace: '"DM Mono", monospace',
  primaryColor: "red",

  headings: {
    sizes: {
      h1: {
        fontSize: "3rem",
        lineHeight: "3rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
    },
  },

  globalStyles: (theme) => ({
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },

    html: {
      scrollBehavior: "smooth", // Enable smooth scrolling
    },

    body: {
      ...theme.fn.fontStyles(),
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.white,
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      lineHeight: theme.lineHeight,
    },

    "::-webkit-scrollbar": { width: "0.5rem" },

    "::-webkit-scrollbar-thumb": {
      borderRadius: "1rem",
      background: theme.colors.dark[4],
    },

    "::-webkit-scrollbar-track": {
      borderRadius: "1rem",
      background: theme.colors.dark[8],
    },

    "@keyframes blink": {
      from: {
        opacity: "100%",
      },
      to: {
        opacity: "0%",
      },
    },
  }),
};

export default themeOverride;
