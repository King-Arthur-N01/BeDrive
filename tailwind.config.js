const plugin = require('tailwindcss/plugin');
const {
  sharedOverride,
  sharedExtend,
  sharedPlugins,
} = require('./resources/client/common/shared.tailwind');

module.exports = {
  content: ['./resources/client/**/*.ts*'],
  darkMode: 'class',
  theme: {
    ...sharedOverride,
    extend: {
      ...sharedExtend,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1146px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), ...sharedPlugins(plugin)],
};
