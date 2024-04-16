/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: colors.black,
      white: colors.white,

      primary: {
        light: colors.blue['100'],
        DEFAULT: colors.blue['700'],
        dark: colors.blue['800'],
      },

      secondary: {
        light: colors.pink['100'],
        DEFAULT: colors.pink['500'],
        dark: colors.pink['600'],
      },

      success: {
        light: colors.green['100'],
        DEFAULT: colors.green['500'],
        dark: colors.green['600'],
      },

      danger: {
        light: colors.red['100'],
        DEFAULT: colors.red['500'],
        dark: colors.red['600'],
      },

      warning: {
        light: colors.yellow['100'],
        DEFAULT: colors.yellow['500'],
        dark: colors.yellow['600'],
      },

      info: {
        light: colors.indigo['100'],
        DEFAULT: colors.indigo['500'],
        dark: colors.indigo['600'],
      },

      light: {
        lightest: colors.gray['50'],
        DEFAULT: colors.gray['100'],
        dark: colors.gray['200'],
      },

      dark: {
        light: colors.gray['500'],
        DEFAULT: colors.gray['700'],
        darkest: colors.gray['800'],
      },
    },
  },
  plugins: [],
};
