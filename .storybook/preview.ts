import { ReactRenderer, type Preview } from "@storybook/react";

import { withThemeByClassName } from "@storybook/addon-styling";

import "../src/styles/globals.css";

// viewport sizes: https://github.com/storybookjs/storybook/blob/master/addons/viewport/src/defaults.ts#L167
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
    docs: {
      toc: true,
    },
  },
  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
};

export default preview;
