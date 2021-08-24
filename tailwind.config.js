module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundSize: {
        double: '200%',
      },
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      blue: {
        50: '#E2FEFC',
        100: '#C5FDF9',
        150: '#A8F5F0',
        200: '#8EEDE6',
        300: '#5CCCC5',
        400: '#279995',
        500: '#0A5F5E',
        600: '#002B2B',
      },
      yellow: {
        50: '#FFFEE9',
        100: '#FFFED3',
        150: '#FFFCBA',
        200: '#FFF9A1',
        300: '#FFED70',
        400: '#FAD749',
        500: '#8F7B24',
      },
      gray: {
        0: '#FCFFFF',
        50: '#F7FAFA',
        100: '#F1F5F5',
        150: '#E5EAEB',
        200: '#D9E0E0',
        300: '#B1BCBE',
        400: '#798688',
        500: '#394243',
      },
    },
    fontSizes: [],
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
