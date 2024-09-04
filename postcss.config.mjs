/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'cssnano':{
      preset: 'default'
    },
    tailwindcss: {},
    autoprefixer: {}
  },
};

export default config;