module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/**/*.vue',
      './src/.vuepress/**/*.vue',
      './src/**/*.md',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
