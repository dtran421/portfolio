import type { Preview } from "@storybook/react";

import { withThemeByClassName, withThemeByDataAttribute } from "@storybook/addon-styling";

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      default: "dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
      attributeName: "data-mode",
    }),
  ],
};

export default preview;
