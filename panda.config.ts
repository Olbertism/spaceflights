import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  'html, body, main': {
    height: '100%',
    fontFamily: 'system-ui, sans-serif',
    color: 'gray.900',
    lineHeight: '1.5',
  },
  button: {
    cursor: 'pointer',
  },
  'button:disabled': {
    cursor: 'default',
    color: 'neutral !important',
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './app/routes/**/*.{ts,tsx,js,jsx}',
    './app/components/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#3A4E48' },
          secondary: { value: '#8B9D83' },
          accent: { value: '#EEEEFF' },
          background: { value: '#FFFBF9' },
          neutral: { value: '#6A7B76' },
          black: { value: '#040303' },
        },
        borders: {
          basic: { value: '2px solid #8B9D83' },
          subtle: { value: '1px solid red' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  globalCss,
});
